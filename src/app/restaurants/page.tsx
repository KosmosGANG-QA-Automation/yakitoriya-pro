import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "Рестораны" };

const RESTAURANTS = [
  { name: "Якитория на Тверской", address: "ул. Тверская, 12", hours: "10:00–23:00", metro: "Охотный Ряд" },
  { name: "Якитория на Арбате", address: "ул. Арбат, 24", hours: "10:00–23:00", metro: "Смоленская" },
  { name: "Якитория Патриаршие", address: "Малый Козихинский пер., 5", hours: "11:00–00:00", metro: "Маяковская" },
  { name: "Якитория Китай-город", address: "ул. Маросейка, 9", hours: "10:00–23:00", metro: "Китай-город" },
  { name: "Якитория Сити", address: "Пресненская наб., 2", hours: "10:00–22:00", metro: "Деловой центр" },
  { name: "Якитория Парк Культуры", address: "ул. Остоженка, 16", hours: "10:00–23:00", metro: "Парк Культуры" },
];

export default function RestaurantsPage() {
  return (
    <>
      <PageHero eyebrow="Рестораны" title="Приходите в гости" text="Демонстрационный список адресов для учебного проекта." />
      <section className="container-x grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {RESTAURANTS.map((r) => (
          <article key={r.name} className="rounded-3xl border border-line bg-paper p-7 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-2xl">📍</div>
            <h2 className="font-display text-2xl font-bold">{r.name}</h2>
            <p className="mt-3 text-muted">{r.address}</p>
            <p className="mt-1 text-sm text-muted">м. {r.metro}</p>
            <p className="mt-4 text-sm font-semibold">Ежедневно {r.hours}</p>
          </article>
        ))}
      </section>
    </>
  );
}
