import { prisma } from "@/lib/prisma";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const report = await prisma.report.findFirst({ where: { id: params.id, organizationId: membership.organizationId }, include: { assessment: { include: { items: { include: { substance: true } }, project: true, area: true } }, author: true } });
  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(JSON.stringify(report, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": `attachment; filename="report-${report.id}.json"` } });
}
