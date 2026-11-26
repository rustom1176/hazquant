import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ExportsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const assessments = membership
    ? await prisma.assessment.findMany({
        where: { organizationId: membership.organizationId },
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, status: true, updatedAt: true, project: { select: { name: true } } },
      })
    : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="section-kicker">Data portability</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Exports</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Export assessment data for compliance records, external review, and operational handoffs. Structured exports keep your risk data usable beyond the platform.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel-solid p-5"><div className="text-sm text-muted">Export-ready assessments</div><div className="mt-1 font-display text-3xl font-semibold text-brand-700">{assessments.length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Approved</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{assessments.filter((a) => a.status === "APPROVED").length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Format</div><div className="mt-1 font-display text-xl font-semibold text-ink">JSON</div><div className="text-xs text-muted">Machine-readable compliance data</div></div>
      </div>

      <div className="panel-solid overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface/80 text-left text-muted"><tr><th className="px-5 py-3 font-medium">Assessment</th><th className="px-5 py-3 font-medium">Project</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Updated</th><th className="px-5 py-3 font-medium"></th></tr></thead>
          <tbody>
            {assessments.map((a) => (
              <tr key={a.id} className="border-t border-line/70 transition hover:bg-surface/40">
                <td className="px-5 py-4 font-medium text-ink">{a.title}</td>
                <td className="px-5 py-4 text-muted">{a.project?.name || "—"}</td>
                <td className="px-5 py-4"><span className="badge">{a.status.replace("_", " ")}</span></td>
                <td className="px-5 py-4 text-muted">{a.updatedAt.toLocaleDateString()}</td>
                <td className="px-5 py-4 text-right"><Link className="btn-secondary px-3 py-1.5 text-xs" href={`/api/assessments/${a.id}/export`} target="_blank">Export JSON</Link></td>
              </tr>
            ))}
            {assessments.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-14 text-center"><div className="font-display text-lg font-semibold text-ink">No assessments to export</div><p className="mt-2 text-sm text-muted">Once assessments are created, you can export them for compliance and review.</p></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}