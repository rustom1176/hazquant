"use server";

import { redirect } from "next/navigation";
import { requireUser, getActiveMembership } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function updateProject(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!id || !name) return;
  const existing = await prisma.project.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.project.update({ where: { id }, data: { name, description: description || null } });
  redirect(`/projects/${id}`);
}

export async function deleteProject(formData: FormData) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) return;
  const id = String(formData.get("id") || "");
  const existing = await prisma.project.findFirst({ where: { id, organizationId: membership.organizationId }, select: { id: true } });
  if (!existing) return;
  await prisma.project.delete({ where: { id } });
  redirect("/projects");
}
