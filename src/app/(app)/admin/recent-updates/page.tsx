import { requireRole } from "@/lib/rbac";

export default async function AdminRecentUpdatesPage() {
  await requireRole(["OWNER", "ADMIN"]);
  const updates = [
    "Assessment workflow actions added (status, item capture).",
    "Reports can be created, edited, and reviewed with assessment context.",
    "Core records support edit/delete with org-scoped checks.",
  ];
  return <div><h1 className="font-display text-3xl font-semibold">Recent updates</h1><div className="panel mt-6 p-6"><ul className="list-disc space-y-2 pl-5 text-sm text-muted">{updates.map(u => <li key={u}>{u}</li>)}</ul></div></div>;
}
