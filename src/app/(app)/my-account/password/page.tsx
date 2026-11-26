import { requireUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export default async function AccountPasswordPage() {
  await requireUser();
  async function update(formData: FormData) {
    "use server";
    const user = await requireUser();
    const current = String(formData.get("currentPassword") || "");
    const next = String(formData.get("newPassword") || "");
    if (next.length < 12) return;
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser?.passwordHash) return;
    const ok = await bcrypt.compare(current, dbUser.passwordHash);
    if (!ok) return;
    const passwordHash = await bcrypt.hash(next, 12);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
    redirect("/my-account?password=updated");
  }
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Change password</h1>
      <form action={update} className="panel mt-6 space-y-4 p-6">
        <div><label className="label" htmlFor="currentPassword">Current password</label><input className="input" id="currentPassword" name="currentPassword" type="password" required /></div>
        <div><label className="label" htmlFor="newPassword">New password</label><input className="input" id="newPassword" name="newPassword" type="password" minLength={12} required /></div>
        <button className="btn-primary" type="submit">Update password</button>
      </form>
    </div>
  );
}
