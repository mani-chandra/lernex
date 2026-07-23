import Link from "next/link";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
      <p className="text-center text-sm font-medium uppercase tracking-wide text-teal-800">
        Staff only
      </p>
      <h1 className="mt-2 text-center text-2xl font-bold text-zinc-900">
        Admissions dashboard
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-600">
        Sign in to view registrations, payments, and counseling status.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-center text-sm">Loading…</p>}>
          <AdminLoginForm />
        </Suspense>
      </div>
      <p className="mt-6 text-center text-sm text-zinc-500">
        <Link href="/" className="text-teal-800 hover:underline">
          ← Back to public site
        </Link>
      </p>
      {process.env.NODE_ENV === "development" ? (
        <aside className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
          <p className="font-semibold">Local setup</p>
          <p className="mt-1">
            Set <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> (PostgreSQL, e.g.{" "}
            <a href="https://neon.tech" className="underline">
              Neon
            </a>
            ), then run{" "}
            <code className="rounded bg-amber-100 px-1">npm run db:migrate</code> and{" "}
            <code className="rounded bg-amber-100 px-1">npm run db:seed</code>.
          </p>
          <p className="mt-2">
            Default admin: <strong>admin@lernex.local</strong> / <strong>changeme123</strong>
          </p>
        </aside>
      ) : null}
    </main>
  );
}
