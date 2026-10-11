export type Category = {
  slug: string;
  title: string;
  emoji: string;
  blurb: string;
  /** Оттенок (HSL) для фона карточек категории. */
  hue: number;
};

export type Product = {
  id: string;
  category: string;
  title: string;
  description: string;
  weight: string;
  priceKopecks: number;
  emoji: string;
  badge?: "hit" | "new" | "spicy" | "veg";
};

export const CATEGORIES: Category[] = [
  { slug: "yakitori", title: "Якитори", emoji: "🍢", blurb: "Шпажки на углях бинчотан", hue: 18 },
  { slug: "rolls", title: "Роллы", emoji: "🍣", blurb: "Классика и авторские", hue: 350 },
  { slug: "sets", title: "Сеты", emoji: "🍱", blurb: "Для компании и на двоих", hue: 38 },
  { slug: "ramen", title: "Рамен и супы", emoji: "🍜", blurb: "Насыщенные бульоны", hue: 28 },
  { slug: "hot", title: "Горячее", emoji: "🥢", blurb: "Вок, терияки, карри", hue: 8 },
  { slug: "starters", title: "Закуски", emoji: "🥗", blurb: "Салаты и гёдза", hue: 130 },
  { slug: "desserts", title: "Десерты", emoji: "🍡", blurb: "Моти и тайяки", hue: 320 },
  { slug: "drinks", title: "Напитки", emoji: "🍵", blurb: "Чай, лимонады, сакэ-безалкогольное", hue: 160 },
];

