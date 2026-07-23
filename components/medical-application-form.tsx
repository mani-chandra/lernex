"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { FormField, inputClassName, selectClassName } from "@/components/form-field";
import { StateCityFields } from "@/components/state-city-fields";
import { openRazorpayCheckout } from "@/components/razorpay-checkout";
import { siteConfig } from "@/lib/site-config";

export function MedicalApplicationForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/applications/medical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed");
        return;
      }

      if (!data.keyId || !data.orderId) {
        setError("Payment is not configured. Please contact support.");
        return;
      }

      await openRazorpayCheckout({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: siteConfig.name,
        description: `Medical admission registration (₹${siteConfig.medicalFeeInr})`,
        order_id: data.orderId,
        prefill: {
          name: String(payload.fullName),
          email: String(payload.email),
          contact: String(payload.phone),
        },
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
            return;
          }
          router.push(
            `/admissions/success?track=medical&ref=${encodeURIComponent(verifyData.referenceId)}&paid=1`
          );
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            router.push(
              `/admissions/success?track=medical&ref=${encodeURIComponent(data.referenceId)}&pending=1`
            );
          },
        },
      });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Registration fee: <strong>₹{siteConfig.medicalFeeInr}</strong> (pay after
        submitting this form). Paid applicants visit our office for NEET-based counseling.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="fullName">
          <input id="fullName" name="fullName" required className={inputClassName} />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required className={inputClassName} />
        </FormField>
        <FormField label="Mobile number" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="Date of birth" htmlFor="dateOfBirth">
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="Gender" htmlFor="gender">
          <select id="gender" name="gender" required className={selectClassName}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </FormField>
        <FormField label="Category" htmlFor="category">
          <select id="category" name="category" required className={selectClassName}>
            <option value="">Select</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
          </select>
        </FormField>
        <FormField label="Address" htmlFor="addressLine1" >
          <input
            id="addressLine1"
            name="addressLine1"
            required
            className={`${inputClassName} sm:col-span-2`}
          />
        </FormField>
        <StateCityFields />
        <FormField label="Pincode" htmlFor="pincode">
          <input
            id="pincode"
            name="pincode"
            inputMode="numeric"
            pattern="\d{6}"
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="NEET score" htmlFor="neetScore">
          <input
            id="neetScore"
            name="neetScore"
            type="number"
            min={0}
            max={720}
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="NEET roll number" htmlFor="neetRollNumber">
          <input
            id="neetRollNumber"
            name="neetRollNumber"
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="NEET year" htmlFor="neetYear">
          <input
            id="neetYear"
            name="neetYear"
            type="number"
            min={2016}
            max={2100}
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="Parent / guardian name" htmlFor="guardianName">
          <input id="guardianName" name="guardianName" required className={inputClassName} />
        </FormField>
        <FormField label="Guardian mobile" htmlFor="guardianPhone">
          <input
            id="guardianPhone"
            name="guardianPhone"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            required
            className={inputClassName}
          />
        </FormField>
      </div>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Processing…" : `Submit & pay ₹${siteConfig.medicalFeeInr}`}
      </Button>
    </form>
  );
}
