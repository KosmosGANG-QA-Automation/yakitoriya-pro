export type User = {
  id: string;
  phone: string | null;
  name: string | null;
};

export type OrderStatus = "pending" | "paid" | "canceled" | "failed";

export type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  priceKopecks: number;
};

/** Текущий посетитель для шапки: вход по телефону или через Google. */
export type Viewer = {
  name: string;
  image: string | null;
  provider: "phone" | "google";
};
