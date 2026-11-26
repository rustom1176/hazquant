import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { deleteSubstance } from "./[id]/actions";

export default async function SubstancesPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const substances = membership ? await prisma.substance.findMany({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Inventory</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Substances</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Maintain hazardous material records used in assessments. A clean substance library improves consistency, traceability, and reporting quality.</p>
        </div>
        <Link href="/substances/new" className="btn-primary">New substance</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel-solid p-5"><div className="text-sm text-muted">Total substances</div><div className="mt-1 font-display text-3xl font-semibold text-brand-700">{substances.length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">With CAS number</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{substances.filter((s) => s.casNumber).length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Classified</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{substances.filter((s) => s.hazardClass).length}</div></div>
      </div>

      <div className="panel-solid overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface/80 text-left text-muted"><tr><th className="px-5 py-3 font-medium">Name</th><th className="px-5 py-3 font-medium">CAS</th><th className="px-5 py-3 font-medium">Hazard class</th><th className="px-5 py-3 font-medium"></th></tr></thead>
          <tbody>
            {substances.map((s) => (
              <tr key={s.id} className="border-t border-line/70 transition hover:bg-surface/40">
                <td className="px-5 py-4 font-medium text-ink">{s.name}</td>
                <td className="px-5 py-4 text-muted">{s.casNumber || "—"}</td>
                <td className="px-5 py-4 text-muted">{s.hazardClass || "—"}</td>
                <td className="px-5 py-4"><div className="flex justify-end gap-3"><Link href={`/substances/${s.id}/edit`} className="text-brand-700 hover:underline">Edit</Link><form action={deleteSubstance}><input type="hidden" name="id" value={s.id} /><button className="text-red-600 hover:underline" type="submit">Delete</button></form></div></td>
              </tr>
            ))}
            {substances.length === 0 && (
              <tr><td className="px-5 py-14 text-center" colSpan={4}><div className="font-display text-lg font-semibold text-ink">No substances yet</div><p className="mt-2 text-sm text-muted">Add hazardous materials to build a reusable assessment inventory.</p><Link href="/substances/new" className="btn-primary mt-4">Add substance</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}