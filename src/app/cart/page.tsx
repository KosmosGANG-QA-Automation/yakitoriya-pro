import type { Metadata } from "next";
import { Suspense } from "react";
import { CartView } from "@/components/cart/CartView";
import { getViewer } from "@/lib/auth/viewer";

export const metadata: Metadata = { title: "Корзина" };

async function Gate() {
  return <CartView signedIn={!!(await getViewer())} />;
}

export default function CartPage() {
  return (
    <div className="container-x py-14">
      <h1 className="mb-10 font-display text-5xl font-bold">Корзина</h1>
      <Suspense fallback={<CartView signedIn={false} />}>
        <Gate />
      </Suspense>
    </div>
  );
}
