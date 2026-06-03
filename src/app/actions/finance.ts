'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function getTransactions() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return [];

  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  });

  return transactions;
}

export async function createTransaction(type: "INCOME" | "EXPENSE", amount: number, description: string, date: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") throw new Error("No autorizado");

  await prisma.transaction.create({
    data: {
      type,
      amount,
      description,
      date: new Date(date)
    }
  });

  revalidatePath('/admin/finances');
}
