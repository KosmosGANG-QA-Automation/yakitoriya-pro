import Link from "next/link";
import { ProductCard } from "@/components/menu/ProductCard";
import { BESTSELLERS, CATEGORIES, FREE_DELIVERY_FROM, formatPrice } from "@/lib/catalog";

const MARQUEE = ["Якитори на углях", "Свежая рыба каждый день", "Доставка 45 минут", "Рамен на костном бульоне", "Рис по японскому рецепту"];

const STEPS = [
  { n: "01", title: "Выберите блюда", text: "Соберите заказ из меню — роллы, якитори, рамен и сеты." },
  { n: "02", title: "Войдите и оплатите", text: "Вход по телефону или через Google, безопасная оплата картой." },
  { n: "03", title: "Получите горячим", text: "Курьер привезёт заказ в термосумке в среднем за 45 минут." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <div className="pointer-events-none absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-brand/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="container-x relative grid min-h-[44rem] items-center gap-12 py-20 lg:grid-cols-2">
          <div className="animate-fade-up">
            <p className="eyebrow text-gold">Японская кухня · с 2004 года</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] sm:text-7xl">
              Вкус Японии
              <br />
              <span className="italic text-brand">у вашей двери</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-white/70">
              Якитори на углях бинчотан, свежие роллы и рамен на сутками томлёном бульоне. Готовим при вас — доставляем горячим.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-primary">Смотреть меню</Link>
              <Link href="/promotions" className="btn-ghost">Акции</Link>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["45 мин", "среднее время"],
                [formatPrice(FREE_DELIVERY_FROM), "бесплатная доставка"],
                ["12", "ресторанов"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold sm:text-3xl">{v}</dt>
                  <dd className="mt-1 text-xs text-white/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto grid aspect-square w-full max-w-lg place-items-center">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-brand to-brand-dark shadow-2xl shadow-brand/40" />
            <span className="animate-float relative text-[11rem] drop-shadow-2xl sm:text-[14rem]">🍣</span>
            <span className="animate-float absolute left-0 top-10 text-6xl [animation-delay:-2s]">🍢</span>
            <span className="animate-float absolute bottom-8 right-0 text-6xl [animation-delay:-4s]">🍜</span>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-brand py-4 text-white">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="font-display text-xl italic">
              {t} <span className="ml-12 text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="container-x py-24">
        <p className="eyebrow">Категории</p>
        <h2 className="section-title mt-3">Что приготовить сегодня</h2>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/menu#${c.slug}`}
              className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
              style={{ background: `linear-gradient(145deg, hsl(${c.hue} 85% 92%), hsl(${c.hue} 65% 78%))` }}
            >
              <span className="text-6xl transition duration-500 group-hover:scale-125 group-hover:-rotate-6 sm:text-7xl">
                {c.emoji}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold sm:text-2xl">{c.title}</h3>
                <p className="mt-1 hidden text-sm text-ink/70 sm:block">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Выбор гостей</p>
              <h2 className="section-title mt-3">Хиты меню</h2>
            </div>
            <Link href="/menu" className="btn-outline">Всё меню →</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BESTSELLERS.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand p-10 text-white sm:p-14">
            <span className="absolute -bottom-6 -right-4 text-[10rem] opacity-30">🍱</span>
            <p className="eyebrow text-white/80">Акция</p>
            <h3 className="mt-3 font-display text-4xl font-bold">Сеты со скидкой 15%</h3>
            <p className="mt-4 max-w-sm text-white/80">Закажите любой сет в будние дни до 16:00 и получите скидку.</p>
            <Link href="/promotions" className="btn mt-8 bg-white text-brand hover:bg-cream">Подробнее</Link>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-night p-10 text-white sm:p-14">
            <span className="absolute -bottom-6 -right-4 text-[10rem] opacity-30">🛵</span>
            <p className="eyebrow text-gold">Доставка</p>
            <h3 className="mt-3 font-display text-4xl font-bold">Бесплатно от {formatPrice(FREE_DELIVERY_FROM)}</h3>
            <p className="mt-4 max-w-sm text-white/70">Привезём горячим в термосумке по всему городу.</p>
            <Link href="/delivery" className="btn mt-8 bg-gold text-ink hover:brightness-110">Условия доставки</Link>
          </div>
        </div>
      </section>

      <section className="bg-night py-24 text-white">
        <div className="container-x">
          <p className="eyebrow text-gold">Как это работает</p>
          <h2 className="section-title mt-3">Три шага до вкусного ужина</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t border-white/20 pt-6">
                <span className="font-display text-6xl font-bold text-brand">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-white/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <h2 className="section-title mx-auto max-w-2xl">Голодны? Мы уже разжигаем угли.</h2>
        <Link href="/menu" className="btn-primary mt-10">Заказать сейчас</Link>
      </section>
    </>
  );
}
