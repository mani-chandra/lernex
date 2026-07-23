import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { razorpayVerifySchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = razorpayVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const {
    applicationId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = parsed.data;

  const valid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );
  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  const application = await prisma.medicalApplication.findUnique({
    where: { id: applicationId },
  });
  if (!application || application.razorpayOrderId !== razorpay_order_id) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  if (application.status === "paid") {
    return NextResponse.json({
      referenceId: application.referenceId,
      status: application.status,
    });
  }

  const updated = await prisma.medicalApplication.update({
    where: { id: applicationId },
    data: {
      status: "paid",
      razorpayPaymentId: razorpay_payment_id,
      paidAt: new Date(),
    },
  });

  return NextResponse.json({
    referenceId: updated.referenceId,
    status: updated.status,
  });
}
