import { notFound } from "next/navigation";
import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { deleteReport } from "./actions";

export default async function ReportDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const report = await prisma.report.findFirst({
    where: { id: params.id, organizationId: membership.organizationId },
    include: { assessment: { include: { project: true, area: true, items: { include: { substance: true } } } }, author: true },
  });
  if (!report) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted"><Link href="/reports" className="hover:underline">Reports</Link> / Detail</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">{report.title}</h1>
          <p className="mt-1 text-sm text-muted">Status: {report.status} {report.author?.name ? `• Author: ${report.author.name}` : ""}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/reports/${report.id}/edit`} className="btn-secondary">Edit</Link>
          <form action={deleteReport}><input type="hidden" name="id" value={report.id} /><button className="btn-danger" type="submit">Delete</button></form>
        </div>
      </div>

      <div className="panel p-6">
        <h2 className="font-display text-lg font-semibold">Report content</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted">{report.content || "No content provided."}</p>
      </div>

      <div className="panel p-6">
        <h2 className="font-display text-lg font-semibold">Assessment context</h2>
        {report.assessment ? (
          <div className="mt-3 space-y-3 text-sm">
            <p><span className="font-medium text-ink">Assessment:</span> <Link className="text-brand-700 hover:underline" href={`/assessments/${report.assessment.id}`}>{report.assessment.title}</Link></p>
            <p className="text-muted">Project: {report.assessment.project?.name || "—"} • Area: {report.assessment.area?.name || "—"}</p>
            <div className="overflow-hidden rounded-xl border border-line">
              <table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-3 py-2">Substance</th><th className="px-3 py-2">Qty</th><th className="px-3 py-2">Risk</th></tr></thead>
                <tbody>
                  {report.assessment.items.map((it) => <tr key={it.id} className="border-t border-line"><td className="px-3 py-2">{it.substance?.name || "—"}</td><td className="px-3 py-2 text-muted">{[it.quantity, it.unit].filter(Boolean).join(" ") || "—"}</td><td className="px-3 py-2 text-muted">{it.riskRating ?? "—"}</td></tr>)}
                  {report.assessment.items.length === 0 && <tr><td className="px-3 py-4 text-center text-muted" colSpan={3}>No assessment items.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        ) : <p className="mt-3 text-sm text-muted">No linked assessment.</p>}
      </div>
    </div>
  );
}
