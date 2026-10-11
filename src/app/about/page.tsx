import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "О нас" };

const VALUES = [
  { emoji: "🔥", title: "Угли бинчотан", text: "Якитори жарим на белом японском угле — он даёт ровный жар и тонкий аромат." },
  { emoji: "🐟", title: "Свежая рыба", text: "Рыбу привозим охлаждённой каждый день и не замораживаем повторно." },
  { emoji: "🍚", title: "Правильный рис", text: "Варим рис по японскому рецепту и заправляем уксусом собственного приготовления." },
];

const NUMBERS = [
  ["2004", "год основания"],
  ["12", "ресторанов"],
  ["300+", "человек в команде"],
  ["1 млн", "довольных заказов"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О нас"
        title="Мы любим японскую кухню"
        text="Якитория — это про честные продукты, огонь и внимание к деталям."
      />

      <section className="container-x grid gap-6 py-16 md:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-3xl border border-line bg-paper p-8">
            <span className="text-5xl">{v.emoji}</span>
            <h2 className="mt-5 font-display text-2xl font-bold">{v.title}</h2>
            <p className="mt-3 text-muted">{v.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-brand py-20 text-white">
        <div className="container-x grid grid-cols-2 gap-10 md:grid-cols-4">
          {NUMBERS.map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-5xl font-bold sm:text-6xl">{n}</p>
              <p className="mt-2 text-white/80">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x max-w-3xl py-24">
        <h2 className="section-title">Наша история</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Всё началось с маленькой кухни и одной жаровни. Сегодня мы готовим в двенадцати ресторанах и доставляем блюда по всему городу, но принципы остались прежними: простые продукты, правильная техника и уважение к гостю.
        </p>
        <p className="mt-4 text-sm text-muted">Этот сайт — учебный проект, все данные вымышленные.</p>
      </section>
    </>
  );
}
