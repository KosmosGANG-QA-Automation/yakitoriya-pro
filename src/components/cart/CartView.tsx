"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { FREE_DELIVERY_FROM, PRODUCTS_BY_ID, formatPrice } from "@/lib/catalog";

export function CartView({ signedIn }: { signedIn: boolean }) {
  const { items, total, add, setQty, clear } = useCart();
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const lines = Object.entries(items).flatMap(([id, qty]) => {
    const product = PRODUCTS_BY_ID.get(id);
    return product ? [{ product, qty }] : [];
  });

  if (lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-7xl">🛒</p>
        <h2 className="mt-6 font-display text-3xl font-bold">Корзина пока пуста</h2>
        <p className="mt-2 text-muted">Загляните в меню — там много вкусного.</p>
        <Link href="/menu" className="btn-primary mt-8">Перейти в меню</Link>
      </div>
    );
  }

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map(({ product, qty }) => ({ id: product.id, quantity: qty })),
          address,
          comment: comment || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.paymentUrl) throw new Error(data.error ?? "Ошибка оформления");
      clear();
      window.location.assign(data.paymentUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
      setBusy(false);
    }
  }

  const remaining = FREE_DELIVERY_FROM - total;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_24rem]">
      <ul className="space-y-4">
        {lines.map(({ product, qty }) => (
          <li key={product.id} className="flex items-center gap-4 rounded-3xl border border-line bg-paper p-4 sm:p-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-cream text-5xl">
              {product.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-muted">{formatPrice(product.priceKopecks)} · {product.weight}</p>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-ink px-2 py-1.5 text-white">
              <button aria-label="Убавить" onClick={() => setQty(product.id, qty - 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20">−</button>
              <span className="min-w-5 text-center text-sm font-semibold">{qty}</span>
              <button aria-label="Добавить" onClick={() => add(product.id)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20">+</button>
            </div>
            <span className="hidden w-24 text-right font-bold sm:block">{formatPrice(product.priceKopecks * qty)}</span>
          </li>
        ))}
      </ul>

      <aside className="h-fit space-y-4 rounded-3xl border border-line bg-paper p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl font-bold">Ваш заказ</h2>
        <div className="flex justify-between text-lg font-bold">
          <span>Итого</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="rounded-xl bg-cream px-4 py-3 text-sm text-muted">
          {remaining > 0
            ? `До бесплатной доставки: ${formatPrice(remaining)}`
            : "Доставка бесплатно 🎉"}
        </p>

        {signedIn ? (
          <>
            <input
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-brand"
            />
            <textarea
              placeholder="Комментарий для курьера"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-brand"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              onClick={checkout}
              disabled={busy || address.trim().length < 5}
              className="btn-primary w-full"
            >
              {busy ? "Оформляем…" : "Оформить заказ"}
            </button>
          </>
        ) : process.env.NEXT_PUBLIC_STATIC === "1" ? (
          <p className="rounded-xl bg-cream px-4 py-3 text-sm text-muted">
            Демо-версия: оформление заказа доступно только в полной версии сайта.
          </p>
        ) : (
          <Link href="/login?next=/cart" className="btn-primary w-full">
            Войти, чтобы оформить заказ
          </Link>
        )}
        <button onClick={clear} className="w-full text-sm text-muted hover:text-brand">
          Очистить корзину
        </button>
      </aside>
    </div>
  );
}
