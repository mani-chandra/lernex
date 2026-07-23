"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";

type MedicalRow = {
  id: string;
  referenceId: string;
  fullName: string;
  phone: string;
  neetScore: number;
  status: string;
  paidAt: string | null;
  counselingStatus: string;
  createdAt: string;
};

type BtechRow = {
  id: string;
  referenceId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  createdAt: string;
};

export function AdminDashboard() {
  const [tab, setTab] = useState<"medical" | "btech">("medical");
  const [medical, setMedical] = useState<MedicalRow[]>([]);
  const [btech, setBtech] = useState<BtechRow[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMedical() {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/admin/applications/medical?${params}`);
      if (res.status === 401) {
        setError("Session expired. Please sign in again from /admin/login.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError(
          "Could not load applications. Check that the database is running and DATABASE_URL is set."
        );
        setLoading(false);
        return;
      }
      const data = await res.json();
      setMedical(data.applications);
      setLoading(false);
    }
    if (tab === "medical") loadMedical();
  }, [tab, statusFilter]);

  useEffect(() => {
    async function loadBtech() {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search.trim()) params.set("q", search.trim());
      const res = await fetch(`/api/admin/applications/btech?${params}`);
      if (res.status === 401) {
        setError("Session expired. Please sign in again from /admin/login.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError(
          "Could not load applications. Check that the database is running and DATABASE_URL is set."
        );
        setLoading(false);
        return;
      }
      const data = await res.json();
      setBtech(data.applications);
      setLoading(false);
    }
    if (tab === "btech") loadBtech();
  }, [tab, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setTab("medical")}
          className={`rounded-md px-3 py-2 text-sm font-semibold ${
            tab === "medical" ? "bg-teal-700 text-white" : "bg-white border border-zinc-300"
          }`}
        >
          Medical
        </button>
        <button
          type="button"
          onClick={() => setTab("btech")}
          className={`rounded-md px-3 py-2 text-sm font-semibold ${
            tab === "btech" ? "bg-teal-700 text-white" : "bg-white border border-zinc-300"
          }`}
        >
          B.Tech AI/ML
        </button>
        <div className="ml-auto flex flex-wrap gap-2">
          {tab === "medical" ? (
            <a href="/api/admin/export/medical">
              <Button variant="secondary" type="button">
                Export CSV
              </Button>
            </a>
          ) : (
            <a href="/api/admin/export/btech">
              <Button variant="secondary" type="button">
                Export CSV
              </Button>
            </a>
          )}
        </div>
      </div>

      {tab === "medical" ? (
        <div className="flex flex-wrap gap-3">
          <label className="text-sm text-zinc-700">
            Payment status{" "}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ml-2 rounded-md border border-zinc-300 px-2 py-1"
            >
              <option value="">All</option>
              <option value="pending_payment">Pending payment</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </label>
        </div>
      ) : (
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email, phone, name, reference…"
            className="w-full max-w-md rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {loading ? <p className="text-sm text-zinc-600">Loading…</p> : null}

      {tab === "medical" && !loading ? (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-3 py-2">Reference</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">NEET</th>
                <th className="px-3 py-2">Payment</th>
                <th className="px-3 py-2">Counseling</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {medical.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-zinc-500">
                    No medical applications yet.
                  </td>
                </tr>
              ) : (
                medical.map((row) => (
                  <tr key={row.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-xs">{row.referenceId}</td>
                    <td className="px-3 py-2">{row.fullName}</td>
                    <td className="px-3 py-2">{row.phone}</td>
                    <td className="px-3 py-2">{row.neetScore}</td>
                    <td className="px-3 py-2">{row.status}</td>
                    <td className="px-3 py-2">{row.counselingStatus}</td>
                    <td className="px-3 py-2">
                      <Link href={`/admin/medical/${row.id}`} className="text-teal-800 underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {tab === "btech" && !loading ? (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-zinc-50 text-zinc-600">
              <tr>
                <th className="px-3 py-2">Reference</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {btech.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-zinc-500">
                    No B.Tech applications yet.
                  </td>
                </tr>
              ) : (
                btech.map((row) => (
                  <tr key={row.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-xs">{row.referenceId}</td>
                    <td className="px-3 py-2">{row.fullName}</td>
                    <td className="px-3 py-2">{row.email}</td>
                    <td className="px-3 py-2">{row.phone}</td>
                    <td className="px-3 py-2">
                      {row.city}, {row.state}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
