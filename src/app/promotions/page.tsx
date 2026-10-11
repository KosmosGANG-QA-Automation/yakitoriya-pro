import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "Акции" };

const PROMOS = [
  { emoji: "🍱", title: "Сеты −15%", text: "В будни до 16:00 на любой сет.", hue: 350, tag: "Пн–Пт" },
  { emoji: "🍢", title: "5 якитори — 6-й в подарок", text: "Закажите пять шпажек, шестую добавим бесплатно.", hue: 18, tag: "Всегда" },
  { emoji: "🎂", title: "В день рождения", text: "Скидка 20% на заказ за 3 дня до и после даты рождения.", hue: 320, tag: "По паспорту" },
  { emoji: "🛵", title: "Бесплатная доставка", text: "При заказе от 1 500 ₽ курьер ничего не берёт.", hue: 38, tag: "Всегда" },
  { emoji: "🍵", title: "Чай в подарок", text: "К рамену — чайник зелёного чая сенча.", hue: 160, tag: "Вс" },
  { emoji: "👥", title: "Приведи друга", text: "Скидка 300 ₽ вам и другу на первый заказ.", hue: 200, tag: "Навсегда" },
];

export default function PromotionsPage() {
  return (
    <>
      <PageHero eyebrow="Акции" title="Выгодно и вкусно" text="Актуальные предложения. Скидки не суммируются." />
      <section className="container-x grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {PROMOS.map((p) => (
          <article
            key={p.title}
            className="relative flex min-h-72 flex-col justify-end overflow-hidden rounded-[2rem] p-8 transition hover:-translate-y-1 hover:shadow-xl"
            style={{ background: `linear-gradient(145deg, hsl(${p.hue} 85% 93%), hsl(${p.hue} 65% 78%))` }}
          >
            <span className="absolute right-4 top-2 text-8xl opacity-80">{p.emoji}</span>
            <span className="mb-3 w-fit rounded-full bg-ink/90 px-3 py-1 text-xs font-semibold text-white">{p.tag}</span>
            <h2 className="font-display text-3xl font-bold">{p.title}</h2>
            <p className="mt-2 text-ink/70">{p.text}</p>
          </article>
        ))}
      </section>
      <div className="container-x pb-24 text-center">
        <Link href="/menu" className="btn-primary">Перейти к заказу</Link>
      </div>
    </>
  );
}
