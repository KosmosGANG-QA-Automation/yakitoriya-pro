"use client";

import { useCart } from "@/components/cart/CartProvider";
import { CATEGORIES_BY_SLUG, formatPrice, type Product } from "@/lib/catalog";

const BADGES = {
  hit: { label: "Хит", className: "bg-brand text-white" },
  new: { label: "Новинка", className: "bg-gold text-ink" },
  spicy: { label: "Острое", className: "bg-orange-600 text-white" },
  veg: { label: "Вегетарианское", className: "bg-emerald-600 text-white" },
} as const;

export function ProductCard({ product }: { product: Product }) {
  const { items, add, setQty } = useCart();
  const qty = items[product.id] ?? 0;
  const hue = CATEGORIES_BY_SLUG.get(product.category)?.hue ?? 20;
  const badge = product.badge ? BADGES[product.badge] : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-paper transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
      <div
        className="relative grid aspect-[4/3] place-items-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 20%, hsl(${hue} 90% 94%), hsl(${hue} 70% 82%))`,
        }}
      >
        <span className="text-7xl transition duration-500 group-hover:scale-125 group-hover:rotate-6 sm:text-8xl">
          {product.emoji}
        </span>
        {badge && (
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>
            {badge.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-bold">{product.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{product.description}</p>
        <p className="text-xs text-muted">{product.weight}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold">{formatPrice(product.priceKopecks)}</span>
          {qty === 0 ? (
            <button onClick={() => add(product.id)} className="btn-primary px-5 py-2.5">
              В корзину
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-ink px-2 py-1.5 text-white">
              <button
                aria-label="Убавить"
                onClick={() => setQty(product.id, qty - 1)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20"
              >
                −
              </button>
              <span className="min-w-5 text-center text-sm font-semibold">{qty}</span>
              <button
                aria-label="Добавить"
                onClick={() => add(product.id)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
