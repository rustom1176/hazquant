import Link from "next/link";

export default function TrainingRegisterPage() {
  return <div><h1 className="font-display text-2xl font-semibold text-ink">Training registration</h1><p className="mt-2 text-sm text-muted">Register for HazQuant training access. An organization admin can invite you after account creation.</p><div className="mt-6 flex gap-3"><Link href="/register" className="btn-primary">Create account</Link><Link href="/login" className="btn-secondary">Sign in</Link></div></div>;
}
