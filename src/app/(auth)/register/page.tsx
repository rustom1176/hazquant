import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Create your account</h1>
      <p className="mt-2 text-sm text-muted">Set up a workspace for hazard assessments and compliance reporting.</p>
      <form className="mt-6 space-y-4" action="#" method="post">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="firstName">First name</label>
            <input className="input" id="firstName" name="firstName" autoComplete="given-name" required />
          </div>
          <div>
            <label className="label" htmlFor="lastName">Last name</label>
            <input className="input" id="lastName" name="lastName" autoComplete="family-name" required />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="company">Company</label>
          <input className="input" id="company" name="company" autoComplete="organization" placeholder="Your organization" required />
        </div>
        <div>
          <label className="label" htmlFor="email">Work email</label>
          <input className="input" id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input className="input" id="password" name="password" type="password" autoComplete="new-password" placeholder="At least 12 characters" required />
        </div>
        <button type="submit" className="btn-primary w-full">Create account</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-medium text-brand-700 hover:text-brand-800">Sign in</Link>
      </p>
    </div>
  );
}
