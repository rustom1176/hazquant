import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-brand-700">
            HazQuant
          </Link>
          <p className="mt-2 text-sm text-muted">Hazard quantification and compliance workspace</p>
        </div>
        <div className="panel p-6 sm:p-8">{children}</div>
      </div>
    </main>
  );
}
