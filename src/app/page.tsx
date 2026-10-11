import { Suspense } from "react";
import { connection } from "next/server";
import { Header } from "@/components/layout/Header";
import { AuthForm } from "@/components/auth/AuthForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { MenuList } from "@/components/menu/MenuList";
import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/auth/session";
import type { Viewer } from "@/types";

async function getViewer(): Promise<{ viewer: Viewer | null; canOrder: boolean }> {
  await connection();
  const googleSession = await auth();
  if (googleSession?.user) {
    const { name, email, image } = googleSession.user;
    return {
      viewer: { name: name ?? email ?? "Гость", image: image ?? null, provider: "google" },
      canOrder: true,
    };
  }
  const user = await getCurrentUser();
  if (user) {
    return {
      viewer: { name: user.name ?? user.phone ?? "Гость", image: null, provider: "phone" },
      canOrder: true,
    };
  }
  return { viewer: null, canOrder: false };
}

async function Content() {
  const { viewer, canOrder } = await getViewer();

  return (
    <>
      <Header viewer={viewer} />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
        {!viewer && (
          <section className="flex w-full max-w-sm flex-col gap-3">
            <h2 className="text-2xl font-semibold">Вход</h2>
            <AuthForm />
            <GoogleButton />
          </section>
        )}
        <h2 className="text-2xl font-semibold">Меню</h2>
        <MenuList canOrder={canOrder} />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Header viewer={null} />}>
      <Content />
    </Suspense>
  );
}
