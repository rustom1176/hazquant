import type { Metadata } from "next";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "Dashboard" };

const cards = [
  { label: "Active assessments", value: "0", note: "Create your first assessment" },
  { label: "Open controls", value: "0", note: "No pending controls" },
  { label: "Reports generated", value: "0", note: "Generate when ready" },
];

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}. Track assessments, controls, and reports.</p>
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
