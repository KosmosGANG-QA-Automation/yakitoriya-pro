import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="bg-night text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-display text-xl font-bold text-white">
              Я
            </span>
            <span className="font-display text-2xl font-bold text-white">Якитория</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed">
            Японская кухня, приготовленная на углях и доставленная горячей. Работаем ежедневно с 10:00 до 23:00.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Меню</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/menu#${c.slug}`} className="hover:text-white">{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Компания</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">О нас</Link></li>
            <li><Link href="/restaurants" className="hover:text-white">Рестораны</Link></li>
            <li><Link href="/promotions" className="hover:text-white">Акции</Link></li>
            <li><Link href="/delivery" className="hover:text-white">Доставка и оплата</Link></li>
            <li><Link href="/contacts" className="hover:text-white">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Связь</h3>
          <p className="text-2xl font-semibold text-white">8 800 555-00-00</p>
          <p className="mt-2 text-sm">Бесплатно по России, ежедневно 10:00–23:00</p>
          <p className="mt-4 text-sm">hello@yakitoriya.example</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <span>© 2026 Якитория. Учебный проект, не является реальным магазином.</span>
          <span>Оплата через ЮKassa</span>
        </div>
      </div>
    </footer>
  );
}
