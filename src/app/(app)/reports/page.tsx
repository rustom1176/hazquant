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
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div><h1 className="font-display text-3xl font-semibold">Reports</h1><p className="mt-1 text-sm text-muted">Generate and track compliance-ready assessment reports.</p></div>
        <Link href="/reports/new" className="btn-primary">New report</Link>
      </div>
      <div className="panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Assessment</th><th className="px-4 py-3">Status</th></tr></thead>
          <tbody>
            {reports.map((r) => <tr key={r.id} className="border-t border-line"><td className="px-4 py-3 font-medium"><Link href={`/reports/${r.id}`} className="text-brand-700 hover:underline">{r.title}</Link></td><td className="px-4 py-3 text-muted">{r.assessment?.title || "—"}</td><td className="px-4 py-3"><span className="badge">{r.status}</span></td></tr>)}
            {reports.length === 0 && <tr><td className="px-4 py-8 text-center text-muted" colSpan={3}>No reports yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
