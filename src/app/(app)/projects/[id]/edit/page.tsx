import { notFound } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { updateProject } from "../actions";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const project = await prisma.project.findFirst({ where: { id: params.id, organizationId: membership.organizationId } });
  if (!project) notFound();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Edit project</h1>
      <form action={updateProject} className="panel mt-6 space-y-4 p-6">
        <input type="hidden" name="id" value={project.id} />
        <div><label className="label" htmlFor="name">Project name</label><input className="input" id="name" name="name" defaultValue={project.name} required maxLength={120} /></div>
        <div><label className="label" htmlFor="description">Description</label><textarea className="input min-h-28" id="description" name="description" defaultValue={project.description || ""} maxLength={500} /></div>
        <button className="btn-primary" type="submit">Save changes</button>
      </form>
    </div>
  );
}
