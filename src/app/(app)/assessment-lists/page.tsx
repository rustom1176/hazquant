import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function AssessmentListsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const lists = membership ? await prisma.assessmentList.findMany({ where: { organizationId: membership.organizationId }, include: { _count: { select: { items: true } } }, orderBy: { createdAt: "desc" } }) : [];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4"><div><h1 className="font-display text-3xl font-semibold">Assessment lists</h1><p className="mt-1 text-sm text-muted">Group assessments for export, review, or reporting.</p></div><Link href="/assessment-lists/new" className="btn-primary">New list</Link></div>
      <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Items</th><th className="px-4 py-3">Created</th></tr></thead><tbody>
        {lists.map(l => <tr key={l.id} className="border-t border-line"><td className="px-4 py-3 font-medium"><Link href={`/assessment-lists/${l.id}`} className="text-brand-700 hover:underline">{l.name}</Link></td><td className="px-4 py-3 text-muted">{l._count.items}</td><td className="px-4 py-3 text-muted">{l.createdAt.toLocaleDateString()}</td></tr>)}
        {lists.length === 0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No assessment lists yet.</td></tr>}
      </tbody></table></div>
    </div>
  );
}
