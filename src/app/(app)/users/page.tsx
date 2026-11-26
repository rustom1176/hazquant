import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const members = membership ? await prisma.membership.findMany({ where: { organizationId: membership.organizationId }, include: { user: true }, orderBy: { createdAt: "asc" } }) : [];
  return (
    <div>
      <div className="mb-6"><h1 className="font-display text-3xl font-semibold">Users</h1><p className="mt-1 text-sm text-muted">Manage organization members and roles.</p></div>
      <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th></tr></thead><tbody>
        {members.map(m => <tr key={m.id} className="border-t border-line"><td className="px-4 py-3 font-medium">{m.user.name || "—"}</td><td className="px-4 py-3 text-muted">{m.user.email}</td><td className="px-4 py-3"><span className="badge">{m.role}</span></td></tr>)}
        {members.length === 0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No members found.</td></tr>}
      </tbody></table></div>
    </div>
  );
}
