import "server-only";
import { connection } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/session";
import type { User, Viewer } from "@/types";

/** Кто сейчас на сайте: вход через Google или по телефону. Для шапки и страниц. */
export async function getViewer(): Promise<Viewer | null> {
  await connection();
  const googleUser = (await auth())?.user;
  if (googleUser) {
    return {
      name: googleUser.name ?? googleUser.email ?? "Гость",
      image: googleUser.image ?? null,
      provider: "google",
    };
  }
  const user = await getCurrentUser().catch(() => null);
  if (user) {
    return { name: user.name ?? user.phone ?? "Гость", image: null, provider: "phone" };
  }
  return null;
}

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
