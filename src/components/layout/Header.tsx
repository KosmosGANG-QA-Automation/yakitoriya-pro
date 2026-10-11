import { Suspense } from "react";
import Link from "next/link";
import { HeaderShell } from "./HeaderShell";
import { UserBadge } from "./UserBadge";
import { getViewer } from "@/lib/auth/viewer";

async function UserSlot() {
  const viewer = await getViewer();
  if (viewer) return <UserBadge viewer={viewer} />;
  return (
    <Link href="/login" className="btn-outline px-5 py-2.5">
      Войти
    </Link>
  );
}

export function Header() {
  return (
    <HeaderShell
      user={
        <Suspense fallback={<span className="inline-block h-10 w-24" />}>
          <UserSlot />
        </Suspense>
      }
    />
  );
}
