import { NextResponse } from "next/server";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const assessment = await prisma.assessment.findFirst({
    where: { id: params.id, organizationId: membership.organizationId },
    include: { project: true, area: true, owner: { select: { name: true, email: true } }, items: { include: { substance: true } }, reports: true },
  });
  if (!assessment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(JSON.stringify(assessment, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="assessment-${assessment.id}.json"`,
    },
  });
}
