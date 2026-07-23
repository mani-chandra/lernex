import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function csvEscape(value: string | number | null | undefined): string {
  const str = value == null ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.medicalApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "referenceId",
    "fullName",
    "email",
    "phone",
    "neetScore",
    "neetRollNumber",
    "neetYear",
    "category",
    "status",
    "paidAt",
    "counselingStatus",
    "createdAt",
  ];

  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        r.referenceId,
        r.fullName,
        r.email,
        r.phone,
        r.neetScore,
        r.neetRollNumber,
        r.neetYear,
        r.category,
        r.status,
        r.paidAt?.toISOString() ?? "",
        r.counselingStatus,
        r.createdAt.toISOString(),
      ]
        .map(csvEscape)
        .join(",")
    ),
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="medical-applications.csv"',
    },
  });
}
