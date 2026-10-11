import "server-only";
import { auth } from "@/auth";
import { db } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/session";
import type { User } from "@/types";

/** Пользователь, который может оформлять заказы: вход по телефону или через Google. */
export async function getOrderingUser(): Promise<User | null> {
  const phoneUser = await getCurrentUser();
  if (phoneUser) return phoneUser;

  const googleUser = (await auth())?.user;
  if (!googleUser?.email) return null;

  const { data } = await db()
    .from("users")
    .upsert(
      { email: googleUser.email, name: googleUser.name ?? null, last_login: new Date().toISOString() },
      { onConflict: "email" },
    )
    .select("id, phone, name")
    .single();
  return data ?? null;
}
