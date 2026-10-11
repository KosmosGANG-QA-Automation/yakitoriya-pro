"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Viewer } from "@/types";

export function UserBadge({ viewer }: { viewer: Viewer }) {
  const router = useRouter();

  async function logout() {
    if (viewer.provider === "google") {
      await signOut({ redirectTo: "/" });
      return;
    }
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      {viewer.image ? (
        <Image src={viewer.image} alt="" width={36} height={36} className="rounded-full" />
      ) : (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/30 font-semibold">
          {viewer.name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <span className="hidden max-w-32 truncate font-medium xl:inline">{viewer.name}</span>
      <button onClick={logout} className="text-muted underline-offset-4 hover:underline">
        Выйти
      </button>
    </div>
  );
}
