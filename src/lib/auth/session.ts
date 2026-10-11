import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/supabase/server";
import type { User } from "@/types";

export const SESSION_COOKIE = "yk_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const sha256 = (value: string) =>
  createHash("sha256").update(value).digest("hex");

/** Создаёт сессию в БД и выставляет httpOnly-cookie. */
export async function createSession(userId: string, userAgent: string | null) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  const { error } = await db().from("sessions").insert({
    user_id: userId,
    token_hash: sha256(token),
    user_agent: userAgent,
    expires_at: expiresAt.toISOString(),
  });
  if (error) throw error;

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** Возвращает текущего пользователя по cookie или null. */
export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const { data } = await db()
    .from("sessions")
    .select("expires_at, users(id, phone, name)")
    .eq("token_hash", sha256(token))
    .maybeSingle();

  if (!data || new Date(data.expires_at) < new Date()) return null;
  const user = data.users as unknown as User | null;
  return user ?? null;
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await db().from("sessions").delete().eq("token_hash", sha256(token));
  jar.delete(SESSION_COOKIE);
}
