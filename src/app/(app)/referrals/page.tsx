import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function ReferralsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const referrals = membership ? await prisma.referral.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }) : [];
  return (
    <div><div className="mb-6"><h1 className="font-display text-3xl font-semibold">Referrals</h1><p className="mt-1 text-sm text-muted">Track referral invitations and status.</p></div>
      <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Status</th></tr></thead><tbody>
        {referrals.map(r => <tr key={r.id} className="border-t border-line"><td className="px-4 py-3 font-medium">{r.code}</td><td className="px-4 py-3 text-muted">{r.referredEmail || "—"}</td><td className="px-4 py-3"><span className="badge">{r.status}</span></td></tr>)}
        {referrals.length===0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No referrals yet.</td></tr>}
      </tbody></table></div></div>
  );
}
