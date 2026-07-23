"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { FormField, inputClassName } from "@/components/form-field";

export function BtechApplicationForm() {
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
      const res = await fetch("/api/applications/btech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed");
        return;
      }
      router.push(
        `/admissions/success?track=btech&ref=${encodeURIComponent(data.referenceId)}`
      );
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="fullName">
          <input id="fullName" name="fullName" required className={inputClassName} />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClassName}
          />
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
        <FormField label="City" htmlFor="city">
          <input id="city" name="city" required className={inputClassName} />
        </FormField>
        <FormField label="State" htmlFor="state">
          <input id="state" name="state" required className={inputClassName} />
        </FormField>
        <FormField label="12th board" htmlFor="board">
          <input id="board" name="board" required className={inputClassName} />
        </FormField>
        <FormField label="Year of passing" htmlFor="yearOfPassing">
          <input
            id="yearOfPassing"
            name="yearOfPassing"
            type="number"
            min={2000}
            max={2100}
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="Percentage / CGPA" htmlFor="percentageOrCgpa">
          <input
            id="percentageOrCgpa"
            name="percentageOrCgpa"
            required
            className={inputClassName}
          />
        </FormField>
        <FormField label="Entrance exam (optional)" htmlFor="entranceExamName">
          <input id="entranceExamName" name="entranceExamName" className={inputClassName} />
        </FormField>
        <FormField label="Entrance score (optional)" htmlFor="entranceExamScore">
          <input id="entranceExamScore" name="entranceExamScore" className={inputClassName} />
        </FormField>
      </div>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Submitting…" : "Submit free registration"}
      </Button>
    </form>
  );
}
