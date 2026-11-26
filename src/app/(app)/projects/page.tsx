import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const projects = membership
    ? await prisma.project.findMany({
        where: { organizationId: membership.organizationId },
        include: { _count: { select: { areas: true, assessments: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Operations</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Projects</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Organize facilities, sites, and assessment scopes. Projects give every assessment the operational context needed for defensible reporting.</p>
        </div>
        <Link href="/projects/new" className="btn-primary">New project</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel-solid p-5"><div className="text-sm text-muted">Total projects</div><div className="mt-1 font-display text-3xl font-semibold text-brand-700">{projects.length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Linked areas</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{projects.reduce((n, p) => n + p._count.areas, 0)}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Linked assessments</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{projects.reduce((n, p) => n + p._count.assessments, 0)}</div></div>
      </div>

      <div className="panel-solid overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface/80 text-left text-muted"><tr><th className="px-5 py-3 font-medium">Name</th><th className="px-5 py-3 font-medium">Description</th><th className="px-5 py-3 font-medium">Coverage</th><th className="px-5 py-3 font-medium">Created</th></tr></thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-line/70 transition hover:bg-surface/40">
                <td className="px-5 py-4 font-medium"><Link href={`/projects/${p.id}`} className="text-brand-700 hover:text-brand-800 hover:underline">{p.name}</Link></td>
                <td className="px-5 py-4 text-muted">{p.description || "—"}</td>
                <td className="px-5 py-4 text-muted">{p._count.areas} areas · {p._count.assessments} assessments</td>
                <td className="px-5 py-4 text-muted">{p.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td className="px-5 py-14 text-center" colSpan={4}><div className="font-display text-lg font-semibold text-ink">No projects yet</div><p className="mt-2 text-sm text-muted">Create a project to organize facilities, areas, and assessments.</p><Link href="/projects/new" className="btn-primary mt-4">Create project</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}