'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getPatients() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return [];

  const patients = await prisma.user.findMany({
    where: { role: 'PATIENT' },
    include: {
      appointments: {
        orderBy: { requestedDate: 'desc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return patients;
}
