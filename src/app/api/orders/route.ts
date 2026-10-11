import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/session";
import { PRODUCTS_BY_ID } from "@/lib/catalog";
import { createPayment } from "@/lib/yookassa/client";
import type { OrderItem } from "@/types";

const schema = z.object({
  items: z
    .array(z.object({ id: z.string(), quantity: z.number().int().min(1).max(50) }))
    .min(1)
    .max(50),
  address: z.string().trim().min(5).max(300),
  comment: z.string().trim().max(500).optional(),
});

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Некорректные данные заказа" }, { status: 400 });
  }

  // Цены берутся только из серверного каталога — клиенту не доверяем.
  const items: OrderItem[] = [];
  for (const { id, quantity } of parsed.data.items) {
    const product = PRODUCTS_BY_ID.get(id);
    if (!product) return NextResponse.json({ error: `Неизвестный товар: ${id}` }, { status: 400 });
    items.push({ id, title: product.title, quantity, priceKopecks: product.priceKopecks });
  }
  const total = items.reduce((sum, i) => sum + i.priceKopecks * i.quantity, 0);

  const { data: order, error } = await db()
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      total_kopecks: total,
      items,
      address: parsed.data.address,
      comment: parsed.data.comment ?? null,
    })
    .select("id")
    .single();
  if (error || !order) return NextResponse.json({ error: "Не удалось создать заказ" }, { status: 500 });

  try {
    const payment = await createPayment({
      orderId: order.id,
      amountKopecks: total,
      description: `Заказ №${order.id.slice(0, 8)}`,
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/orders/${order.id}`,
    });
    const paymentUrl = payment.confirmation?.confirmation_url ?? null;
    await db().from("orders").update({ payment_id: payment.id, payment_url: paymentUrl }).eq("id", order.id);
    return NextResponse.json({ orderId: order.id, paymentUrl });
  } catch {
    await db().from("orders").update({ status: "failed" }).eq("id", order.id);
    return NextResponse.json({ error: "Не удалось создать платёж" }, { status: 502 });
  }
}
