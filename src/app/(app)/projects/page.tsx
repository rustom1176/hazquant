import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const projects = membership ? await prisma.project.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }) : [];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div><h1 className="font-display text-3xl font-semibold">Projects</h1><p className="mt-1 text-sm text-muted">Organize facilities, sites, and assessment scopes.</p></div>
        <Link href="/projects/new" className="btn-primary">New project</Link>
      </div>
      <div className="panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Created</th></tr></thead>
          <tbody>
            {projects.map((p) => <tr key={p.id} className="border-t border-line"><td className="px-4 py-3 font-medium"><Link href={`/projects/${p.id}`} className="text-brand-700 hover:underline">{p.name}</Link></td><td className="px-4 py-3 text-muted">{p.description || "—"}</td><td className="px-4 py-3 text-muted">{p.createdAt.toLocaleDateString()}</td></tr>)}
            {projects.length === 0 && <tr><td className="px-4 py-8 text-center text-muted" colSpan={3}>No projects yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
