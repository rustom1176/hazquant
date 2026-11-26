import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  const membership = session?.user?.id ? await getActiveMembership(session.user.id) : null;
  const orgId = membership?.organizationId;
  const [assessments, reports, projects, substances] = orgId
    ? await Promise.all([
        prisma.assessment.count({ where: { organizationId: orgId } }),
        prisma.report.count({ where: { organizationId: orgId } }),
        prisma.project.count({ where: { organizationId: orgId } }),
        prisma.substance.count({ where: { organizationId: orgId } }),
      ])
    : [0, 0, 0, 0];

  const cards = [
    { label: "Assessments", value: String(assessments), note: "Total in workspace" },
    { label: "Reports", value: String(reports), note: "Drafts and generated" },
    { label: "Projects / Substances", value: `${projects} / ${substances}`, note: "Core records tracked" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}. {membership?.organization?.name ? `Workspace: ${membership.organization.name}.` : ""}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="panel p-5">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-brand-700">{card.value}</p>
            <p className="mt-2 text-sm text-muted">{card.note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 panel p-6">
        <h2 className="font-display text-lg font-semibold">Next steps</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>Create projects and areas to organize your facility.</li>
          <li>Add substances and hazard details.</li>
          <li>Build assessments and generate compliance reports.</li>
        </ul>
      </div>
    </div>
  );
}
