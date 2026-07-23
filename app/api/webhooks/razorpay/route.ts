import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";

type WebhookPaymentEntity = {
  id?: string;
  order_id?: string;
  status?: string;
};

type WebhookPayload = {
  event?: string;
  payload?: {
    payment?: {
      entity?: WebhookPaymentEntity;
    };
  };
};

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.event !== "payment.captured") {
    return NextResponse.json({ received: true });
  }

  const payment = payload.payload?.payment?.entity;
  const orderId = payment?.order_id;
  const paymentId = payment?.id;

  if (!orderId || !paymentId) {
    return NextResponse.json({ received: true });
  }

  const application = await prisma.medicalApplication.findUnique({
    where: { razorpayOrderId: orderId },
  });

  if (!application) {
    return NextResponse.json({ received: true });
  }

  if (application.status !== "paid") {
    await prisma.medicalApplication.update({
      where: { id: application.id },
      data: {
        status: "paid",
        razorpayPaymentId: paymentId,
        paidAt: new Date(),
      },
    });
  }

  return NextResponse.json({ received: true });
}
