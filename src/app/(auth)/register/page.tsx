import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Create your account</h1>
      <p className="mt-2 text-sm text-muted">Set up a workspace for hazard assessments and compliance reporting.</p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-medium text-brand-700 hover:text-brand-800">Sign in</Link>
      </p>
    </div>
  );
}
