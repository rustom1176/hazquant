import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function AssessmentsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const assessments = membership
    ? await prisma.assessment.findMany({
        where: { organizationId: membership.organizationId },
        include: { project: true, area: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Assessments</h1>
          <p className="mt-1 text-sm text-muted">Track hazard evaluations, controls, and review status.</p>
        </div>
        <Link href="/assessments/new" className="btn-primary">New assessment</Link>
      </div>
      <div className="panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Project</th><th className="px-4 py-3">Status</th></tr></thead>
          <tbody>
            {assessments.map((a) => (
              <tr key={a.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium"><Link href={`/assessments/${a.id}`} className="text-brand-700 hover:underline">{a.title}</Link></td>
                <td className="px-4 py-3 text-muted">{a.project?.name || "—"}</td>
                <td className="px-4 py-3"><span className="badge">{a.status.replace("_", " ")}</span></td>
              </tr>
            ))}
            {assessments.length === 0 && <tr><td className="px-4 py-8 text-center text-muted" colSpan={3}>No assessments yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
