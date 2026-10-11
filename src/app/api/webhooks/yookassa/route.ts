import { NextResponse } from "next/server";
import { db } from "@/lib/supabase/server";
import { getPayment } from "@/lib/yookassa/client";

/**
 * Уведомления ЮKassa. Тело запроса не считается доверенным:
 * статус платежа перепроверяется запросом к API ЮKassa.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { object?: { id?: string } } | null;
  const paymentId = body?.object?.id;
  if (!paymentId) return NextResponse.json({ ok: true });

  let payment;
  try {
    payment = await getPayment(paymentId);
  } catch {
    return NextResponse.json({ error: "lookup failed" }, { status: 502 });
  }

  const orderId = payment.metadata?.order_id;
  if (!orderId) return NextResponse.json({ ok: true });

  if (payment.status === "succeeded") {
    await db()
      .from("orders")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", orderId)
      .eq("payment_id", payment.id)
      .eq("status", "pending");
  } else if (payment.status === "canceled") {
    await db()
      .from("orders")
      .update({ status: "canceled" })
      .eq("id", orderId)
      .eq("payment_id", payment.id)
      .eq("status", "pending");
  }
  return NextResponse.json({ ok: true });
}
