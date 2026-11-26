import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Role = { OWNER: "OWNER", ADMIN: "ADMIN", MEMBER: "MEMBER", VIEWER: "VIEWER" } as const;
const AssessmentStatus = { DRAFT: "DRAFT", IN_REVIEW: "IN_REVIEW", APPROVED: "APPROVED", ARCHIVED: "ARCHIVED" } as const;
const ReportStatus = { DRAFT: "DRAFT", GENERATED: "GENERATED", SHARED: "SHARED" } as const;

async function main() {
  const org = await prisma.organization.upsert({
    where: { slug: "demo-org" },
    update: {},
    create: { name: "Demo Organization", slug: "demo-org" },
  });

  const user = await prisma.user.upsert({
    where: { email: "demo@hazquant.local" },
    update: {},
    create: {
      email: "demo@hazquant.local",
      name: "Demo User",
      passwordHash: "replace-during-auth-phase",
    },
  });

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: user.id, organizationId: org.id } },
    update: { role: Role.OWNER },
    create: { userId: user.id, organizationId: org.id, role: Role.OWNER },
  });

  const project = await prisma.project.create({
    data: { organizationId: org.id, name: "Main Facility", description: "Demo project" },
  });

  const area = await prisma.area.create({
    data: { organizationId: org.id, projectId: project.id, name: "Storage Room A", location: "Building 1" },
  });

  const substance = await prisma.substance.create({
    data: { organizationId: org.id, name: "Ammonia", casNumber: "7664-41-7", hazardClass: "Toxic/Corrosive" },
  });

  const assessment = await prisma.assessment.create({
    data: {
      organizationId: org.id,
      projectId: project.id,
      areaId: area.id,
      ownerId: user.id,
      title: "Ammonia Storage Assessment",
      status: AssessmentStatus.IN_REVIEW,
      summary: "Initial demo assessment.",
      items: {
        create: [{ substanceId: substance.id, quantity: "50", unit: "L", exposure: "Inhalation", controls: "Ventilation, PPE", riskRating: 3 }],
      },
    },
  });

  await prisma.report.create({
    data: {
      organizationId: org.id,
      assessmentId: assessment.id,
      authorId: user.id,
      title: "Ammonia Storage Report",
      status: ReportStatus.DRAFT,
      content: "Demo report content.",
    },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
