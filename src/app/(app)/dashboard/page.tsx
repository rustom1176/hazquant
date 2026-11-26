import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  const membership = session?.user?.id ? await getActiveMembership(session.user.id) : null;
  const orgId = membership?.organizationId;

  const [assessments, reports, projects, substances, areas, users, recentAssessments, recentReports] = orgId
    ? await Promise.all([
        prisma.assessment.count({ where: { organizationId: orgId } }),
        prisma.report.count({ where: { organizationId: orgId } }),
        prisma.project.count({ where: { organizationId: orgId } }),
        prisma.substance.count({ where: { organizationId: orgId } }),
        prisma.area.count({ where: { organizationId: orgId } }),
        prisma.membership.count({ where: { organizationId: orgId } }),
        prisma.assessment.findMany({
          where: { organizationId: orgId },
          include: { project: true },
          orderBy: { updatedAt: "desc" },
          take: 5,
        }),
        prisma.report.findMany({
          where: { organizationId: orgId },
          include: { assessment: true },
          orderBy: { updatedAt: "desc" },
          take: 4,
        }),
      ])
    : [0, 0, 0, 0, 0, 0, [], []];

  const statusCounts = recentAssessments.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});
  const draftCount = statusCounts.DRAFT || 0;
  const reviewCount = statusCounts.IN_REVIEW || 0;
  const approvedCount = statusCounts.APPROVED || 0;

  const cards = [
    { label: "Assessments", value: assessments, note: "Risk evaluations tracked", href: "/assessments", accent: "text-brand-700" },
    { label: "Reports", value: reports, note: "Compliance documents", href: "/reports", accent: "text-emerald-700" },
    { label: "Projects", value: projects, note: "Operational scopes", href: "/projects", accent: "text-teal-700" },
    { label: "Substances", value: substances, note: "Materials in inventory", href: "/substances", accent: "text-cyan-700" },
    { label: "Areas", value: areas, note: "Locations mapped", href: "/areas", accent: "text-sky-700" },
    { label: "Team members", value: users, note: "Workspace access", href: "/users", accent: "text-violet-700" },
  ];

  const quickActions = [
    { title: "New assessment", desc: "Start a guided hazard evaluation", href: "/assessments/new", primary: true },
    { title: "Add substance", desc: "Register a hazardous material", href: "/substances/new", primary: false },
    { title: "Create report", desc: "Generate compliance documentation", href: "/reports/new", primary: false },
    { title: "New project", desc: "Define a facility or scope", href: "/projects/new", primary: false },
  ];

  return (
    <div className="space-y-6">
      <section className="panel-solid relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(700px_260px_at_90%_-20%,rgba(16,185,129,0.14),transparent_60%)]" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Workspace overview</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Welcome back{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {membership?.organization?.name ? <><span className="font-medium text-ink">{membership.organization.name}</span> is </> : "Your workspace is "}
              ready for hazard quantification. Track assessments, manage controls, and keep compliance documentation audit-ready.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/assessments/new" className="btn-primary">Create assessment</Link>
            <Link href="/reports/new" className="btn-secondary">New report</Link>
          </div>
        </div>
        <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-amber-200/70 bg-amber-50/70 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">Drafts</div>
            <div className="mt-1 font-display text-2xl font-semibold text-amber-900">{draftCount}</div>
            <div className="text-xs text-amber-700/80">In recent assessments</div>
          </div>
          <div className="rounded-xl border border-sky-200/70 bg-sky-50/70 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">In review</div>
            <div className="mt-1 font-display text-2xl font-semibold text-sky-900">{reviewCount}</div>
            <div className="text-xs text-sky-700/80">Awaiting approval</div>
          </div>
          <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Approved</div>
            <div className="mt-1 font-display text-2xl font-semibold text-emerald-900">{approvedCount}</div>
            <div className="text-xs text-emerald-700/80">Recently validated</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="panel-solid group p-5 transition hover:-translate-y-0.5 hover:shadow-glow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted">{card.label}</p>
                <p className={`mt-2 font-display text-3xl font-semibold ${card.accent}`}>{card.value}</p>
                <p className="mt-2 text-sm text-muted">{card.note}</p>
              </div>
              <span className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs text-muted transition group-hover:border-brand-200 group-hover:text-brand-700">View</span>
            </div>
          </Link>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="panel-solid p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">Recent assessments</h2>
              <p className="mt-1 text-sm text-muted">Latest hazard evaluations across your workspace.</p>
            </div>
            <Link href="/assessments" className="text-sm font-medium text-brand-700 hover:text-brand-800">View all</Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-line text-left text-muted"><th className="pb-3 pr-4 font-medium">Assessment</th><th className="pb-3 pr-4 font-medium">Project</th><th className="pb-3 pr-4 font-medium">Status</th><th className="pb-3 font-medium">Updated</th></tr></thead>
              <tbody>
                {recentAssessments.map((a) => (
                  <tr key={a.id} className="border-b border-line/60 last:border-0">
                    <td className="py-3 pr-4"><Link href={`/assessments/${a.id}`} className="font-medium text-ink hover:text-brand-700">{a.title}</Link></td>
                    <td className="py-3 pr-4 text-muted">{a.project?.name || "—"}</td>
                    <td className="py-3 pr-4"><span className="badge">{a.status.replace("_", " ")}</span></td>
                    <td className="py-3 text-muted">{a.updatedAt.toLocaleDateString()}</td>
                  </tr>
                ))}
                {recentAssessments.length === 0 && (
                  <tr><td colSpan={4} className="py-10 text-center text-muted">No assessments yet. Create your first assessment to start tracking risk.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section className="panel-solid p-6">
            <h2 className="font-display text-xl font-semibold text-ink">Quick actions</h2>
            <p className="mt-1 text-sm text-muted">Move work forward with common workflows.</p>
            <div className="mt-4 grid gap-3">
              {quickActions.map((a) => (
                <Link key={a.href} href={a.href} className={`rounded-xl border px-4 py-3 transition ${a.primary ? "border-brand-200 bg-brand-50/60 hover:bg-brand-50" : "border-line hover:border-brand-200 hover:bg-surface"}`}>
                  <div className={`text-sm font-semibold ${a.primary ? "text-brand-800" : "text-ink"}`}>{a.title}</div>
                  <div className="mt-0.5 text-xs text-muted">{a.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="surface-dark rounded-2xl p-6 text-white shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300/80">Compliance readiness</p>
            <h2 className="mt-2 font-display text-xl font-semibold">Build defensible records</h2>
            <ul className="mt-4 space-y-3 text-sm text-emerald-50/85">
              {["Link substances to assessments for traceability.", "Keep project and area context on every evaluation.", "Generate reports before audits, not during them.", "Use roles to keep accountability clear."].map((tip) => (
                <li key={tip} className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />{tip}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="panel-solid p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Recent reports</h2>
            <p className="mt-1 text-sm text-muted">Documentation output and compliance artifacts.</p>
          </div>
          <Link href="/reports" className="text-sm font-medium text-brand-700 hover:text-brand-800">View all</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {recentReports.map((r) => (
            <Link key={r.id} href={`/reports/${r.id}`} className="rounded-xl border border-line p-4 transition hover:border-brand-200 hover:bg-surface/50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-ink">{r.title}</div>
                  <div className="mt-1 text-xs text-muted">{r.assessment?.title ? `Assessment: ${r.assessment.title}` : "Standalone report"}</div>
                </div>
                <span className="badge">{r.status}</span>
              </div>
              <div className="mt-3 text-xs text-muted">Updated {r.updatedAt.toLocaleDateString()}</div>
            </Link>
          ))}
          {recentReports.length === 0 && (
            <div className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted md:col-span-2">
              No reports yet. Generate a report from an assessment to create audit-ready documentation.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
