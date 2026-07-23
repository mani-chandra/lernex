import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/public-layout";
import { ResumeMedicalPayment } from "@/components/resume-medical-payment";
import { RazorpayScript } from "@/components/razorpay-checkout";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MedicalPaymentResumePage({ params }: PageProps) {
  const { id } = await params;
  const application = await prisma.medicalApplication.findUnique({
    where: { id },
    select: {
      id: true,
      referenceId: true,
      status: true,
      fullName: true,
    },
  });

  if (!application) notFound();

  return (
    <>
      <RazorpayScript />
      <PublicLayout
        title="Complete medical registration payment"
        description={`Reference ${application.referenceId}`}
      >
        {application.status === "paid" ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-900">
            <p>Payment already received for this application.</p>
            <Link
              href={`/admissions/success?track=medical&ref=${encodeURIComponent(application.referenceId)}&paid=1`}
              className="mt-4 inline-block font-semibold text-teal-800 underline"
            >
              View confirmation
            </Link>
          </div>
        ) : (
          <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
            <p className="text-zinc-700">
              Applicant: <strong>{application.fullName}</strong>
            </p>
            <p className="text-zinc-700">
              Amount due: <strong>₹{siteConfig.medicalFeeInr}</strong>
            </p>
            <ResumeMedicalPayment applicationId={application.id} />
          </div>
        )}
      </PublicLayout>
    </>
  );
}
