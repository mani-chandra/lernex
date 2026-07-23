import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12">
        <section className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Admissions 2026
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Register online for B.Tech AI/ML (free) or medical college counseling
            support (₹{siteConfig.medicalFeeInr} registration fee + in-office NEET
            counseling).
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900">B.Tech AI/ML</h2>
            <p className="mt-2 flex-1 text-zinc-600">
              Free registration. Share your academic details and our team will follow
              up about AI/ML engineering admissions.
            </p>
            <p className="mt-4 text-sm font-medium text-teal-800">Fee: Free</p>
            <Link
              href="/admissions/btech-ai-ml"
              className="mt-6 inline-flex rounded-md bg-teal-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-teal-800"
            >
              Register for B.Tech AI/ML
            </Link>
          </article>

          <article className="flex flex-col rounded-2xl border border-teal-200 bg-teal-50/40 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900">
              Medical college admissions
            </h2>
            <p className="mt-2 flex-1 text-zinc-600">
              Submit NEET details and pay the registration fee online. Visit our office
              for personalized counseling based on your NEET score.
            </p>
            <p className="mt-4 text-sm font-medium text-teal-900">
              Fee: ₹{siteConfig.medicalFeeInr} (online)
            </p>
            <Link
              href="/admissions/medical"
              className="mt-6 inline-flex rounded-md bg-teal-800 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-teal-900"
            >
              Medical registration
            </Link>
          </article>
        </section>

        <section className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-700">
          <h3 className="font-semibold text-zinc-900">Office counseling (medical)</h3>
          <p className="mt-2">{siteConfig.officeAddress}</p>
          <p>{siteConfig.officeHours}</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
