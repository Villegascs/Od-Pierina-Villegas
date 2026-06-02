'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function requestAppointment(date: string, reason: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("No autenticado");

  await prisma.appointment.create({
    data: {
      patientId: session.user.id,
      requestedDate: new Date(date),
      reason,
      status: "PENDING"
    }
  });
  
  revalidatePath('/dashboard');
}

export async function acceptAppointment(id: string, agendaDate: string, durationMins: number) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") throw new Error("No autorizado");

  await prisma.appointment.update({
    where: { id },
    data: {
      status: "ACCEPTED",
      agendaDate: new Date(agendaDate),
      durationMins
    }
  });
  
  revalidatePath('/admin');
}

export async function rejectAppointment(id: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") throw new Error("No autorizado");

  await prisma.appointment.update({
    where: { id },
    data: {
      status: "REJECTED"
    }
  });
  
  revalidatePath('/admin');
}
