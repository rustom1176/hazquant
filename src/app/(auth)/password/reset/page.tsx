import type { Metadata } from "next";
import Link from "next/link";
import { ResetRequestForm } from "./ResetRequestForm";

export const metadata: Metadata = { title: "Reset password" };

export default function PasswordResetPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Reset password</h1>
      <p className="mt-2 text-sm text-muted">Enter your email and we’ll send a secure reset link.</p>
      <ResetRequestForm />
      <p className="mt-6 text-center text-sm text-muted">
        Remembered it? <Link href="/login" className="font-medium text-brand-700 hover:text-brand-800">Back to sign in</Link>
      </p>
    </div>
  );
}
