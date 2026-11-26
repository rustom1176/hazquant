import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-muted">Access your assessments, reports, and compliance workspace.</p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-muted">
        No account? <Link href="/register" className="font-medium text-brand-700 hover:text-brand-800">Create one</Link>
      </p>
    </div>
  );
}
