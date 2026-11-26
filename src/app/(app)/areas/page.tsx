import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { deleteArea } from "./[id]/actions";

export default async function AreasPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const areas = membership ? await prisma.area.findMany({ where: { organizationId: membership.organizationId }, include: { project: true }, orderBy: { createdAt: "desc" } }) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Locations</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Areas</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">Define locations where hazardous materials are stored or used. Areas anchor assessments to real operational context.</p>
        </div>
        <Link href="/areas/new" className="btn-primary">New area</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel-solid p-5"><div className="text-sm text-muted">Total areas</div><div className="mt-1 font-display text-3xl font-semibold text-brand-700">{areas.length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">Linked to projects</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{areas.filter((a) => a.projectId).length}</div></div>
        <div className="panel-solid p-5"><div className="text-sm text-muted">With location details</div><div className="mt-1 font-display text-3xl font-semibold text-ink">{areas.filter((a) => a.location).length}</div></div>
      </div>

      <div className="panel-solid overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface/80 text-left text-muted"><tr><th className="px-5 py-3 font-medium">Name</th><th className="px-5 py-3 font-medium">Project</th><th className="px-5 py-3 font-medium">Location</th><th className="px-5 py-3 font-medium"></th></tr></thead>
          <tbody>
            {areas.map((a) => (
              <tr key={a.id} className="border-t border-line/70 transition hover:bg-surface/40">
                <td className="px-5 py-4 font-medium text-ink">{a.name}</td>
                <td className="px-5 py-4 text-muted">{a.project?.name || "—"}</td>
                <td className="px-5 py-4 text-muted">{a.location || "—"}</td>
                <td className="px-5 py-4"><div className="flex justify-end gap-3"><Link href={`/areas/${a.id}/edit`} className="text-brand-700 hover:underline">Edit</Link><form action={deleteArea}><input type="hidden" name="id" value={a.id} /><button className="text-red-600 hover:underline" type="submit">Delete</button></form></div></td>
              </tr>
            ))}
            {areas.length === 0 && (
              <tr><td className="px-5 py-14 text-center" colSpan={4}><div className="font-display text-lg font-semibold text-ink">No areas yet</div><p className="mt-2 text-sm text-muted">Add areas to map where hazardous materials are handled or stored.</p><Link href="/areas/new" className="btn-primary mt-4">Create area</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}