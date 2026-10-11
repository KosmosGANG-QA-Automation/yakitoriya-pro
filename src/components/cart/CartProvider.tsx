"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { PRODUCTS_BY_ID } from "@/lib/catalog";

type CartState = Record<string, number>;

type CartContextValue = {
  items: CartState;
  count: number;
  total: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "yk_cart";
const EMPTY = "{}";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeState(next: CartState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function parse(raw: string): CartState {
  try {
    return JSON.parse(raw) as CartState;
  } catch {
    return {};
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => EMPTY);
  const items = useMemo(() => parse(raw), [raw]);

  const add = useCallback((id: string) => {
    const cur = parse(readRaw());
    writeState({ ...cur, [id]: Math.min((cur[id] ?? 0) + 1, 50) });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const next = parse(readRaw());
    if (qty <= 0) delete next[id];
    else next[id] = Math.min(qty, 50);
    writeState(next);
  }, []);

  const clear = useCallback(() => writeState({}), []);

  const value = useMemo<CartContextValue>(() => {
    let count = 0;
    let total = 0;
    for (const [id, qty] of Object.entries(items)) {
      const product = PRODUCTS_BY_ID.get(id);
      if (!product) continue;
      count += qty;
      total += product.priceKopecks * qty;
    }
    return { items, count, total, add, setQty, clear };
  }, [items, add, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
