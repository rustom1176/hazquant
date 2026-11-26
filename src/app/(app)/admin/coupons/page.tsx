import { requireRole } from "@/lib/rbac";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminCouponsPage() {
  await requireRole(["OWNER", "ADMIN"]);
  async function addCoupon(formData: FormData) {
    "use server";
    const { membership } = await requireRole(["OWNER","ADMIN"]);
    const code = String(formData.get("code") || "").trim().toUpperCase();
    if (!code) return;
    await prisma.couponRedemption.create({ data: { organizationId: membership.organizationId, code } });
    redirect("/admin/coupons");
  }
  const items = await prisma.couponRedemption.findMany({ orderBy: { appliedAt: "desc" }, take: 100, include: { organization: true } });
  return <div className="space-y-6"><h1 className="font-display text-3xl font-semibold">Coupons</h1>
    <form action={addCoupon} className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-end"><div className="flex-1"><label className="label">Code</label><input className="input" name="code" required /></div><button className="btn-primary" type="submit">Add coupon</button></form>
    <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Organization</th><th className="px-4 py-3">Applied</th></tr></thead><tbody>{items.map(i=><tr key={i.id} className="border-t border-line"><td className="px-4 py-3">{i.code}</td><td className="px-4 py-3 text-muted">{i.organization.name}</td><td className="px-4 py-3 text-muted">{i.appliedAt.toLocaleDateString()}</td></tr>)}{items.length===0&&<tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No coupons redeemed.</td></tr>}</tbody></table></div></div>;
}
