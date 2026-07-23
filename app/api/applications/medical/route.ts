import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReferenceId } from "@/lib/reference-id";
import { rateLimit } from "@/lib/rate-limit";
import {
  getRazorpayClient,
  MEDICAL_FEE_PAISE,
} from "@/lib/razorpay";
import { medicalApplicationSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`medical:${ip}`);
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

  const parsed = medicalApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const referenceId = generateReferenceId("MED");
  const dateOfBirth = new Date(data.dateOfBirth);
  if (Number.isNaN(dateOfBirth.getTime())) {
    return NextResponse.json({ error: "Invalid date of birth" }, { status: 400 });
  }

  const application = await prisma.medicalApplication.create({
    data: {
      referenceId,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      dateOfBirth,
      gender: data.gender,
      addressLine1: data.addressLine1.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      pincode: data.pincode.trim(),
      neetScore: data.neetScore,
      neetRollNumber: data.neetRollNumber.trim(),
      neetYear: data.neetYear,
      category: data.category,
      guardianName: data.guardianName.trim(),
      guardianPhone: data.guardianPhone.trim(),
      amountPaise: MEDICAL_FEE_PAISE,
    },
  });

  try {
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: MEDICAL_FEE_PAISE,
      currency: "INR",
      receipt: application.id.slice(0, 40),
      notes: {
        applicationId: application.id,
        referenceId: application.referenceId,
      },
    });

    await prisma.medicalApplication.update({
      where: { id: application.id },
      data: { razorpayOrderId: order.id },
    });

    return NextResponse.json({
      applicationId: application.id,
      referenceId: application.referenceId,
      orderId: order.id,
      amount: MEDICAL_FEE_PAISE,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch {
    await prisma.medicalApplication.update({
      where: { id: application.id },
      data: { status: "failed" },
    });
    return NextResponse.json(
      { error: "Unable to initiate payment. Please try again or contact support." },
      { status: 502 }
    );
  }
}
