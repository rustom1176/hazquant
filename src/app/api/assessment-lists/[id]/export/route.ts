import { prisma } from "@/lib/prisma";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await prisma.assessmentList.findFirst({
    where: { id: params.id, organizationId: membership.organizationId },
    include: { items: { include: { assessment: { include: { project: true, area: true, items: { include: { substance: true } } } } } } },
  });
  if (!list) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(JSON.stringify(list, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": `attachment; filename="assessment-list-${list.id}.json"` } });
}
