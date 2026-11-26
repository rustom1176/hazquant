import { notFound } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const project = await prisma.project.findFirst({ where: { id: params.id, organizationId: membership.organizationId }, include: { areas: true, assessments: true } });
  if (!project) notFound();
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl font-semibold">{project.name}</h1><p className="mt-1 text-sm text-muted">{project.description || "No description."}</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5"><p className="text-sm text-muted">Areas</p><p className="mt-2 font-display text-3xl font-semibold text-brand-700">{project.areas.length}</p></div>
        <div className="panel p-5"><p className="text-sm text-muted">Assessments</p><p className="mt-2 font-display text-3xl font-semibold text-brand-700">{project.assessments.length}</p></div>
        <div className="panel p-5"><p className="text-sm text-muted">Created</p><p className="mt-2 text-sm font-medium">{project.createdAt.toLocaleDateString()}</p></div>
      </div>
    </div>
  );
}
