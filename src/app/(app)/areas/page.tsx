import Link from "next/link";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { deleteArea } from "./[id]/actions";

export default async function AreasPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const areas = membership ? await prisma.area.findMany({ where: { organizationId: membership.organizationId }, include: { project: true }, orderBy: { createdAt: "desc" } }) : [];
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div><h1 className="font-display text-3xl font-semibold">Areas</h1><p className="mt-1 text-sm text-muted">Define locations where hazardous materials are stored or used.</p></div>
        <Link href="/areas/new" className="btn-primary">New area</Link>
      </div>
      <div className="panel overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Project</th><th className="px-4 py-3">Location</th><th className="px-4 py-3"></th></tr></thead>
          <tbody>
            {areas.map((a) => <tr key={a.id} className="border-t border-line"><td className="px-4 py-3 font-medium">{a.name}</td><td className="px-4 py-3 text-muted">{a.project?.name || "—"}</td><td className="px-4 py-3 text-muted">{a.location || "—"}</td><td className="px-4 py-3"><div className="flex justify-end gap-3"><Link href={`/areas/${a.id}/edit`} className="text-brand-700 hover:underline">Edit</Link><form action={deleteArea}><input type="hidden" name="id" value={a.id} /><button className="text-red-600 hover:underline" type="submit">Delete</button></form></div></td></tr>)}
            {areas.length === 0 && <tr><td className="px-4 py-8 text-center text-muted" colSpan={4}>No areas yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
