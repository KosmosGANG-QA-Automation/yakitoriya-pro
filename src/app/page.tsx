import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { AuthForm } from "@/components/auth/AuthForm";
import { MenuList } from "@/components/menu/MenuList";
import { getCurrentUser } from "@/lib/auth/session";

async function Content() {
  const user = await getCurrentUser();

  return (
    <>
      <Header user={user} />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
        {!user && (
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Вход по номеру телефона</h2>
            <AuthForm />
          </section>
        )}
        <h2 className="text-2xl font-semibold">Меню</h2>
        <MenuList canOrder={!!user} />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<Header user={null} />}>
      <Content />
    </Suspense>
  );
}
