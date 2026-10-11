"use client";

import { useRouter } from "next/navigation";
import type { User } from "@/types";

export function Header({ user }: { user: User | null }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span className="text-xl font-bold text-red-600">Якитория</span>
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <span>{user.phone}</span>
            <button onClick={logout} className="underline">Выйти</button>
          </div>
        )}
      </div>
    </header>
  );
}
