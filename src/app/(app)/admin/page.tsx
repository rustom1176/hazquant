import Link from "next/link";
import { requireRole } from "@/lib/rbac";

const links = [
  ["/admin/companies","Companies"],["/admin/coupons","Coupons"],["/admin/help-fields","Help fields"],["/admin/recent-updates","Recent updates"],["/admin/referrals","Referrals"],
].map(([href,label])=>({href,label}));

export default async function AdminPage() {
  await requireRole(["OWNER","ADMIN"]);
  return (
    <div><h1 className="font-display text-3xl font-semibold">Admin</h1><p className="mt-1 text-sm text-muted">Administrative management areas.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{links.map(l => <Link key={l.href} href={l.href} className="panel p-5 hover:border-brand-200"><div className="font-medium">{l.label}</div><div className="mt-1 text-sm text-muted">Manage {l.label.toLowerCase()}.</div></Link>)}</div>
    </div>
  );
}

