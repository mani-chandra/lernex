"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { openRazorpayCheckout } from "@/components/razorpay-checkout";
import { siteConfig } from "@/lib/site-config";

export function ResumeMedicalPayment({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function payNow() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/applications/medical/${applicationId}/payment`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not start payment");
        setLoading(false);
        return;
      }

      if (data.alreadyPaid) {
        router.push(
          `/admissions/success?track=medical&ref=${encodeURIComponent(data.referenceId)}&paid=1`
        );
        return;
      }

      if (!data.keyId) {
        setError("Payment is not configured.");
        setLoading(false);
        return;
      }

      await openRazorpayCheckout({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: siteConfig.name,
        description: `Medical admission registration (₹${siteConfig.medicalFeeInr})`,
        order_id: data.orderId,
        prefill: data.prefill,
        handler: async (response) => {
          const verifyRes = await fetch("/api/payments/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              applicationId: data.applicationId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) {
            setError(verifyData.error ?? "Payment verification failed");
            setLoading(false);
            return;
          }
          router.push(
            `/admissions/success?track=medical&ref=${encodeURIComponent(verifyData.referenceId)}&paid=1`
          );
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button onClick={payNow} disabled={loading}>
        {loading ? "Opening payment…" : `Pay ₹${siteConfig.medicalFeeInr}`}
      </Button>
    </div>
  );
}
