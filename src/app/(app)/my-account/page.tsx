import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";

export default async function MyAccountPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-start justify-between gap-4"><div><h1 className="font-display text-3xl font-semibold">My account</h1><p className="mt-1 text-sm text-muted">Your profile and workspace membership.</p></div><div className="flex gap-2"><Link href="/my-account/edit" className="btn-secondary">Edit</Link><Link href="/my-account/password" className="btn-secondary">Password</Link></div></div>
      <div className="panel p-6 space-y-3 text-sm">
        <div><span className="text-muted">Name:</span> <span className="font-medium">{user.name || "—"}</span></div>
        <div><span className="text-muted">Email:</span> <span className="font-medium">{user.email || "—"}</span></div>
        <div><span className="text-muted">Organization:</span> <span className="font-medium">{membership?.organization.name || "—"}</span></div>
        <div><span className="text-muted">Role:</span> <span className="font-medium">{membership?.role || "—"}</span></div>
      </div>
    </div>
  );
}
