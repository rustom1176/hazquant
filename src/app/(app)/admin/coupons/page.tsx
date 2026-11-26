import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";

export default async function AdminCouponsPage() {
  await requireRole(["OWNER", "ADMIN"]);
  const items = await prisma.couponRedemption.findMany({ orderBy: { appliedAt: "desc" }, take: 100, include: { organization: true } });
  return <div><h1 className="font-display text-3xl font-semibold">Coupons</h1><div className="panel mt-6 overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Organization</th><th className="px-4 py-3">Applied</th></tr></thead><tbody>{items.map(i=><tr key={i.id} className="border-t border-line"><td className="px-4 py-3">{i.code}</td><td className="px-4 py-3 text-muted">{i.organization.name}</td><td className="px-4 py-3 text-muted">{i.appliedAt.toLocaleDateString()}</td></tr>)}{items.length===0&&<tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No coupons redeemed.</td></tr>}</tbody></table></div></div>;
}
