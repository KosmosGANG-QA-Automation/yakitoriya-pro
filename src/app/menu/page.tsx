import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/menu/ProductCard";
import { CATEGORIES, productsIn } from "@/lib/catalog";

export const metadata: Metadata = { title: "Меню" };

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Меню"
        title="Всё, что мы готовим"
        text="Якитори, роллы, сеты, рамен и горячее — выбирайте и добавляйте в корзину."
      />

      <nav className="sticky top-20 z-40 border-b border-line bg-cream/95 backdrop-blur">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium transition hover:border-brand hover:text-brand"
            >
              <span>{c.emoji}</span>
              {c.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="container-x space-y-20 py-16">
        {CATEGORIES.map((c) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-44">
            <div className="mb-8 flex items-end gap-4">
              <span className="text-5xl">{c.emoji}</span>
              <div>
                <h2 className="font-display text-4xl font-bold">{c.title}</h2>
                <p className="text-muted">{c.blurb}</p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productsIn(c.slug).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
