import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default function NewAssessmentListPage() {
  async function create(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) return;
    const name = String(formData.get("name") || "").trim();
    if (!name) return;
    await prisma.assessmentList.create({ data: { organizationId: membership.organizationId, name, description: String(formData.get("description") || "").trim() || null } });
    redirect("/assessment-lists");
  }
  return <div className="max-w-2xl"><h1 className="font-display text-3xl font-semibold">New assessment list</h1><form action={create} className="panel mt-6 space-y-4 p-6"><div><label className="label" htmlFor="name">Name</label><input className="input" id="name" name="name" required /></div><div><label className="label" htmlFor="description">Description</label><textarea className="input min-h-24" id="description" name="description" /></div><button className="btn-primary" type="submit">Create list</button></form></div>;
}
