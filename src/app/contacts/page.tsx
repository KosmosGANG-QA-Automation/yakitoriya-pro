import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "Контакты" };

const ITEMS = [
  { icon: "📞", title: "Телефон", lines: ["8 800 555-00-00", "Бесплатно по России"] },
  { icon: "✉️", title: "Почта", lines: ["hello@yakitoriya.example", "Отвечаем в течение дня"] },
  { icon: "🕙", title: "Часы работы", lines: ["Ежедневно", "10:00–23:00"] },
  { icon: "📍", title: "Главный офис", lines: ["Москва, ул. Тверская, 12", "Учебный адрес"] },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero eyebrow="Контакты" title="Свяжитесь с нами" text="Вопросы по заказу, партнёрство, отзывы — мы на связи." />
      <section className="container-x grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((i) => (
          <div key={i.title} className="rounded-3xl border border-line bg-paper p-8">
            <span className="text-4xl">{i.icon}</span>
            <h2 className="mt-4 font-display text-xl font-bold">{i.title}</h2>
            {i.lines.map((l, idx) => (
              <p key={l} className={idx === 0 ? "mt-2 font-semibold" : "text-sm text-muted"}>{l}</p>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
