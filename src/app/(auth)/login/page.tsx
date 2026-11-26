import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-muted">Access your assessments, reports, and compliance workspace.</p>
      <form className="mt-6 space-y-4" action="#" method="post">
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
        <button type="submit" className="btn-primary w-full">Sign in</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        No account? <Link href="/register" className="font-medium text-brand-700 hover:text-brand-800">Create one</Link>
      </p>
    </div>
  );
}
