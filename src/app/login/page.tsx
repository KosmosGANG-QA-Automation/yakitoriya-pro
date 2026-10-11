import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { GoogleButton } from "@/components/auth/GoogleButton";

export const metadata: Metadata = { title: "Вход" };

async function LoginCard({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  return (
    <div className="mx-auto w-full max-w-md rounded-[2rem] border border-line bg-paper p-8 shadow-xl shadow-ink/5 sm:p-10">
      <h1 className="font-display text-4xl font-bold">Вход</h1>
      <p className="mt-2 text-muted">По номеру телефона или через Google.</p>
      <div className="mt-8 flex flex-col gap-4">
        <AuthForm redirectTo={target} />
        <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted">
          <span className="h-px flex-1 bg-line" />
          или
          <span className="h-px flex-1 bg-line" />
        </div>
        <GoogleButton redirectTo={target} />
      </div>
    </div>
  );
}

const IS_STATIC = process.env.NEXT_PUBLIC_STATIC === "1";

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  if (IS_STATIC) {
    return (
      <div className="container-x grid min-h-[36rem] place-items-center py-16">
        <div className="max-w-md rounded-[2rem] border border-line bg-paper p-10 text-center">
          <p className="text-5xl">🔒</p>
          <h1 className="mt-4 font-display text-3xl font-bold">Демо-версия</h1>
          <p className="mt-3 text-muted">
            Вход и оплата работают только в полной версии сайта с сервером. Здесь можно посмотреть дизайн и собрать корзину.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="container-x grid min-h-[36rem] place-items-center py-16">
      <Suspense>
        <LoginCard searchParams={searchParams as Promise<{ next?: string }>} />
      </Suspense>
    </div>
  );
}