export const PRODUCTS: Product[] = [
  { id: "yakitori-chicken", category: "yakitori", title: "Якитори из курицы", description: "Куриное бедро на углях, соус тарэ, 2 шпажки", weight: "90 г", priceKopecks: 29000, emoji: "🍢", badge: "hit" },
  { id: "yakitori-beef", category: "yakitori", title: "Якитори из говядины", description: "Говядина с луком-пореем, 2 шпажки", weight: "100 г", priceKopecks: 39000, emoji: "🍢" },
  { id: "yakitori-tsukune", category: "yakitori", title: "Цукунэ", description: "Куриные фрикадельки с желтком и соусом тарэ", weight: "110 г", priceKopecks: 33000, emoji: "🍡", badge: "new" },
  { id: "yakitori-shrimp", category: "yakitori", title: "Якитори с креветкой", description: "Тигровые креветки, лайм, соль юдзу", weight: "80 г", priceKopecks: 45000, emoji: "🍤" },

  { id: "salmon-roll", category: "rolls", title: "Ролл с лососем", description: "Лосось, сливочный сыр, огурец, 8 шт", weight: "220 г", priceKopecks: 49000, emoji: "🍣", badge: "hit" },
  { id: "philadelphia", category: "rolls", title: "Филадельфия", description: "Лосось, авокадо, сливочный сыр, 8 шт", weight: "240 г", priceKopecks: 59000, emoji: "🍣" },
  { id: "dragon-roll", category: "rolls", title: "Дракон", description: "Угорь, авокадо, унаги-соус, кунжут, 8 шт", weight: "250 г", priceKopecks: 63000, emoji: "🐉", badge: "new" },
  { id: "spicy-tuna", category: "rolls", title: "Спайси тунец", description: "Тунец, острый майонез, тобико, 8 шт", weight: "230 г", priceKopecks: 57000, emoji: "🌶️", badge: "spicy" },
  { id: "veg-roll", category: "rolls", title: "Овощной ролл", description: "Огурец, авокадо, болгарский перец, 8 шт", weight: "210 г", priceKopecks: 35000, emoji: "🥒", badge: "veg" },

  { id: "set-tokyo", category: "sets", title: "Сет «Токио»", description: "24 ролла: Филадельфия, Калифорния, Ролл с лососем", weight: "720 г", priceKopecks: 169000, emoji: "🍱", badge: "hit" },
  { id: "set-osaka", category: "sets", title: "Сет «Осака»", description: "32 ролла и 4 шпажки якитори", weight: "980 г", priceKopecks: 229000, emoji: "🍱" },
  { id: "set-duo", category: "sets", title: "Сет на двоих", description: "16 роллов, гёдза и 2 напитка", weight: "640 г", priceKopecks: 139000, emoji: "🥡", badge: "new" },

  { id: "ramen-shoyu", category: "ramen", title: "Рамен сёю", description: "Куриный бульон, лапша, яйцо, нори", weight: "450 г", priceKopecks: 42000, emoji: "🍜", badge: "hit" },
  { id: "ramen-tonkotsu", category: "ramen", title: "Рамен тонкоцу", description: "Сливочный свиной бульон, томлёная свинина, яйцо", weight: "480 г", priceKopecks: 48000, emoji: "🍜" },
  { id: "ramen-spicy", category: "ramen", title: "Острый рамен", description: "Мисо-бульон, чили, говядина, кукуруза", weight: "470 г", priceKopecks: 46000, emoji: "🌶️", badge: "spicy" },
  { id: "miso-soup", category: "ramen", title: "Мисо-суп", description: "Тофу, водоросли вакамэ, зелёный лук", weight: "250 г", priceKopecks: 19000, emoji: "🥣", badge: "veg" },

  { id: "teriyaki-chicken", category: "hot", title: "Курица терияки", description: "Куриное бедро, рис, овощи, соус терияки", weight: "320 г", priceKopecks: 41000, emoji: "🍗" },
  { id: "yakisoba", category: "hot", title: "Якисоба с курицей", description: "Гречневая лапша вок, овощи, курица", weight: "330 г", priceKopecks: 38000, emoji: "🥢", badge: "hit" },
  { id: "katsu-curry", category: "hot", title: "Кацу-карри", description: "Свиная котлета в панко, японское карри, рис", weight: "380 г", priceKopecks: 46000, emoji: "🍛" },

  { id: "edamame", category: "starters", title: "Эдамаме", description: "Молодая соя с морской солью", weight: "150 г", priceKopecks: 19000, emoji: "🫛", badge: "veg" },
  { id: "gyoza", category: "starters", title: "Гёдза", description: "Жареные пельмени со свининой, 6 шт", weight: "180 г", priceKopecks: 31000, emoji: "🥟", badge: "hit" },
  { id: "chuka-salad", category: "starters", title: "Салат чука", description: "Водоросли чука в ореховом соусе", weight: "120 г", priceKopecks: 25000, emoji: "🥗", badge: "veg" },

  { id: "mochi", category: "desserts", title: "Моти ассорти", description: "Манго, матча, клубника, 3 шт", weight: "105 г", priceKopecks: 27000, emoji: "🍡", badge: "new" },
  { id: "taiyaki", category: "desserts", title: "Тайяки", description: "Вафля-рыбка с заварным кремом", weight: "110 г", priceKopecks: 22000, emoji: "🐟" },

  { id: "matcha-latte", category: "drinks", title: "Матча-латте", description: "Церемониальная матча на молоке", weight: "300 мл", priceKopecks: 25000, emoji: "🍵" },
  { id: "yuzu-lemonade", category: "drinks", title: "Лимонад юдзу", description: "Юдзу, мята, содовая", weight: "400 мл", priceKopecks: 21000, emoji: "🍋", badge: "hit" },
  { id: "green-tea", category: "drinks", title: "Зелёный чай сенча", description: "Чайник на двоих", weight: "600 мл", priceKopecks: 18000, emoji: "🫖" },
];

export const PRODUCTS_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
export const CATEGORIES_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export const productsIn = (category: string) => PRODUCTS.filter((p) => p.category === category);
export const BESTSELLERS = PRODUCTS.filter((p) => p.badge === "hit");

export const formatPrice = (kopecks: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(kopecks / 100);

export const FREE_DELIVERY_FROM = 150000;
