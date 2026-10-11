import "server-only";
import { createHmac, randomInt } from "node:crypto";
import { requireEnv } from "@/lib/env";

export const CODE_TTL_MS = 5 * 60 * 1000;
export const RESEND_INTERVAL_MS = 60 * 1000;
export const MAX_ATTEMPTS = 5;

export function generateCode(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function hashCode(phone: string, code: string): string {
  return createHmac("sha256", requireEnv("AUTH_SECRET"))
    .update(`${phone}:${code}`)
    .digest("hex");
}

/** Отправка СМС. Код никогда не возвращается клиенту. */
export async function sendSms(phone: string, text: string): Promise<void> {
  const apiId = process.env.SMS_RU_API_ID;
  if (!apiId) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMS provider is not configured");
    }
    console.log(`[sms:dev] ${phone}: ${text}`);
    return;
  }
  const params = new URLSearchParams({
    api_id: apiId,
    to: phone.replace("+", ""),
    msg: text,
    json: "1",
  });
  const res = await fetch(`https://sms.ru/sms/send?${params}`);
  const data = (await res.json()) as { status?: string };
  if (!res.ok || data.status !== "OK") throw new Error("SMS delivery failed");
}
