import "server-only";
import { requireEnv } from "@/lib/env";

const API = "https://api.yookassa.ru/v3";

export type YooPayment = {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  confirmation?: { confirmation_url?: string };
  metadata?: Record<string, string>;
};

async function request<T>(path: string, init: RequestInit & { idempotenceKey?: string } = {}) {
  const auth = Buffer.from(
    `${requireEnv("YOOKASSA_SHOP_ID")}:${requireEnv("YOOKASSA_SECRET_KEY")}`,
  ).toString("base64");

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      ...(init.idempotenceKey && { "Idempotence-Key": init.idempotenceKey }),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`YooKassa ${res.status}`);
  return (await res.json()) as T;
}

export function createPayment(params: {
  orderId: string;
  amountKopecks: number;
  description: string;
  returnUrl: string;
}) {
  return request<YooPayment>("/payments", {
    method: "POST",
    // Ключ привязан к заказу: повторный запрос не создаст второй платёж.
    idempotenceKey: params.orderId,
    body: JSON.stringify({
      amount: { value: (params.amountKopecks / 100).toFixed(2), currency: "RUB" },
      capture: true,
      confirmation: { type: "redirect", return_url: params.returnUrl },
      description: params.description,
      metadata: { order_id: params.orderId },
    }),
  });
}

export const getPayment = (id: string) =>
  request<YooPayment>(`/payments/${encodeURIComponent(id)}`);
