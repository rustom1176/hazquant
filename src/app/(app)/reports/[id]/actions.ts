"use server";

import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const statuses = ["DRAFT", "GENERATED", "SHARED"] as const;
type ReportStatusValue = (typeof statuses)[number];

export async function updateReport(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const status = String(formData.get("status") || "");
  if (!id || !title || !statuses.includes(status as ReportStatusValue)) return;
  const existing = await prisma.report.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.report.update({
    where: { id },
    data: {
      title,
      status: status as ReportStatusValue,
      content: String(formData.get("content") || "").trim() || null,
    },
  });
  redirect(`/reports/${id}`);
}

export async function deleteReport(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const id = String(formData.get("id") || "");
  const existing = await prisma.report.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.report.delete({ where: { id } });
  redirect("/reports");
}
