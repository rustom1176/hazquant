import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default function NewProjectPage() {
  async function create(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) redirect("/dashboard");
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    if (!name) return;
    await prisma.project.create({ data: { organizationId: membership.organizationId, name, description: description || null } });
    redirect("/projects");
  }
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">New project</h1>
      <p className="mt-1 text-sm text-muted">Create a project to group areas, substances, and assessments.</p>
      <form action={create} className="panel mt-6 space-y-4 p-6">
        <div><label className="label" htmlFor="name">Project name</label><input className="input" id="name" name="name" required maxLength={120} /></div>
        <div><label className="label" htmlFor="description">Description</label><textarea className="input min-h-28" id="description" name="description" maxLength={500} /></div>
        <div className="flex gap-3"><button className="btn-primary" type="submit">Create project</button></div>
      </form>
    </div>
  );
}
