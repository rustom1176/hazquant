"use server";

import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

const statuses = ["DRAFT", "IN_REVIEW", "APPROVED", "ARCHIVED"] as const;
type AssessmentStatusValue = (typeof statuses)[number];

export async function updateAssessmentStatus(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const assessmentId = String(formData.get("assessmentId") || "");
  const status = String(formData.get("status") || "");
  if (!statuses.includes(status as AssessmentStatusValue)) return;
  const existing = await prisma.assessment.findFirst({ where: { id: assessmentId, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.assessment.update({ where: { id: existing.id }, data: { status: status as AssessmentStatusValue } });
  redirect(`/assessments/${existing.id}`);
}

export async function deleteAssessmentItem(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const itemId = String(formData.get("itemId") || "");
  const assessmentId = String(formData.get("assessmentId") || "");
  const item = await prisma.assessmentItem.findFirst({ where: { id: itemId, assessment: { id: assessmentId, organizationId: membership.organizationId } }, select: { id: true } });
  if (!item) return;
  await prisma.assessmentItem.delete({ where: { id: item.id } });
  redirect(`/assessments/${assessmentId}`);
}
