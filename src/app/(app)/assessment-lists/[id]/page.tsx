import { notFound, redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function AssessmentListDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const [list, assessments] = await Promise.all([
    prisma.assessmentList.findFirst({ where: { id: params.id, organizationId: membership.organizationId }, include: { items: { include: { assessment: true } } } }),
    prisma.assessment.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }),
  ]);
  if (!list) notFound();
  async function addItem(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) return;
    const assessmentId = String(formData.get("assessmentId") || "");
    if (!assessmentId) return;
    await prisma.assessmentListItem.upsert({
      where: { assessmentListId_assessmentId: { assessmentListId: params.id, assessmentId } },
      create: { assessmentListId: params.id, assessmentId },
      update: {},
    });
    redirect(`/assessment-lists/${params.id}`);
  }
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl font-semibold">{list.name}</h1><p className="mt-1 text-sm text-muted">{list.description || "No description."}</p></div>
      <form action={addItem} className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-end"><div className="flex-1"><label className="label" htmlFor="assessmentId">Add assessment</label><select className="input" id="assessmentId" name="assessmentId">{assessments.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}</select></div><button className="btn-primary" type="submit">Add</button></form>
      <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Assessment</th><th className="px-4 py-3">Status</th></tr></thead><tbody>
        {list.items.map(i => <tr key={i.id} className="border-t border-line"><td className="px-4 py-3">{i.assessment.title}</td><td className="px-4 py-3 text-muted">{i.assessment.status}</td></tr>)}
        {list.items.length === 0 && <tr><td colSpan={2} className="px-4 py-8 text-center text-muted">No assessments in this list.</td></tr>}
      </tbody></table></div>
    </div>
  );
}
