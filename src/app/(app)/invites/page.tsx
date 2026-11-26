import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function InvitesPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const invites = membership ? await prisma.invite.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }) : [];
  return <div><div className="mb-6"><h1 className="font-display text-3xl font-semibold">Invites</h1><p className="mt-1 text-sm text-muted">Pending and historical organization invites.</p></div><div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Accepted</th></tr></thead><tbody>{invites.map(i=><tr key={i.id} className="border-t border-line"><td className="px-4 py-3">{i.email}</td><td className="px-4 py-3 text-muted">{i.role}</td><td className="px-4 py-3 text-muted">{i.acceptedAt ? i.acceptedAt.toLocaleDateString() : "Pending"}</td></tr>)}{invites.length===0&&<tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No invites.</td></tr>}</tbody></table></div></div>;
}
