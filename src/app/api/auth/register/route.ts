import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators/auth";

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48) || "workspace";
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const { firstName, lastName, company, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) return NextResponse.json({ error: "Account already exists" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const baseSlug = slugify(company);
  const slug = `${baseSlug}-${Date.now().toString(36).slice(-4)}`;

  await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({ data: { name: company, slug } });
    const user = await tx.user.create({
      data: { email: normalizedEmail, name: `${firstName} ${lastName}`.trim(), passwordHash },
    });
    await tx.membership.create({ data: { userId: user.id, organizationId: organization.id, role: "OWNER" } });
  });

  return NextResponse.json({ ok: true });
}
