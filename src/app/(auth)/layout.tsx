import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <div className="absolute inset-0 bg-hero-radial" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-soft bg-[size:32px_32px] opacity-30" aria-hidden="true" />
      <div className="container-page relative grid min-h-[calc(100vh-4rem)] items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white shadow-glow">HQ</span>
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">Haz<span className="text-brand-700">Quant</span></span>
          </Link>
          <h1 className="mt-8 max-w-lg font-display text-4xl font-semibold leading-tight tracking-tight text-ink xl:text-5xl">
            The premium workspace for hazardous risk intelligence.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-muted">
            Assess substances, document controls, manage compliance workflows, and generate audit-ready reports with confidence.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Secure organization workspaces", "Assessment-to-report traceability", "Role-based access control", "Export-ready compliance records"].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-line/70 bg-white/70 p-4 backdrop-blur">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.25a1 1 0 0 1-1.42 0l-3.8-3.8a1 1 0 1 1 1.415-1.415l3.092 3.093 6.493-6.537a1 1 0 0 1 1.414-.005Z" clipRule="evenodd" /></svg>
                <span className="text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white">HQ</span>
              Haz<span className="text-brand-700">Quant</span>
            </Link>
            <p className="mt-2 text-sm text-muted">Hazard quantification and compliance workspace</p>
          </div>
          <div className="panel-solid p-6 sm:p-8">{children}</div>
          <p className="mt-6 text-center text-xs text-muted">Protected workspace access. Your data is scoped to your organization.</p>
        </div>
      </div>
    </main>
  );
}
