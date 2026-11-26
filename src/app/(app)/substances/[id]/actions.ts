"use server";

import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function updateSubstance(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership || !["OWNER","ADMIN","MEMBER"].includes(membership.role)) return;
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  if (!id || !name) return;
  const existing = await prisma.substance.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.substance.update({
    where: { id },
    data: {
      name,
      casNumber: String(formData.get("casNumber") || "").trim() || null,
      hazardClass: String(formData.get("hazardClass") || "").trim() || null,
      notes: String(formData.get("notes") || "").trim() || null,
    },
  });
  redirect("/substances");
}

export async function deleteSubstance(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership || !["OWNER","ADMIN","MEMBER"].includes(membership.role)) return;
  const id = String(formData.get("id") || "");
  const existing = await prisma.substance.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.substance.delete({ where: { id } });
  redirect("/substances");
}

