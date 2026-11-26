import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function NewAreaPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const projects = membership ? await prisma.project.findMany({ where: { organizationId: membership.organizationId }, orderBy: { name: "asc" } }) : [];

  async function create(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) redirect("/dashboard");
    const name = String(formData.get("name") || "").trim();
    if (!name) return;
    await prisma.area.create({
      data: {
        organizationId: membership.organizationId,
        name,
        location: String(formData.get("location") || "").trim() || null,
        projectId: String(formData.get("projectId") || "") || null,
      },
    });
    redirect("/areas");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">New area</h1>
      <p className="mt-1 text-sm text-muted">Add a location for assessments and material tracking.</p>
      <form action={create} className="panel mt-6 space-y-4 p-6">
        <div><label className="label" htmlFor="name">Area name</label><input className="input" id="name" name="name" required maxLength={120} /></div>
        <div><label className="label" htmlFor="location">Location</label><input className="input" id="location" name="location" maxLength={160} placeholder="Building, room, or site" /></div>
        <div>
          <label className="label" htmlFor="projectId">Project (optional)</label>
          <select className="input" id="projectId" name="projectId" defaultValue="">
            <option value="">No project</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <button className="btn-primary" type="submit">Create area</button>
      </form>
    </div>
  );
}
