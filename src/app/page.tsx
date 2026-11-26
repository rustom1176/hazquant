import Link from "next/link";

const features = [
  {
    title: "Structured hazard assessments",
    desc: "Capture substances, locations, quantities, and exposure factors in a guided workflow designed for consistency.",
  },
  {
    title: "Compliance-ready reporting",
    desc: "Turn assessment data into clear summaries for audits, internal reviews, and operational handoffs.",
  },
  {
    title: "Accountability across teams",
    desc: "Assign owners, track actions, and maintain an audit trail so controls do not get lost after assessment.",
  },
];

const stats = [
  ["24", "Active assessments"],
  ["8", "Controls pending"],
  ["3", "High-priority flags"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line/80 bg-white/85 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight text-brand-700">
            HazQuant
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="btn-secondary px-3 sm:px-4">Sign in</Link>
            <Link href="/register" className="btn-primary px-3 sm:px-4">Create account</Link>
          </nav>
        </div>
      </header>

      <section className="container-page grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="badge">Hazard intelligence workspace</span>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Quantify chemical risk with clarity and control.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            HazQuant brings hazardous material assessments, documentation, and compliance reporting into one modern
            workspace. Built for safety teams that need accuracy, speed, and audit-ready records.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">Start workspace</Link>
            <Link href="/login" className="btn-secondary">Sign in</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span>Role-based access</span>
            <span>Assessment history</span>
            <span>Export-ready reports</span>
          </div>
        </div>

        <div className="panel relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-grid-soft bg-[size:24px_24px] opacity-40" aria-hidden="true" />
          <div className="relative rounded-2xl border border-line bg-white/90 p-6 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted">Facility risk overview</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">Assessment Snapshot</p>
              </div>
              <span className="badge">Live demo</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-xl border border-line bg-surface p-4">
                  <div className="font-display text-2xl font-semibold text-brand-700">{value}</div>
                  <div className="mt-1 text-xs leading-5 text-muted">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Ammonia storage — ventilation review",
                "Solvent transfer — PPE verification",
                "Battery room — spill kit inspection",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-sm">
                  <span className="text-ink">{item}</span>
                  <span className="font-medium text-brand-700">Tracked</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">Built for operational safety</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">Everything needed for defensible hazard decisions.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="panel p-6">
              <div className="mb-4 h-10 w-10 rounded-xl bg-brand-50 ring-1 ring-brand-100" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
