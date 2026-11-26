import Link from "next/link";

const stats = [
  { value: "360°", label: "Risk visibility", detail: "From substance inventory to final report" },
  { value: "10x", label: "Faster documentation", detail: "Structured workflows replace spreadsheets" },
  { value: "100%", label: "Audit traceability", detail: "Every assessment action is accountable" },
  { value: "24/7", label: "Workspace access", detail: "Secure cloud access for distributed teams" },
];

const capabilities = [
  {
    title: "Structured hazard assessments",
    desc: "Guide teams through consistent capture of substances, quantities, exposure routes, controls, and risk ratings so nothing critical is missed.",
    tag: "Assess",
  },
  {
    title: "Compliance-ready reporting",
    desc: "Generate clear, defensible reports for audits, management reviews, regulators, and operational handoffs without rebuilding data manually.",
    tag: "Report",
  },
  {
    title: "Project & area intelligence",
    desc: "Organize work by facility, project, and area to keep context intact across sites, teams, and assessment cycles.",
    tag: "Organize",
  },
  {
    title: "Substance control library",
    desc: "Maintain a living inventory of hazardous materials with hazard classes, CAS references, notes, and linked assessment history.",
    tag: "Control",
  },
  {
    title: "Role-based accountability",
    desc: "Assign owners, reviewers, and members with scoped access so the right people can act while sensitive data stays protected.",
    tag: "Secure",
  },
  {
    title: "Exports & operational handoff",
    desc: "Move assessment data into downstream workflows with exports and structured records that support continuity across teams.",
    tag: "Deliver",
  },
];

const workflow = [
  {
    step: "01",
    title: "Map your operation",
    desc: "Create projects, define areas, and register substances to establish a reliable operational baseline.",
  },
  {
    step: "02",
    title: "Assess with confidence",
    desc: "Document exposure, controls, and risk ratings in guided assessments built for consistency and clarity.",
  },
  {
    step: "03",
    title: "Report and act",
    desc: "Produce audit-ready reports, track status, and keep owners accountable for mitigation actions.",
  },
];

const standards = [
  "Audit-ready documentation trails",
  "Organization-scoped data isolation",
  "Role-based access controls",
  "Assessment status governance",
  "Exportable compliance records",
  "Secure credential-based access",
];

const industries = [
  { name: "Manufacturing", detail: "Chemical handling, process lines, maintenance zones." },
  { name: "Energy & Utilities", detail: "Fuel storage, treatment systems, field operations." },
  { name: "Construction", detail: "Site materials, temporary storage, contractor oversight." },
  { name: "Laboratories", detail: "Reagent inventories, exposure controls, documentation." },
  { name: "Logistics", detail: "Warehousing, transport staging, spill preparedness." },
  { name: "Healthcare", detail: "Hazardous agents, cleaning chemicals, compliance records." },
];

const testimonials = [
  {
    quote:
      "HazQuant gave us a single source of truth for assessments. What used to take days of spreadsheet cleanup now takes hours, with far better confidence in the output.",
    name: "Operations Safety Lead",
    org: "Global Manufacturing Group",
  },
  {
    quote:
      "The reporting clarity is the difference. Our teams can see risk, controls, and ownership in one place, and audits are no longer a fire drill.",
    name: "EHS Program Manager",
    org: "Multi-site Industrial Operator",
  },
  {
    quote:
      "We finally have structure. Projects, substances, assessments, and reports are connected in a way that makes compliance part of daily operations.",
    name: "Compliance Director",
    org: "Regional Facilities Network",
  },
];

