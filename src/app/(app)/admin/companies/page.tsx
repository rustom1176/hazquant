import { prisma } from "@/lib/prisma";
export default async function AdminCompaniesPage() {
  const orgs = await prisma.organization.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return <div><h1 className="font-display text-3xl font-semibold">Companies</h1><div className="panel mt-6 overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface text-left text-muted"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Created</th></tr></thead><tbody>{orgs.map(o=><tr key={o.id} className="border-t border-line"><td className="px-4 py-3">{o.name}</td><td className="px-4 py-3 text-muted">{o.slug}</td><td className="px-4 py-3 text-muted">{o.createdAt.toLocaleDateString()}</td></tr>)}{orgs.length===0&&<tr><td colSpan={3} className="px-4 py-8 text-center text-muted">No companies.</td></tr>}</tbody></table></div></div>;
}
