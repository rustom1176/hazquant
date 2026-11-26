import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const primaryNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/areas", label: "Areas" },
  { href: "/substances", label: "Substances" },
  { href: "/assessments", label: "Assessments" },
  { href: "/reports", label: "Reports" },
];

const secondaryNav = [
  { href: "/assessment-lists", label: "Lists" },
  { href: "/exports", label: "Exports" },
  { href: "/users", label: "Users" },
  { href: "/training", label: "Training" },
  { href: "/company", label: "Company" },
  { href: "/payment", label: "Billing" },
  { href: "/my-account", label: "Account" },
  { href: "/admin", label: "Admin" },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const initials = (session.user.name || session.user.email || "HQ")
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(900px_320px_at_20%_-10%,rgba(16,185,129,0.08),transparent_60%)]" aria-hidden="true" />
      <header className="sticky top-0 z-30 border-b border-line/70 bg-white/80 backdrop-blur-xl">
        <div className="container-page flex h-[68px] items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-[11px] font-bold text-white">HQ</span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">Haz<span className="text-brand-700">Quant</span></span>
            </Link>
            <nav className="hidden items-center gap-1 xl:flex">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-brand-50 hover:text-brand-800">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 rounded-xl border border-line/70 bg-white/70 px-3 py-1.5 md:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-800">{initials || "HQ"}</div>
              <div className="max-w-[180px]">
                <div className="truncate text-xs font-medium text-ink">{session.user.name || "Workspace user"}</div>
                <div className="truncate text-[11px] text-muted">{session.user.email}</div>
              </div>
            </div>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="btn-secondary px-3 py-2" type="submit">Sign out</button>
            </form>
          </div>
        </div>
        <div className="border-t border-line/60 xl:hidden">
          <div className="container-page flex gap-1 overflow-x-auto py-2 text-sm">
            {[...primaryNav, ...secondaryNav].map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-muted hover:bg-brand-50 hover:text-brand-800">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="container-page relative grid gap-6 py-6 xl:grid-cols-[240px_minmax(0,1fr)] xl:py-8">
        <aside className="hidden xl:block">
          <div className="panel-solid sticky top-[92px] p-4">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Workspace</p>
            <nav className="mt-2 space-y-0.5">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-brand-50 hover:text-brand-800">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="my-4 border-t border-line" />
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Operations</p>
            <nav className="mt-2 space-y-0.5">
              {secondaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-brand-50 hover:text-brand-800">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 rounded-xl bg-brand-950 p-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300/80">Pro tip</p>
              <p className="mt-2 text-xs leading-6 text-emerald-100/80">Keep assessments linked to projects and areas for stronger reporting context.</p>
            </div>
          </div>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

