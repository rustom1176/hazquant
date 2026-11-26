"use server";

import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function updateArea(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  if (!id || !name) return;
  const existing = await prisma.area.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.area.update({
    where: { id },
    data: {
      name,
      location: String(formData.get("location") || "").trim() || null,
      projectId: String(formData.get("projectId") || "") || null,
    },
  });
  redirect("/areas");
}

export async function deleteArea(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const id = String(formData.get("id") || "");
  const existing = await prisma.area.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.area.delete({ where: { id } });
  redirect("/areas");
}
