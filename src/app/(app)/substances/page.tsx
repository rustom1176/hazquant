import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function SubstancesPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const substances = membership ? await prisma.substance.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }) : [];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4"><div><h1 className="font-display text-3xl font-semibold">Substances</h1><p className="mt-1 text-sm text-muted">Maintain hazardous material records used in assessments.</p></div><Link href="/substances/new" className="btn-primary">New substance</Link></div>
      <div className="panel overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">CAS</th><th className="px-4 py-3">Hazard class</th></tr></thead><tbody>
        {substances.map((s) => <tr key={s.id} className="border-t border-line"><td className="px-4 py-3 font-medium">{s.name}</td><td className="px-4 py-3 text-muted">{s.casNumber || "—"}</td><td className="px-4 py-3 text-muted">{s.hazardClass || "—"}</td></tr>)}
        {substances.length === 0 && <tr><td className="px-4 py-8 text-center text-muted" colSpan={3}>No substances yet.</td></tr>}
      </tbody></table></div>
    </div>
  );
}
