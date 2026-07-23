"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import { FormField, inputClassName, selectClassName } from "@/components/form-field";

type Application = {
  id: string;
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  neetScore: number;
  neetRollNumber: string;
  neetYear: number;
  category: string;
  status: string;
  counselingStatus: string;
  counselingNotes: string | null;
  scheduledAt: string | null;
  guardianName: string;
  guardianPhone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
};

export function MedicalApplicationAdmin({ id }: { id: string }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/applications/medical/${id}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to load");
        setLoading(false);
        return;
      }
      setApplication(data.application);
      setLoading(false);
    }
    load();
  }, [id]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!application) return;
    setMessage(null);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch(`/api/admin/applications/medical/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Update failed");
      return;
    }
    setApplication(data.application);
    setMessage("Counseling details updated.");
  }

  if (loading) return <p className="text-sm text-zinc-600">Loading…</p>;
  if (error && !application) return <p className="text-sm text-red-600">{error}</p>;
  if (!application) return null;

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm text-teal-800 underline">
        ← Back to dashboard
      </Link>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold">{application.fullName}</h2>
        <p className="font-mono text-sm text-zinc-600">{application.referenceId}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500">Email</dt>
            <dd>{application.email}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Phone</dt>
            <dd>{application.phone}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">NEET score</dt>
            <dd>
              {application.neetScore} ({application.neetYear}, roll{" "}
              {application.neetRollNumber})
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Category</dt>
            <dd>{application.category}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Payment</dt>
            <dd>{application.status}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Address</dt>
            <dd>
              {application.addressLine1}, {application.city}, {application.state}{" "}
              {application.pincode}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Guardian</dt>
            <dd>
              {application.guardianName} ({application.guardianPhone})
            </dd>
          </div>
        </dl>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6"
      >
        <h3 className="font-semibold">Counseling</h3>
        <FormField label="Status" htmlFor="counselingStatus">
          <select
            id="counselingStatus"
            name="counselingStatus"
            defaultValue={application.counselingStatus}
            className={selectClassName}
          >
            <option value="not_scheduled">Not scheduled</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </FormField>
        <FormField label="Scheduled visit (optional)" htmlFor="scheduledAt">
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            defaultValue={
              application.scheduledAt
                ? new Date(application.scheduledAt).toISOString().slice(0, 16)
                : ""
            }
            className={inputClassName}
          />
        </FormField>
        <FormField label="Notes" htmlFor="counselingNotes">
          <textarea
            id="counselingNotes"
            name="counselingNotes"
            rows={4}
            defaultValue={application.counselingNotes ?? ""}
            className={inputClassName}
          />
        </FormField>
        {message ? <p className="text-sm text-green-700">{message}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit">Save counseling update</Button>
      </form>
    </div>
  );
}
