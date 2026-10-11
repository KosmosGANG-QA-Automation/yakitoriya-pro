import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/supabase/server";
import { normalizePhone } from "@/lib/auth/phone";
import { MAX_ATTEMPTS, hashCode } from "@/lib/auth/sms";
import { createSession } from "@/lib/auth/session";

const schema = z.object({
  phone: z.string().min(10).max(20),
  code: z.string().regex(/^\d{6}$/),
});

const safeEqual = (a: string, b: string) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  const phone = parsed.success ? normalizePhone(parsed.data.phone) : null;
  if (!parsed.success || !phone) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  const { data: record } = await db()
    .from("sms_codes")
    .select("id, code_hash, attempts, expires_at")
    .eq("phone", phone)
    .eq("consumed", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!record || new Date(record.expires_at) < new Date() || record.attempts >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Код недействителен, запросите новый" }, { status: 400 });
  }

  if (!safeEqual(record.code_hash, hashCode(phone, parsed.data.code))) {
    await db().from("sms_codes").update({ attempts: record.attempts + 1 }).eq("id", record.id);
    return NextResponse.json({ error: "Неверный код" }, { status: 400 });
  }

  // Атомарно «сжигаем» код, чтобы его нельзя было использовать повторно.
  const { data: burned } = await db()
    .from("sms_codes")
    .update({ consumed: true })
    .eq("id", record.id)
    .eq("consumed", false)
    .select("id");
  if (!burned?.length) {
    return NextResponse.json({ error: "Код недействителен, запросите новый" }, { status: 400 });
  }

  const { data: user, error } = await db()
    .from("users")
    .upsert({ phone, last_login: new Date().toISOString() }, { onConflict: "phone" })
    .select("id, phone, name")
    .single();
  if (error || !user) return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });

  await createSession(user.id, req.headers.get("user-agent"));
  return NextResponse.json({ user });
}
