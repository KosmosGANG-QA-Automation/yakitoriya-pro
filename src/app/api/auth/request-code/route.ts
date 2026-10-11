import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/supabase/server";
import { normalizePhone } from "@/lib/auth/phone";
import {
  CODE_TTL_MS,
  RESEND_INTERVAL_MS,
  generateCode,
  hashCode,
  sendSms,
} from "@/lib/auth/sms";

const schema = z.object({ phone: z.string().min(10).max(20) });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  const phone = parsed.success ? normalizePhone(parsed.data.phone) : null;
  if (!phone) {
    return NextResponse.json({ error: "Некорректный номер телефона" }, { status: 400 });
  }

  const { data: last } = await db()
    .from("sms_codes")
    .select("created_at")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (last && Date.now() - new Date(last.created_at).getTime() < RESEND_INTERVAL_MS) {
    return NextResponse.json({ error: "Повторная отправка возможна через минуту" }, { status: 429 });
  }

  // Код генерируется и хранится (в виде хеша) только на сервере.
  const code = generateCode();
  const { error } = await db().from("sms_codes").insert({
    phone,
    code_hash: hashCode(phone, code),
    expires_at: new Date(Date.now() + CODE_TTL_MS).toISOString(),
  });
  if (error) return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });

  try {
    await sendSms(phone, `Якитория: ваш код ${code}`);
  } catch {
    return NextResponse.json({ error: "Не удалось отправить СМС" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
