import { notFound } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { updateArea } from "../actions";

export default async function EditAreaPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const [area, projects] = await Promise.all([
    prisma.area.findFirst({ where: { id: params.id, organizationId: membership.organizationId } }),
    prisma.project.findMany({ where: { organizationId: membership.organizationId }, orderBy: { name: "asc" } }),
  ]);
  if (!area) notFound();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Edit area</h1>
      <form action={updateArea} className="panel mt-6 space-y-4 p-6">
        <input type="hidden" name="id" value={area.id} />
        <div><label className="label" htmlFor="name">Area name</label><input className="input" id="name" name="name" defaultValue={area.name} required maxLength={120} /></div>
        <div><label className="label" htmlFor="location">Location</label><input className="input" id="location" name="location" defaultValue={area.location || ""} maxLength={160} /></div>
        <div><label className="label" htmlFor="projectId">Project</label><select className="input" id="projectId" name="projectId" defaultValue={area.projectId || ""}><option value="">No project</option>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        <button className="btn-primary" type="submit">Save changes</button>
      </form>
    </div>
  );
}
