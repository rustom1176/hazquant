import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ExportsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const assessments = membership ? await prisma.assessment.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" }, select: { id: true, title: true, status: true, updatedAt: true } }) : [];
  return (
    <div>
      <div className="mb-6"><h1 className="font-display text-3xl font-semibold">Exports</h1><p className="mt-1 text-sm text-muted">Export assessment data for compliance records and review.</p></div>
      <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Assessment</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3"></th></tr></thead><tbody>
        {assessments.map(a => <tr key={a.id} className="border-t border-line"><td className="px-4 py-3 font-medium">{a.title}</td><td className="px-4 py-3 text-muted">{a.status}</td><td className="px-4 py-3 text-muted">{a.updatedAt.toLocaleDateString()}</td><td className="px-4 py-3 text-right"><Link className="text-brand-700 hover:underline" href={`/api/assessments/${a.id}/export`} target="_blank">Export JSON</Link></td></tr>)}
        {assessments.length===0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-muted">No assessments to export.</td></tr>}
      </tbody></table></div>
    </div>
  );
}
