import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

const cards = [
  { label: "Active assessments", value: "24", note: "3 require review" },
  { label: "Open controls", value: "8", note: "2 due this week" },
  { label: "Reports generated", value: "12", note: "Last 30 days" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-surface">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="font-display text-xl font-semibold text-brand-700">HazQuant</div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted sm:block">demo@hazquant.local</span>
            <Link href="/login" className="btn-secondary">Sign out</Link>
          </div>
        </div>
      </header>
      <div className="container-page py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Overview of assessments, controls, and reporting activity.</p>
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
          <h2 className="font-display text-lg font-semibold">Workspace setup in progress</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Core data models, authentication, assessments, and reporting workflows are being implemented. This dashboard will populate with live records once those phases are complete.
          </p>
        </div>
      </div>
    </main>
  );
}
