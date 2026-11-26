import { notFound } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { updateReport } from "../actions";

export default async function EditReportPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const report = await prisma.report.findFirst({ where: { id: params.id, organizationId: membership.organizationId } });
  if (!report) notFound();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Edit report</h1>
      <form action={updateReport} className="panel mt-6 space-y-4 p-6">
        <input type="hidden" name="id" value={report.id} />
        <div><label className="label" htmlFor="title">Title</label><input className="input" id="title" name="title" defaultValue={report.title} required /></div>
        <div><label className="label" htmlFor="status">Status</label><select className="input" id="status" name="status" defaultValue={report.status}>{["DRAFT","GENERATED","SHARED"].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
        <div><label className="label" htmlFor="content">Content</label><textarea className="input min-h-40" id="content" name="content" defaultValue={report.content || ""} /></div>
        <button className="btn-primary" type="submit">Save report</button>
      </form>
    </div>
  );
}
