import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function VerifyEmailPage({ params }: { params: { token: string } }) {
  const token = params.token;
  const record = await prisma.verificationToken.findFirst({ where: { token } });
  if (!record || record.expires < new Date()) notFound();
  await prisma.user.updateMany({ where: { email: record.identifier }, data: { emailVerified: new Date() } });
  await prisma.verificationToken.delete({ where: { identifier_token: { identifier: record.identifier, token: record.token } } }).catch(() => null);
  return <div className="max-w-lg panel p-8"><h1 className="font-display text-2xl font-semibold">Email verified</h1><p className="mt-2 text-sm text-muted">Your email has been verified. You can continue using HazQuant.</p></div>;
}
