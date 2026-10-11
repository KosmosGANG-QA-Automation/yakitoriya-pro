import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { db } from "@/lib/supabase/server";
import { getOrderingUser } from "@/lib/auth/viewer";
import { formatPrice } from "@/lib/catalog";
import type { OrderItem, OrderStatus } from "@/types";

export const metadata: Metadata = { title: "Заказ" };

const STATUS: Record<OrderStatus, { label: string; emoji: string; text: string }> = {
  pending: { label: "Ожидает оплаты", emoji: "⏳", text: "Как только платёж пройдёт, мы начнём готовить." },
  paid: { label: "Оплачен", emoji: "✅", text: "Спасибо! Заказ передан на кухню." },
  canceled: { label: "Отменён", emoji: "❌", text: "Платёж был отменён. Вы можете оформить заказ заново." },
  failed: { label: "Ошибка оплаты", emoji: "⚠️", text: "Не удалось создать платёж. Попробуйте ещё раз." },
};

type OrderRow = {
  id: string;
  status: OrderStatus;
  total_kopecks: number;
  items: OrderItem[];
  address: string;
  payment_url: string | null;
};

async function OrderView({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;

  let order: OrderRow | null = null;
  try {
    const user = await getOrderingUser();
    if (user) {
      const { data } = await db()
        .from("orders")
        .select("id, status, total_kopecks, items, address, payment_url")
        .eq("id", id)
        .eq("user_id", user.id)
        .maybeSingle();
      order = data as OrderRow | null;
    }
  } catch {}

  if (!order) {
    return (
      <div className="py-20 text-center">
        <p className="text-6xl">🔍</p>
        <h1 className="mt-6 font-display text-4xl font-bold">Заказ не найден</h1>
        <p className="mt-2 text-muted">Возможно, нужно войти в аккаунт, с которого он оформлен.</p>
        <Link href="/menu" className="btn-primary mt-8">В меню</Link>
      </div>
    );
  }

  const s = STATUS[order.status];
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-line bg-paper p-8 sm:p-12">
      <p className="text-6xl">{s.emoji}</p>
      <h1 className="mt-4 font-display text-4xl font-bold">{s.label}</h1>
      <p className="mt-2 text-muted">{s.text}</p>

      <ul className="mt-8 divide-y divide-line">
        {order.items.map((i) => (
          <li key={i.id} className="flex justify-between py-3">
            <span>{i.title} × {i.quantity}</span>
            <span className="font-semibold">{formatPrice(i.priceKopecks * i.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between text-xl font-bold">
        <span>Итого</span>
        <span>{formatPrice(order.total_kopecks)}</span>
      </div>
      <p className="mt-4 text-sm text-muted">Адрес: {order.address}</p>

      {order.status === "pending" && order.payment_url && (
        <a href={order.payment_url} className="btn-primary mt-8">Оплатить</a>
      )}
    </div>
  );
}

export default function OrderPage({ params }: PageProps<"/orders/[id]">) {
  return (
    <div className="container-x py-16">
      <Suspense>
        <OrderView params={params} />
      </Suspense>
    </div>
  );
}
