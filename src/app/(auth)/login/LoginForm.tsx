"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      <div>
        <label className="label" htmlFor="email">Email address</label>
        <input className="input" id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="label mb-0" htmlFor="password">Password</label>
          <Link href="/password/reset" className="text-sm font-medium text-brand-700 hover:text-brand-800">Forgot password?</Link>
        </div>
        <input className="input" id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
      </div>
      <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
