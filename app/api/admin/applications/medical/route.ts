import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const counselingStatus = searchParams.get("counselingStatus");

  const applications = await prisma.medicalApplication.findMany({
    where: {
      ...(status ? { status: status as "pending_payment" | "paid" | "failed" } : {}),
      ...(counselingStatus
        ? {
            counselingStatus: counselingStatus as
              | "not_scheduled"
              | "scheduled"
              | "completed",
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      referenceId: true,
      fullName: true,
      phone: true,
      email: true,
      neetScore: true,
      status: true,
      paidAt: true,
      counselingStatus: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ applications });
}
