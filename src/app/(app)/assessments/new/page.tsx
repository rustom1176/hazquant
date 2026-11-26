import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function NewAssessmentPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const [projects, areas] = membership
    ? await Promise.all([
        prisma.project.findMany({ where: { organizationId: membership.organizationId }, orderBy: { name: "asc" } }),
        prisma.area.findMany({ where: { organizationId: membership.organizationId }, orderBy: { name: "asc" } }),
      ])
    : [[], []];

  async function create(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) redirect("/dashboard");
    const title = String(formData.get("title") || "").trim();
    if (!title) return;
    await prisma.assessment.create({
      data: {
        organizationId: membership.organizationId,
        ownerId: user.id,
        title,
        summary: String(formData.get("summary") || "").trim() || null,
        projectId: String(formData.get("projectId") || "") || null,
        areaId: String(formData.get("areaId") || "") || null,
        status: "DRAFT",
      },
    });
    redirect("/assessments");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">New assessment</h1>
      <p className="mt-1 text-sm text-muted">Create an assessment record for a project or area.</p>
      <form action={create} className="panel mt-6 space-y-4 p-6">
        <div><label className="label" htmlFor="title">Title</label><input className="input" id="title" name="title" required maxLength={160} /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label" htmlFor="projectId">Project</label><select className="input" id="projectId" name="projectId" defaultValue=""><option value="">None</option>{projects.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div><label className="label" htmlFor="areaId">Area</label><select className="input" id="areaId" name="areaId" defaultValue=""><option value="">None</option>{areas.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
        </div>
        <div><label className="label" htmlFor="summary">Summary</label><textarea className="input min-h-28" id="summary" name="summary" maxLength={1000} /></div>
        <button className="btn-primary" type="submit">Create assessment</button>
      </form>
    </div>
  );
}
