import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const { membership } = await requireRole(["OWNER","ADMIN"]);
  const users = await prisma.membership.findMany({ where: { organizationId: membership.organizationId }, include: { user: true }, orderBy: { createdAt: "desc" } });
  async function updateRole(formData: FormData) {
    "use server";
    const { membership } = await requireRole(["OWNER","ADMIN"]);
    const id = String(formData.get("id") || "");
    const role = String(formData.get("role") || "");
    if (!["OWNER","ADMIN","MEMBER","VIEWER"].includes(role)) return;
    await prisma.membership.updateMany({ where: { id, organizationId: membership.organizationId }, data: { role: role as "OWNER"|"ADMIN"|"MEMBER"|"VIEWER" } });
  }
  return <div><h1 className="font-display text-3xl font-semibold">Admin users</h1><div className="panel mt-6 overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">User</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th></tr></thead><tbody>{users.map(u=><tr key={u.id} className="border-t border-line"><td className="px-4 py-3">{u.user.name||"—"}</td><td className="px-4 py-3 text-muted">{u.user.email}</td><td className="px-4 py-3"><form action={updateRole} className="flex gap-2"><input type="hidden" name="id" value={u.id}/><select name="role" defaultValue={u.role} className="input py-1">{["OWNER","ADMIN","MEMBER","VIEWER"].map(r=><option key={r} value={r}>{r}</option>)}</select><button className="btn-secondary" type="submit">Save</button></form></td></tr>)}{users.length===0&&<tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No users.</td></tr>}</tbody></table></div></div>;
}