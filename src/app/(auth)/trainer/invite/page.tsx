import Link from "next/link";

export default function TrainerInvitePage() {
  return <div><h1 className="font-display text-2xl font-semibold text-ink">Trainer invite</h1><p className="mt-2 text-sm text-muted">Invited trainers can sign in or create an account using the invited email address. Invite acceptance is handled by organization admins.</p><div className="mt-6 flex gap-3"><Link href="/register" className="btn-primary">Create account</Link><Link href="/login" className="btn-secondary">Sign in</Link></div></div>;
}
