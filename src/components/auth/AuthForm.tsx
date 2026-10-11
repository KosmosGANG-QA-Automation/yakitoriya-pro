"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Ошибка запроса");
  return data;
}

export function AuthForm({ redirectTo = "/" }: { redirectTo?: string }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (step === "phone") {
        await post("/api/auth/request-code", { phone });
        setStep("code");
      } else {
        await post("/api/auth/verify-code", { phone, code });
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-3">
      {step === "phone" ? (
        <input
          type="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-xl border border-line bg-cream px-4 py-3.5 outline-none focus:border-brand"
          required
        />
      ) : (
        <input
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="Код из СМС"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="rounded-xl border border-line bg-cream px-4 py-3.5 tracking-widest outline-none focus:border-brand"
          required
        />
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={busy} className="btn-primary">
        {step === "phone" ? "Получить код" : "Войти"}
      </button>
    </form>
  );
}
