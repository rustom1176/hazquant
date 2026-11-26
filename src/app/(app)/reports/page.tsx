import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function ReportsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const reports = membership
    ? await prisma.report.findMany({
        where: { organizationId: membership.organizationId },
        include: { assessment: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Documentation</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Reports</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Generate and track compliance-ready assessment reports. Clear documentation turns risk data into action for auditors, leaders, and operators.</p>
        </div>
        <Link href="/reports/new" className="btn-primary">New report</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel-solid p-5"><div className="text-sm text-muted">Total reports</div><div className="mt-1 font-display text-3xl font-semibold text-brand-700">{reports.length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Generated/shared</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{reports.filter((r) => r.status !== "DRAFT").length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Linked to assessments</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{reports.filter((r) => r.assessmentId).length}</div></div>
      </div>

      <div className="panel-solid overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface/80 text-left text-muted"><tr><th className="px-5 py-3 font-medium">Title</th><th className="px-5 py-3 font-medium">Assessment</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Updated</th></tr></thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t border-line/70 transition hover:bg-surface/40">
                <td className="px-5 py-4 font-medium"><Link href={`/reports/${r.id}`} className="text-brand-700 hover:text-brand-800 hover:underline">{r.title}</Link></td>
                <td className="px-5 py-4 text-muted">{r.assessment?.title || "—"}</td>
                <td className="px-5 py-4"><span className="badge">{r.status}</span></td>
                <td className="px-5 py-4 text-muted">{r.updatedAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr><td className="px-5 py-14 text-center" colSpan={4}><div className="font-display text-lg font-semibold text-ink">No reports yet</div><p className="mt-2 text-sm text-muted">Create a report to turn assessment data into compliance-ready documentation.</p><Link href="/reports/new" className="btn-primary mt-4">Create report</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}