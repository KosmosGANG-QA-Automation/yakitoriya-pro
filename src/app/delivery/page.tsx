import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FREE_DELIVERY_FROM, formatPrice } from "@/lib/catalog";

export const metadata: Metadata = { title: "Доставка и оплата" };

const FAQ = [
  { q: "Сколько стоит доставка?", a: `Бесплатно от ${formatPrice(FREE_DELIVERY_FROM)}. Если заказ меньше — стоимость доставки 199 ₽.` },
  { q: "Как быстро привезёте?", a: "В среднем за 45 минут. В часы пик время может увеличиться до 70 минут." },
  { q: "Как можно оплатить?", a: "Банковской картой онлайн через ЮKassa. Оплата проходит на защищённой странице платёжного сервиса." },
  { q: "Можно ли изменить заказ?", a: "Пока заказ не передан на кухню — позвоните нам по 8 800 555-00-00." },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHero eyebrow="Доставка и оплата" title="Горячим и вовремя" />
      <section className="container-x grid gap-6 py-16 md:grid-cols-3">
        {[
          ["⏱", "45 минут", "среднее время доставки"],
          ["🛵", formatPrice(FREE_DELIVERY_FROM), "порог бесплатной доставки"],
          ["🕙", "10:00–23:00", "принимаем заказы ежедневно"],
        ].map(([icon, big, small]) => (
          <div key={big} className="rounded-3xl bg-night p-8 text-white">
            <span className="text-4xl">{icon}</span>
            <p className="mt-4 font-display text-4xl font-bold">{big}</p>
            <p className="mt-1 text-white/60">{small}</p>
          </div>
        ))}
      </section>
      <section className="container-x max-w-3xl pb-24">
        <h2 className="section-title mb-8">Частые вопросы</h2>
        <div className="divide-y divide-line rounded-3xl border border-line bg-paper">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}
                <span className="text-brand transition group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
