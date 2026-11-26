import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/areas", label: "Areas" },
  { href: "/substances", label: "Substances" },
  { href: "/assessments", label: "Assessments" },
  { href: "/assessment-lists", label: "Lists" },
  { href: "/reports", label: "Reports" },
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
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="font-display text-xl font-semibold text-brand-700">HazQuant</Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-ink">{item.label}</Link>)}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:block">{session.user.email}</span>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="btn-secondary" type="submit">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}

