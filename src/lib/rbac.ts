import { getActiveMembership, requireUser } from "@/lib/authz";
import { redirect } from "next/navigation";

type RoleValue = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export async function requireRole(roles: RoleValue[]) {
  const user = await requireUser();
  const membership = await getActiveMembership(user.id);
  if (!membership) redirect("/login");
  if (!roles.includes(membership.role as RoleValue)) redirect("/dashboard");
  return { user, membership };
}
