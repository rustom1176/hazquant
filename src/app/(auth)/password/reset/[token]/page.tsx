import type { Metadata } from "next";
import Link from "next/link";
import { ResetConfirmForm } from "./ResetConfirmForm";

export const metadata: Metadata = { title: "Set new password" };

export default function ResetTokenPage({ params }: { params: { token: string } }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Set a new password</h1>
      <p className="mt-2 text-sm text-muted">Choose a strong password for your HazQuant account.</p>
      <ResetConfirmForm token={params.token} />
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/login" className="font-medium text-brand-700 hover:text-brand-800">Back to sign in</Link>
      </p>
    </div>
  );
}
