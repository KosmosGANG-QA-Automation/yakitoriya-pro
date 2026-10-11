import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const sans = Montserrat({ variable: "--font-sans", subsets: ["latin", "cyrillic"] });
const display = Playfair_Display({ variable: "--font-display", subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: { default: "Якитория — японская кухня с доставкой", template: "%s · Якитория" },
  description: "Роллы, якитори, рамен и сеты. Готовим на углях и доставляем горячим за 45 минут.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
