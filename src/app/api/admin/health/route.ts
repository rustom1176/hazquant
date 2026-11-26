import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";

export async function GET() {
  const { membership } = await requireRole(["OWNER","ADMIN"]);
  const [assessments, reports, users] = await Promise.all([
    prisma.assessment.count({ where: { organizationId: membership.organizationId } }),
    prisma.report.count({ where: { organizationId: membership.organizationId } }),
    prisma.membership.count({ where: { organizationId: membership.organizationId } }),
  ]);
  return NextResponse.json({ ok: true, assessments, reports, users });
}
