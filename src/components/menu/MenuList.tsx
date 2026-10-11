"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, formatPrice } from "@/lib/catalog";

export function MenuList({ canOrder }: { canOrder: boolean }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const total = useMemo(
    () => PRODUCTS.reduce((sum, p) => sum + p.priceKopecks * (cart[p.id] ?? 0), 0),
    [cart],
  );

  const change = (id: string, delta: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }));

  async function checkout() {
    setBusy(true);
    setError(null);
    const items = Object.entries(cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([id, quantity]) => ({ id, quantity }));
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, address }),
      });
      const data = await res.json();
      if (!res.ok || !data.paymentUrl) throw new Error(data.error ?? "Ошибка оформления");
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
      setBusy(false);
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <ul className="grid gap-4 sm:grid-cols-2">
        {PRODUCTS.map((p) => (
          <li key={p.id} className="flex flex-col gap-2 rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-neutral-500">{p.description}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-medium">{formatPrice(p.priceKopecks)}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => change(p.id, -1)} className="h-8 w-8 rounded-full border">−</button>
                <span>{cart[p.id] ?? 0}</span>
                <button onClick={() => change(p.id, 1)} className="h-8 w-8 rounded-full border">+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {total > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4">
          <input
            placeholder="Адрес доставки"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-lg border border-neutral-300 px-4 py-3"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={checkout}
            disabled={!canOrder || busy || address.trim().length < 5}
            className="rounded-lg bg-red-600 px-4 py-3 font-medium text-white disabled:opacity-50"
          >
            {canOrder ? `Оформить заказ · ${formatPrice(total)}` : "Войдите, чтобы оформить заказ"}
          </button>
        </div>
      )}
    </section>
  );
}
