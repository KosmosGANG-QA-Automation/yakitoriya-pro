export type User = {
  id: string;
  phone: string;
  name: string | null;
};

export type OrderStatus = "pending" | "paid" | "canceled" | "failed";

export type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  priceKopecks: number;
};
