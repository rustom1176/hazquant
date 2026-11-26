import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function CompanyPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const [org, counts] = membership
    ? await Promise.all([
        prisma.organization.findUnique({ where: { id: membership.organizationId } }),
        Promise.all([
          prisma.membership.count({ where: { organizationId: membership.organizationId } }),
          prisma.project.count({ where: { organizationId: membership.organizationId } }),
          prisma.assessment.count({ where: { organizationId: membership.organizationId } }),
        ]).then(([members, projects, assessments]) => ({ members, projects, assessments })),
      ])
    : [null, { members: 0, projects: 0, assessments: 0 }];

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Company</h1>
        <p className="mt-1 text-sm text-muted">Organization profile and workspace overview.</p>
      </div>
      <div className="panel p-6 space-y-3 text-sm">
        <div><span className="text-muted">Name:</span> <span className="font-medium">{org?.name || "—"}</span></div>
        <div><span className="text-muted">Slug:</span> <span className="font-medium">{org?.slug || "—"}</span></div>
        <div><span className="text-muted">Your role:</span> <span className="font-medium">{membership?.role || "—"}</span></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[ ["Members", counts.members], ["Projects", counts.projects], ["Assessments", counts.assessments] ].map(([k, v]) => (
          <div key={String(k)} className="panel p-5"><p className="text-sm text-muted">{k}</p><p className="mt-2 font-display text-2xl font-semibold text-brand-700">{v}</p></div>
        ))}
      </div>
    </div>
  );
}
