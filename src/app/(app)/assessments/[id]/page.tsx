import { notFound, redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function AssessmentDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) notFound();
  const [assessment, substances] = await Promise.all([
    prisma.assessment.findFirst({
      where: { id: params.id, organizationId: membership.organizationId },
      include: { project: true, area: true, items: { include: { substance: true }, orderBy: { id: "desc" } } },
    }),
    prisma.substance.findMany({ where: { organizationId: membership.organizationId }, orderBy: { name: "asc" } }),
  ]);
  if (!assessment) notFound();

  async function addItem(formData: FormData) {
    "use server";
    const user = await requireUser();
    const membership = await getActiveMembership(user.id);
    if (!membership) return;
    const assessment = await prisma.assessment.findFirst({ where: { id: params.id, organizationId: membership.organizationId }, select: { id: true } });
    if (!assessment) return;
    const riskRaw = String(formData.get("riskRating") || "").trim();
    const riskRating = riskRaw ? Math.max(1, Math.min(5, Number(riskRaw))) : null;
    await prisma.assessmentItem.create({
      data: {
        assessmentId: assessment.id,
        substanceId: String(formData.get("substanceId") || "") || null,
        quantity: String(formData.get("quantity") || "").trim() || null,
        unit: String(formData.get("unit") || "").trim() || null,
        exposure: String(formData.get("exposure") || "").trim() || null,
        controls: String(formData.get("controls") || "").trim() || null,
        riskRating: Number.isFinite(riskRating as number) ? riskRating : null,
      },
    });
    redirect(`/assessments/${params.id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><h1 className="font-display text-3xl font-semibold">{assessment.title}</h1><p className="mt-1 text-sm text-muted">{assessment.summary || "No summary provided."}</p></div>
        <span className="badge">{assessment.status.replace("_", " ")}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-5"><p className="text-sm text-muted">Project</p><p className="mt-2 font-medium">{assessment.project?.name || "—"}</p></div>
        <div className="panel p-5"><p className="text-sm text-muted">Area</p><p className="mt-2 font-medium">{assessment.area?.name || "—"}</p></div>
        <div className="panel p-5"><p className="text-sm text-muted">Items</p><p className="mt-2 font-display text-2xl font-semibold text-brand-700">{assessment.items.length}</p></div>
      </div>

      <div className="panel p-6">
        <h2 className="font-display text-lg font-semibold">Add assessment item</h2>
        <form action={addItem} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><label className="label" htmlFor="substanceId">Substance</label><select className="input" id="substanceId" name="substanceId" defaultValue=""><option value="">Unspecified substance</option>{substances.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
          <div><label className="label" htmlFor="quantity">Quantity</label><input className="input" id="quantity" name="quantity" /></div>
          <div><label className="label" htmlFor="unit">Unit</label><input className="input" id="unit" name="unit" placeholder="kg, L, ppm" /></div>
          <div><label className="label" htmlFor="exposure">Exposure route</label><input className="input" id="exposure" name="exposure" placeholder="Inhalation, skin..." /></div>
          <div><label className="label" htmlFor="riskRating">Risk rating (1-5)</label><input className="input" id="riskRating" name="riskRating" type="number" min="1" max="5" /></div>
          <div className="md:col-span-2"><label className="label" htmlFor="controls">Controls</label><textarea className="input min-h-24" id="controls" name="controls" placeholder="Ventilation, PPE, procedures..." /></div>
          <div className="md:col-span-2"><button className="btn-primary" type="submit">Add item</button></div>
        </form>
      </div>

      <div className="panel overflow-hidden">
        <div className="border-b border-line px-4 py-3 font-medium">Assessment items</div>
        <table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Substance</th><th className="px-4 py-3">Quantity</th><th className="px-4 py-3">Exposure</th><th className="px-4 py-3">Risk</th></tr></thead>
          <tbody>
            {assessment.items.map((it) => <tr key={it.id} className="border-t border-line"><td className="px-4 py-3">{it.substance?.name || "—"}{it.controls ? <div className="mt-1 text-xs text-muted">{it.controls}</div> : null}</td><td className="px-4 py-3 text-muted">{[it.quantity, it.unit].filter(Boolean).join(" ") || "—"}</td><td className="px-4 py-3 text-muted">{it.exposure || "—"}</td><td className="px-4 py-3 text-muted">{it.riskRating ?? "—"}</td></tr>)}
            {assessment.items.length === 0 && <tr><td className="px-4 py-8 text-center text-muted" colSpan={4}>No assessment items yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