const faqs = [
  {
    q: "What is HazQuant?",
    a: "HazQuant is a hazard quantification and compliance workspace for managing substances, assessments, controls, and reports in one secure, structured platform.",
  },
  {
    q: "Who is it built for?",
    a: "EHS teams, operations leaders, compliance managers, consultants, and organizations that need defensible hazardous material documentation across sites and projects.",
  },
  {
    q: "Can teams collaborate with different permissions?",
    a: "Yes. HazQuant supports organization-scoped workspaces with role-based access so owners, admins, members, and viewers have appropriate capabilities.",
  },
  {
    q: "Does it support reporting and exports?",
    a: "Yes. Assessments can be tracked through status workflows and exported, while reports provide structured, compliance-ready documentation for stakeholders.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-white/75 backdrop-blur-xl">
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white shadow-glow">
              HQ
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              Haz<span className="text-brand-700">Quant</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
            <a href="#capabilities" className="transition hover:text-brand-700">Capabilities</a>
            <a href="#workflow" className="transition hover:text-brand-700">Workflow</a>
            <a href="#industries" className="transition hover:text-brand-700">Industries</a>
            <a href="#faq" className="transition hover:text-brand-700">FAQ</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="btn-ghost hidden px-3 sm:inline-flex">Sign in</Link>
            <Link href="/register" className="btn-primary px-4 sm:px-5">Start workspace</Link>
          </div>
        </div>
      </header>

      <section className="relative border-b border-line/60 bg-hero-radial">
        <div className="absolute inset-0 bg-grid-soft bg-[size:32px_32px] opacity-[0.35]" aria-hidden="true" />
        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="animate-fade-up">
            <span className="badge">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
              Premium hazard intelligence platform
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[4rem]">
              Turn hazardous complexity into{" "}
              <span className="bg-gradient-to-r from-brand-800 via-brand-600 to-brand-700 bg-clip-text text-transparent">
                confident decisions.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              HazQuant gives safety, operations, and compliance teams a world-class workspace to assess hazardous materials,
              document controls, assign accountability, and deliver audit-ready reports. Built for organizations where clarity,
              speed, and defensibility matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn-primary px-6 py-3">Create free workspace</Link>
              <Link href="/login" className="btn-secondary px-6 py-3">Sign in to platform</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              {["Organization-scoped security", "Assessment-to-report workflow", "Built for real operations"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.42 0l-3.8-3.8a1 1 0 1 1 1.415-1.415l3.092 3.093 6.493-6.537a1 1 0 0 1 1.414-.005Z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-200/40 via-transparent to-brand-100/30 blur-2xl" aria-hidden="true" />
            <div className="panel relative overflow-hidden p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Live workspace</p>
                  <p className="mt-1 font-display text-xl font-semibold text-ink">Facility Risk Command Center</p>
                </div>
                <span className="badge">Operational view</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { v: "24", l: "Active assessments", c: "text-brand-700" },
                  { v: "08", l: "Controls pending", c: "text-amber-600" },
                  { v: "03", l: "High-priority flags", c: "text-rose-600" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-line bg-surface/70 p-4">
                    <div className={`font-display text-2xl font-semibold ${s.c}`}>{s.v}</div>
                    <div className="mt-1 text-xs leading-5 text-muted">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-line bg-white p-4">
                <div className="flex items-center justify-between text-xs font-medium text-muted">
                  <span>Assessment pipeline</span>
                  <span className="text-brand-700">78% on track</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-brand-100">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-brand-600 to-brand-400" />
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    ["Ammonia storage — ventilation review", "In review", "bg-amber-100 text-amber-800"],
                    ["Solvent transfer — PPE verification", "Approved", "bg-emerald-100 text-emerald-800"],
                    ["Battery room — spill kit inspection", "Action required", "bg-rose-100 text-rose-800"],
                  ].map(([item, status, cls]) => (
                    <div key={item} className="flex items-center justify-between gap-3 rounded-lg border border-line/70 bg-surface/40 px-3 py-2.5 text-sm">
                      <span className="text-ink">{item}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cls}`}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-page relative pb-14 lg:pb-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="panel p-5">
                <div className="stat-value text-brand-800">{s.value}</div>
                <div className="mt-1 text-sm font-semibold text-ink">{s.label}</div>
                <div className="mt-1 text-sm leading-6 text-muted">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="container-page py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="section-kicker">Platform capabilities</p>
          <h2 className="section-title">Everything your team needs for defensible hazard management.</h2>
          <p className="section-copy">
            HazQuant connects the full lifecycle of hazardous material governance — from inventory and assessment to
            reporting and accountability — in one premium, secure workspace.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((f) => (
            <article key={f.title} className="panel group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{f.tag}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="border-y border-line/60 bg-white/50 py-20 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="section-kicker">How it works</p>
            <h2 className="section-title">A clear workflow from raw risk to ready action.</h2>
            <p className="section-copy">
              HazQuant is designed around the way real safety teams work. Every step creates structured, reusable data that
              strengthens the next decision.
            </p>
            <div className="mt-8 space-y-5">
              {workflow.map((w) => (
                <div key={w.step} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 font-display text-sm font-semibold text-white">
                    {w.step}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{w.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-solid p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-ink">Compliance confidence by design</h3>
              <span className="badge">Built-in governance</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">
              The platform is structured to support defensible decision-making. Data is scoped, actions are accountable, and
              outputs are ready for stakeholders who need clarity.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {standards.map((s) => (
                <div key={s} className="flex items-start gap-3 rounded-xl border border-line bg-surface/60 p-4">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.42 0l-3.8-3.8a1 1 0 1 1 1.415-1.415l3.092 3.093 6.493-6.537a1 1 0 0 1 1.414-.005Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-ink">{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl surface-dark p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200/80">Security posture</p>
              <p className="mt-2 text-sm leading-7 text-emerald-50/90">
                Credentials are protected with modern hashing, sensitive workflows are role-gated, and organization data is
                scoped to membership. HazQuant is built to treat safety data like the critical asset it is.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="container-page py-20 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">Built for real-world operations</p>
            <h2 className="section-title">Trusted patterns for teams across high-stakes industries.</h2>
            <p className="section-copy">
              Wherever hazardous materials are stored, moved, used, or reviewed, HazQuant provides the structure to manage
              risk with consistency and confidence.
            </p>
          </div>
          <Link href="/register" className="btn-secondary shrink-0">Explore the workspace</Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind.name} className="panel p-5">
              <div className="font-display text-lg font-semibold text-ink">{ind.name}</div>
              <p className="mt-2 text-sm leading-7 text-muted">{ind.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line/60 bg-brand-950 py-20 text-white lg:py-24">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">What teams value</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Designed to feel calm, clear, and in control.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-100/75">
              Premium safety software should reduce cognitive load, not add to it. HazQuant focuses on clarity, trust, and
              operational momentum.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <svg className="h-8 w-8 text-emerald-400/60" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983Zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983Z" />
                </svg>
                <blockquote className="mt-4 text-sm leading-7 text-emerald-50/90">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-emerald-200/70">{t.org}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="container-page py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Frequently asked questions</p>
            <h2 className="section-title">Answers before you get started.</h2>
            <p className="section-copy">
              HazQuant is built to be practical from day one. Here are the essentials teams usually want to know.
            </p>
            <div className="mt-8 panel-solid p-6">
              <div className="font-display text-lg font-semibold text-ink">Need a tailored walkthrough?</div>
              <p className="mt-2 text-sm leading-7 text-muted">
                Create a workspace and start mapping your projects, substances, and assessments right away.
              </p>
              <Link href="/register" className="btn-primary mt-4">Get started</Link>
            </div>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="panel-solid group p-5 open:shadow-glow">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                  <span>{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition group-open:rotate-45 group-open:border-brand-200 group-open:text-brand-700">+</span>
                </summary>
                <p className="mt-3 pr-8 text-sm leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-20 lg:pb-24">
        <div className="surface-dark relative overflow-hidden rounded-3xl px-6 py-12 text-white sm:px-10 sm:py-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">Ready when you are</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Build a safer, more accountable operation with HazQuant.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-100/80">
              Bring assessments, substances, reports, and team accountability into one premium platform. Start with a
              workspace today and give your organization the clarity it deserves.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn-primary bg-brand-500 px-6 py-3 text-brand-950 hover:bg-brand-400">Create your workspace</Link>
              <Link href="/login" className="btn border border-white/20 bg-white/5 px-6 py-3 text-white hover:bg-white/10">Sign in</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line/70 bg-white/60">
        <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-xs font-bold text-white">HQ</span>
              <span className="font-display text-lg font-semibold text-ink">HazQuant</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
              A premium hazard quantification and compliance workspace for modern safety teams. Structured, secure, and
              built for defensible decisions.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">Platform</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><a href="#capabilities" className="hover:text-brand-700">Capabilities</a></li>
              <li><a href="#workflow" className="hover:text-brand-700">Workflow</a></li>
              <li><a href="#industries" className="hover:text-brand-700">Industries</a></li>
              <li><a href="#faq" className="hover:text-brand-700">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">Workspace</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link href="/register" className="hover:text-brand-700">Create account</Link></li>
              <li><Link href="/login" className="hover:text-brand-700">Sign in</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-700">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">Trust</div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Organization-scoped data</li>
              <li>Role-based access</li>
              <li>Audit-ready records</li>
              <li>Secure authentication</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line/70">
          <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} HazQuant. All rights reserved.</p>
            <p>Built for clarity, compliance, and operational confidence.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
