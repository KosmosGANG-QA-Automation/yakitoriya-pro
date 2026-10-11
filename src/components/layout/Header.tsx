"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Viewer } from "@/types";

export function Header({ viewer }: { viewer: Viewer | null }) {
  const router = useRouter();

  async function logout() {
    if (viewer?.provider === "google") {
      await signOut({ redirectTo: "/" });
      return;
    }
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span className="text-xl font-bold text-red-600">Якитория</span>
        {viewer && (
          <div className="flex items-center gap-3 text-sm">
            {viewer.image && (
              <Image
                src={viewer.image}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span>{viewer.name}</span>
            <button onClick={logout} className="underline">Выйти</button>
          </div>
        )}
      </div>
    </header>
  );
}
