import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

export default async function AdminSubscriptionsPage() {
  const { membership } = await requireRole(["OWNER","ADMIN"]);
  const subs = await prisma.subscription.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } });
  async function createSub(formData: FormData) {
    "use server";
    const { membership } = await requireRole(["OWNER","ADMIN"]);
    const plan = String(formData.get("plan") || "").trim();
    if (!plan) return;
    await prisma.subscription.create({ data: { organizationId: membership.organizationId, plan, status: "TRIALING", seats: Number(formData.get("seats") || 1) || 1 } });
  }
  return <div className="space-y-6"><div><h1 className="font-display text-3xl font-semibold">Subscriptions</h1></div>
    <form action={createSub} className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-end"><div className="flex-1"><label className="label">Plan</label><input className="input" name="plan" required /></div><div><label className="label">Seats</label><input className="input" name="seats" type="number" min="1" defaultValue="1" /></div><button className="btn-primary" type="submit">Add</button></form>
    <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Plan</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Seats</th></tr></thead><tbody>{subs.map(s=><tr key={s.id} className="border-t border-line"><td className="px-4 py-3">{s.plan}</td><td className="px-4 py-3 text-muted">{s.status}</td><td className="px-4 py-3 text-muted">{s.seats}</td></tr>)}{subs.length===0&&<tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No subscriptions.</td></tr>}</tbody></table></div>
  </div>;
}
