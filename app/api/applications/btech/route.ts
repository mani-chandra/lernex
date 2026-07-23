import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReferenceId } from "@/lib/reference-id";
import { rateLimit } from "@/lib/rate-limit";
import { btechApplicationSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`btech:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = btechApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const referenceId = generateReferenceId("BT");

  await prisma.btechApplication.create({
    data: {
      referenceId,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      board: data.board.trim(),
      yearOfPassing: data.yearOfPassing,
      percentageOrCgpa: data.percentageOrCgpa.trim(),
      entranceExamName: data.entranceExamName?.trim() || null,
      entranceExamScore: data.entranceExamScore?.trim() || null,
      city: data.city.trim(),
      state: data.state.trim(),
    },
  });

  return NextResponse.json({ referenceId });
}
