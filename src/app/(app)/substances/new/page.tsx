import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default function NewSubstancePage() {
  async function create(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) redirect("/dashboard");
    const name = String(formData.get("name") || "").trim();
    if (!name) return;
    await prisma.substance.create({ data: {
      organizationId: membership.organizationId, name,
      casNumber: String(formData.get("casNumber") || "").trim() || null,
      hazardClass: String(formData.get("hazardClass") || "").trim() || null,
      notes: String(formData.get("notes") || "").trim() || null,
    }});
    redirect("/substances");
  }
  return <div className="max-w-2xl"><h1 className="font-display text-3xl font-semibold">New substance</h1><form action={create} className="panel mt-6 space-y-4 p-6">
    <div><label className="label" htmlFor="name">Name</label><input className="input" id="name" name="name" required /></div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="label" htmlFor="casNumber">CAS number</label><input className="input" id="casNumber" name="casNumber" /></div><div><label className="label" htmlFor="hazardClass">Hazard class</label><input className="input" id="hazardClass" name="hazardClass" /></div></div>
    <div><label className="label" htmlFor="notes">Notes</label><textarea className="input min-h-24" id="notes" name="notes" /></div>
    <button className="btn-primary" type="submit">Create substance</button>
  </form></div>;
}
