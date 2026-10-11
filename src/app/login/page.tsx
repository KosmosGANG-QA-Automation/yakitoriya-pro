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

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <div className="container-x grid min-h-[36rem] place-items-center py-16">
      <Suspense>
        <LoginCard searchParams={searchParams as Promise<{ next?: string }>} />
      </Suspense>
    </div>
  );
}
