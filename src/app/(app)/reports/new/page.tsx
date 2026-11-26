import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function NewReportPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const assessments = membership ? await prisma.assessment.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }) : [];
  async function create(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) redirect("/dashboard");
    const title = String(formData.get("title") || "").trim();
    if (!title) return;
    await prisma.report.create({
      data: {
        organizationId: membership.organizationId,
        authorId: user.id,
        title,
        assessmentId: String(formData.get("assessmentId") || "") || null,
        content: String(formData.get("content") || "").trim() || null,
        status: "DRAFT",
      },
    });
    redirect("/reports");
  }
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">New report</h1>
      <form action={create} className="panel mt-6 space-y-4 p-6">
        <div><label className="label" htmlFor="title">Title</label><input className="input" id="title" name="title" required /></div>
        <div><label className="label" htmlFor="assessmentId">Assessment</label><select className="input" id="assessmentId" name="assessmentId" defaultValue=""><option value="">None</option>{assessments.map(a=><option key={a.id} value={a.id}>{a.title}</option>)}</select></div>
        <div><label className="label" htmlFor="content">Summary/content</label><textarea className="input min-h-32" id="content" name="content" /></div>
        <button className="btn-primary" type="submit">Create report</button>
      </form>
    </div>
  );
}
