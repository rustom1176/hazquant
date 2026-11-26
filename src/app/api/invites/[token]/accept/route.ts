import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(_: Request, { params }: { params: { token: string } }) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const invite = await prisma.invite.findUnique({ where: { token: params.token } });
  if (!invite || invite.expiresAt < new Date() || invite.acceptedAt) return NextResponse.json({ error: "Invalid invite" }, { status: 400 });
  if (invite.email.toLowerCase() !== session.user.email.toLowerCase()) return NextResponse.json({ error: "Email mismatch" }, { status: 403 });
  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: session.user.id, organizationId: invite.organizationId } },
    create: { userId: session.user.id, organizationId: invite.organizationId, role: invite.role },
    update: { role: invite.role },
  });
  await prisma.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
  return NextResponse.json({ ok: true });
}
