import Link from "next/link";
import { PublicLayout } from "@/components/public-layout";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

type PageProps = {
  searchParams: Promise<{
    track?: string;
    ref?: string;
    paid?: string;
    pending?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const track = params.track;
  const ref = params.ref;
  const paidFlag = params.paid === "1";
  const pendingFlag = params.pending === "1";

  let medicalStatus: string | null = null;
  let medicalId: string | null = null;

  if (track === "medical" && ref) {
    const app = await prisma.medicalApplication.findUnique({
      where: { referenceId: ref },
      select: { id: true, status: true },
    });
    medicalStatus = app?.status ?? null;
    medicalId = app?.id ?? null;
  }

  const medicalPaid = medicalStatus === "paid" || paidFlag;

  return (
    <PublicLayout title="Registration status" description="Save your reference ID for future correspondence.">
      <div className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {ref ? (
          <p className="text-lg">
            Reference ID:{" "}
            <span className="font-mono font-semibold text-teal-800">{ref}</span>
          </p>
        ) : (
          <p className="text-zinc-600">No reference ID provided.</p>
        )}

        {track === "btech" ? (
          <div className="rounded-lg bg-green-50 p-4 text-green-900">
            <p className="font-semibold">B.Tech AI/ML registration received</p>
            <p className="mt-2 text-sm">
              Thank you. Our team will contact you using the details you provided.
            </p>
          </div>
        ) : null}

        {track === "medical" ? (
          medicalPaid ? (
            <div className="space-y-3 rounded-lg bg-green-50 p-4 text-green-950">
              <p className="font-semibold">Medical registration confirmed</p>
              <p className="text-sm">
                Payment received. Please visit our office for NEET-based counseling.
              </p>
              <ul className="list-inside list-disc text-sm">
                <li>{siteConfig.officeAddress}</li>
                <li>{siteConfig.officeHours}</li>
                <li>Bring NEET score printout, admit card, and a valid photo ID.</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-3 rounded-lg bg-amber-50 p-4 text-amber-950">
              <p className="font-semibold">Payment pending</p>
              <p className="text-sm">
                Your application is saved but payment was not completed. Complete
                payment to confirm registration and schedule office counseling.
              </p>
              {medicalId ? (
                <Link
                  href={`/admissions/medical/payment/${medicalId}`}
                  className="inline-block font-semibold text-teal-800 underline"
                >
                  Resume payment
                </Link>
              ) : null}
              {pendingFlag ? (
                <p className="text-xs text-amber-900">
                  You closed the payment window — you can pay anytime using the link above.
                </p>
              ) : null}
            </div>
          )
        ) : null}

        <Link href="/" className="inline-block text-sm font-medium text-teal-800 hover:underline">
          Back to home
        </Link>
      </div>
    </PublicLayout>
  );
}
