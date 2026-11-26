import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TrainingPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  async function createInvite(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) return;
    const email = String(formData.get("email") || "").trim().toLowerCase();
    if (!email) return;
    await prisma.invite.create({ data: { organizationId: membership.organizationId, email, role: "MEMBER", token: crypto.randomUUID().replace(/-/g,""), expiresAt: new Date(Date.now()+1000*60*60*24*7) } });
    redirect("/training");
  }
  const invites = membership ? await prisma.invite.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" }, take: 50 }) : [];
  return <div className="space-y-6"><div><h1 className="font-display text-3xl font-semibold">Training & invites</h1><p className="mt-1 text-sm text-muted">Invite team members and track onboarding access.</p></div>
    <form action={createInvite} className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-end"><div className="flex-1"><label className="label" htmlFor="email">Invite email</label><input className="input" id="email" name="email" type="email" required /></div><button className="btn-primary" type="submit">Create invite</button></form>
    <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Expires</th></tr></thead><tbody>{invites.map(i=><tr key={i.id} className="border-t border-line"><td className="px-4 py-3">{i.email}</td><td className="px-4 py-3 text-muted">{i.role}</td><td className="px-4 py-3 text-muted">{i.expiresAt.toLocaleDateString()}</td></tr>)}{invites.length===0&&<tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No invites yet.</td></tr>}</tbody></table></div>
  </div>;
}
