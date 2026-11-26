import { requireUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditAccountPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  async function update(formData: FormData) {
    "use server";
    const user = await requireUser();
    const name = String(formData.get("name") || "").trim();
    await prisma.user.update({ where: { id: user.id }, data: { name: name || null } });
    redirect("/my-account");
  }
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Edit account</h1>
      <form action={update} className="panel mt-6 space-y-4 p-6">
        <div><label className="label" htmlFor="name">Full name</label><input className="input" id="name" name="name" defaultValue={dbUser?.name || ""} maxLength={120} /></div>
        <div><label className="label" htmlFor="email">Email</label><input className="input" id="email" value={dbUser?.email || ""} disabled /></div>
        <button className="btn-primary" type="submit">Save profile</button>
      </form>
    </div>
  );
}
