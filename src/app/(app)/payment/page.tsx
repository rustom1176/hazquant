import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function PaymentPage() {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  const sub = membership ? await prisma.subscription.findFirst({ where: { organizationId: membership.organizationId }, orderBy: { createdAt: "desc" } }) : null;
  return (
    <div className="max-w-2xl space-y-6">
      <div><h1 className="font-display text-3xl font-semibold">Billing & payment</h1><p className="mt-1 text-sm text-muted">Manage subscription and payment details.</p></div>
      <div className="panel p-6">
        <p className="text-sm text-muted">Current plan</p>
        <p className="mt-2 font-display text-2xl font-semibold text-brand-700">{sub?.plan || "No active plan"}</p>
        <p className="mt-2 text-sm text-muted">Status: {sub?.status || "Not configured"} {sub?.renewsAt ? `• Renews ${sub.renewsAt.toLocaleDateString()}` : ""}</p>
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Live payment gateway integration requires a provider key/credentials (Stripe/Paystack/etc.). Core billing UI is ready for integration.</div>
      </div>
    </div>
  );
}
