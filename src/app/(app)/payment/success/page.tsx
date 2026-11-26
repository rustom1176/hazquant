import Link from "next/link";
export default function PaymentSuccessPage() {
  return <div className="max-w-xl panel p-8"><h1 className="font-display text-2xl font-semibold">Payment received</h1><p className="mt-2 text-sm text-muted">If a payment provider is connected, this page confirms the return flow. No live payment was processed in this environment.</p><Link href="/payment" className="btn-primary mt-5 inline-flex">Back to billing</Link></div>;
}
