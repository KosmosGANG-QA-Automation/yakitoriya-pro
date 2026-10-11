"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

export const NAV = [
  { href: "/menu", label: "Меню" },
  { href: "/promotions", label: "Акции" },
  { href: "/restaurants", label: "Рестораны" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

const linkClass = "text-sm font-medium transition hover:text-brand";

function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${linkClass} ${pathname.startsWith(item.href) ? "text-brand" : "text-ink"}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function HeaderShell({ user }: { user: React.ReactNode }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-display text-xl font-bold text-white">
            Я
          </span>
          <span className="font-display text-2xl font-bold tracking-tight">Якитория</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Suspense
            fallback={NAV.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          >
            <NavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">{user}</div>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand"
          >
            <span aria-hidden>🛒</span>
            Корзина
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-xs">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-x flex flex-col gap-1 border-t border-line pb-5 pt-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-lg font-medium hover:bg-line/60"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 px-3 sm:hidden" onClick={() => setOpen(false)}>
            {user}
          </div>
        </nav>
      )}
    </header>
  );
}
