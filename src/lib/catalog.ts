export type Product = {
  id: string;
  title: string;
  description: string;
  priceKopecks: number;
};

export const PRODUCTS: Product[] = [
  { id: "yakitori-chicken", title: "Якитори из курицы", description: "Куриное бедро на углях, соус тарэ, 2 шпажки", priceKopecks: 29000 },
  { id: "yakitori-beef", title: "Якитори из говядины", description: "Говядина с луком-пореем, 2 шпажки", priceKopecks: 39000 },
  { id: "salmon-roll", title: "Ролл с лососем", description: "Лосось, сливочный сыр, огурец, 8 шт", priceKopecks: 49000 },
  { id: "ramen-shoyu", title: "Рамен сёю", description: "Куриный бульон, лапша, яйцо, нори", priceKopecks: 42000 },
  { id: "edamame", title: "Эдамаме", description: "Молодая соя с морской солью", priceKopecks: 19000 },
];

export const PRODUCTS_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export const formatPrice = (kopecks: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(kopecks / 100);
