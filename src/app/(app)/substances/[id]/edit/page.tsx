import { notFound } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { updateSubstance } from "../actions";

export default async function EditSubstancePage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const substance = await prisma.substance.findFirst({ where: { id: params.id, organizationId: membership.organizationId } });
  if (!substance) notFound();
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Edit substance</h1>
      <form action={updateSubstance} className="panel mt-6 space-y-4 p-6">
        <input type="hidden" name="id" value={substance.id} />
        <div><label className="label" htmlFor="name">Name</label><input className="input" id="name" name="name" defaultValue={substance.name} required /></div>
        <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="casNumber">CAS number</label><input className="input" id="casNumber" name="casNumber" defaultValue={substance.casNumber || ""} /></div><div><label className="label" htmlFor="hazardClass">Hazard class</label><input className="input" id="hazardClass" name="hazardClass" defaultValue={substance.hazardClass || ""} /></div></div>
        <div><label className="label" htmlFor="notes">Notes</label><textarea className="input min-h-24" id="notes" name="notes" defaultValue={substance.notes || ""} /></div>
        <button className="btn-primary" type="submit">Save changes</button>
      </form>
    </div>
  );
}
