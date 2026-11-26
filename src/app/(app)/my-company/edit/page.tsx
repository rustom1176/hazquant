import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

export default async function EditCompanyPage() {
  const { membership } = await requireRole(["OWNER", "ADMIN"]);
  const org = await prisma.organization.findUnique({ where: { id: membership.organizationId } });
  if (!org) notFound();

  async function update(formData: FormData) {
    "use server";
    const { membership } = await requireRole(["OWNER", "ADMIN"]);
    const name = String(formData.get("name") || "").trim();
    if (!name) return;
    await prisma.organization.update({ where: { id: membership.organizationId }, data: { name } });
    redirect("/company");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Edit company</h1>
      <p className="mt-1 text-sm text-muted">Update organization details.</p>
      <form action={update} className="panel mt-6 space-y-4 p-6">
        <div><label className="label" htmlFor="name">Company name</label><input className="input" id="name" name="name" defaultValue={org.name} required maxLength={120} /></div>
        <button className="btn-primary" type="submit">Save company</button>
      </form>
    </div>
  );
}
