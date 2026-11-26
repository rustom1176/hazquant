import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Reset password" };

export default function PasswordResetPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Reset password</h1>
      <p className="mt-2 text-sm text-muted">Enter your email and we’ll send a secure reset link.</p>
      <form className="mt-6 space-y-4" action="#" method="post">
        <div>
          <label className="label" htmlFor="email">Email address</label>
          <input className="input" id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <button type="submit" className="btn-primary w-full">Send reset link</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Remembered it? <Link href="/login" className="font-medium text-brand-700 hover:text-brand-800">Back to sign in</Link>
      </p>
    </div>
  );
}
