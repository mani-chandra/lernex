import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpayClient, MEDICAL_FEE_PAISE } from "@/lib/razorpay";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const application = await prisma.medicalApplication.findUnique({
    where: { id },
  });

  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (application.status === "paid") {
    return NextResponse.json({
      referenceId: application.referenceId,
      status: application.status,
      alreadyPaid: true,
    });
  }

  try {
    const razorpay = getRazorpayClient();
    let orderId = application.razorpayOrderId;

    if (!orderId) {
      const order = await razorpay.orders.create({
        amount: MEDICAL_FEE_PAISE,
        currency: "INR",
        receipt: application.id.slice(0, 40),
        notes: {
          applicationId: application.id,
          referenceId: application.referenceId,
        },
      });
      orderId = order.id;
      await prisma.medicalApplication.update({
        where: { id: application.id },
        data: { razorpayOrderId: orderId, status: "pending_payment" },
      });
    }

    return NextResponse.json({
      applicationId: application.id,
      referenceId: application.referenceId,
      orderId,
      amount: MEDICAL_FEE_PAISE,
      currency: "INR",
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      prefill: {
        name: application.fullName,
        email: application.email,
        contact: application.phone,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to initiate payment" },
      { status: 502 }
    );
  }
}
