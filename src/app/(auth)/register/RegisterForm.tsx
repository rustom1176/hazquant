"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not create account.");
      setLoading(false);
      return;
    }
    const login = await signIn("credentials", {
      email: String(payload.email),
      password: String(payload.password),
      redirect: false,
    });
    setLoading(false);
    if (login?.error) {
      router.push("/login");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="firstName">First name</label><input className="input" id="firstName" name="firstName" autoComplete="given-name" required /></div>
        <div><label className="label" htmlFor="lastName">Last name</label><input className="input" id="lastName" name="lastName" autoComplete="family-name" required /></div>
      </div>
      <div><label className="label" htmlFor="company">Company</label><input className="input" id="company" name="company" autoComplete="organization" placeholder="Your organization" required /></div>
      <div><label className="label" htmlFor="email">Work email</label><input className="input" id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></div>
      <div><label className="label" htmlFor="password">Password</label><input className="input" id="password" name="password" type="password" autoComplete="new-password" minLength={12} placeholder="At least 12 characters" required /></div>
      <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
    </form>
  );
}
