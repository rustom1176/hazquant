import { requireRole } from "@/lib/rbac";

export default async function AdminHelpFieldsPage() {
  await requireRole(["OWNER", "ADMIN"]);
  const fields = [
    ["Assessment title", "Clear name describing process, location, and material."],
    ["Exposure route", "How people may be exposed: inhalation, dermal, ingestion, injection."],
    ["Controls", "Engineering, administrative, and PPE controls applied."],
  ];
  return <div><h1 className="font-display text-3xl font-semibold">Help fields</h1><div className="panel mt-6 p-6"><dl className="space-y-4">{fields.map(([k,v]) => <div key={k}><dt className="font-medium">{k}</dt><dd className="text-sm text-muted">{v}</dd></div>)}</dl></div></div>;
}
