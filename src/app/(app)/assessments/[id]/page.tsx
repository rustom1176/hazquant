import { notFound } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function AssessmentDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const assessment = await prisma.assessment.findFirst({
    where: { id: params.id, organizationId: membership.organizationId },
    include: { project: true, area: true, items: { include: { substance: true } } },
  });
  if (!assessment) notFound();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h1 className="font-display text-3xl font-semibold">{assessment.title}</h1><p className="mt-1 text-sm text-muted">{assessment.summary || "No summary provided."}</p></div>
        <span className="badge">{assessment.status.replace("_", " ")}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5"><p className="text-sm text-muted">Project</p><p className="mt-2 font-medium">{assessment.project?.name || "—"}</p></div>
        <div className="panel p-5"><p className="text-sm text-muted">Area</p><p className="mt-2 font-medium">{assessment.area?.name || "—"}</p></div>
        <div className="panel p-5"><p className="text-sm text-muted">Items</p><p className="mt-2 font-display text-2xl font-semibold text-brand-700">{assessment.items.length}</p></div>
      </div>
      <div className="panel overflow-hidden">
        <div className="border-b border-line px-4 py-3 font-medium">Assessment items</div>
        <table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Substance</th><th className="px-4 py-3">Quantity</th><th className="px-4 py-3">Risk</th></tr></thead>
          <tbody>
            {assessment.items.map((it) => <tr key={it.id} className="border-t border-line"><td className="px-4 py-3">{it.substance?.name || "—"}</td><td className="px-4 py-3 text-muted">{[it.quantity, it.unit].filter(Boolean).join(" ") || "—"}</td><td className="px-4 py-3 text-muted">{it.riskRating ?? "—"}</td></tr>)}
            {assessment.items.length === 0 && <tr><td className="px-4 py-8 text-center text-muted" colSpan={3}>No assessment items yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
