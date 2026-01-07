import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../prisma/generated/prisma/client";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding db");

  const password = await bcrypt.hash("dimas123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "dimas@gmail.com" },
    update: {},
    create: {
      email: "dimas@gmail.com",
      nama: "Dimas Firmansyiah",
      password,
      role: Role.ADMIN,
    },
  });

  const karyawan1 = await prisma.user.upsert({
    where: { email: "karyawan1@example.com" },
    update: {},
    create: {
      email: "karyawan1@example.com",
      nama: "Karyawan Satu",
      password,
      role: Role.KARYAWAN,
    },
  });

  const karyawan2 = await prisma.user.upsert({
    where: { email: "karyawan2@example.com" },
    update: {},
    create: {
      email: "karyawan2@example.com",
      nama: "Karyawan Dua",
      password,
      role: Role.KARYAWAN,
    },
  });

  const kemang = await prisma.wilayah.upsert({
    where: { nama_wilayah: "Kemang" },
    update: {},
    create: {
      nama_wilayah: "Kemang",
    },
  });

  const titanarum = await prisma.wilayah.upsert({
    where: { nama_wilayah: "Titan Arum" },
    update: {},
    create: {
      nama_wilayah: "Titan Arum",
    },
  });

  await prisma.userWilayah.createMany({
    data: [
      {
        userId: admin.id,
        wilayahId: kemang.id,
      },
      {
        userId: karyawan1.id,
        wilayahId: kemang.id,
      },
      {
        userId: karyawan2.id,
        wilayahId: titanarum.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding Selesai");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
