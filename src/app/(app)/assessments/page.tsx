import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

function statusClass(status: string) {
  if (status === "APPROVED") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (status === "IN_REVIEW") return "bg-sky-100 text-sky-800 border-sky-200";
  if (status === "ARCHIVED") return "bg-slate-100 text-slate-700 border-slate-200";
  return "bg-amber-100 text-amber-800 border-amber-200";
}

export default async function AssessmentsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const assessments = membership
    ? await prisma.assessment.findMany({
        where: { organizationId: membership.organizationId },
        include: { project: true, area: true, _count: { select: { items: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const counts = assessments.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Risk evaluation</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Assessments</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Track hazard evaluations, controls, and review status. Each assessment builds the evidence trail for compliance and operational decisions.</p>
        </div>
        <Link href="/assessments/new" className="btn-primary">New assessment</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="panel-solid p-4"><div className="text-xs uppercase tracking-[0.12em] text-muted">Total</div><div className="mt-1 font-display text-2xl font-semibold text-ink">{assessments.length}</div></div>
        <div className="panel-solid p-4"><div className="text-xs uppercase tracking-[0.12em] text-amber-700">Draft</div><div className="mt-1 font-display text-2xl font-semibold text-amber-800">{counts.DRAFT || 0}</div></div>
        <div className="panel-solid p-4"><div className="text-xs uppercase tracking-[0.12em] text-sky-700">In review</div><div className="mt-1 font-display text-2xl font-semibold text-sky-800">{counts.IN_REVIEW || 0}</div></div>
        <div className="panel-solid p-4"><div className="text-xs uppercase tracking-[0.12em] text-emerald-700">Approved</div><div className="mt-1 font-display text-2xl font-semibold text-emerald-800">{counts.APPROVED || 0}</div></div>
      </div>

      <div className="panel-solid overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface/80 text-left text-muted"><tr><th className="px-5 py-3 font-medium">Title</th><th className="px-5 py-3 font-medium">Context</th><th className="px-5 py-3 font-medium">Items</th><th className="px-5 py-3 font-medium">Status</th></tr></thead>
          <tbody>
            {assessments.map((a) => (
              <tr key={a.id} className="border-t border-line/70 transition hover:bg-surface/40">
                <td className="px-5 py-4 font-medium"><Link href={`/assessments/${a.id}`} className="text-brand-700 hover:text-brand-800 hover:underline">{a.title}</Link></td>
                <td className="px-5 py-4 text-muted"><div>{a.project?.name || "No project"}</div><div className="text-xs">{a.area?.name || "No area"}</div></td>
                <td className="px-5 py-4 text-muted">{a._count.items}</td>
                <td className="px-5 py-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(a.status)}`}>{a.status.replace("_", " ")}</span></td>
              </tr>
            ))}
            {assessments.length === 0 && (
              <tr><td className="px-5 py-14 text-center" colSpan={4}><div className="font-display text-lg font-semibold text-ink">No assessments yet</div><p className="mt-2 text-sm text-muted">Create an assessment to document hazards, controls, and risk ratings.</p><Link href="/assessments/new" className="btn-primary mt-4">Create assessment</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}