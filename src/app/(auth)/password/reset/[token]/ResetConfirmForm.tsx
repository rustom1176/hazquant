"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ResetConfirmForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setLoading(true);
    const password = String(new FormData(e.currentTarget).get("password") || "");
    const res = await fetch("/api/auth/password-reset/confirm", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);
    if (!res.ok) { setError("Invalid or expired reset link."); return; }
    router.push("/login?reset=1");
  }
  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      <div><label className="label" htmlFor="password">New password</label><input className="input" id="password" name="password" type="password" minLength={12} autoComplete="new-password" required /></div>
      <button type="submit" className="btn-primary w-full" disabled={loading}>{loading?"Updating...":"Update password"}</button>
    </form>
  );
}
