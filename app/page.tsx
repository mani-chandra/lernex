import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const { company, values } = siteConfig;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero — company story */}
        <section className="border-b border-teal-100 bg-gradient-to-b from-teal-50/80 to-zinc-50">
          <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
              About {siteConfig.name}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
              {company.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-700">
              {company.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#programs"
                className="inline-flex rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Our programs
              </Link>
              <Link
                href="#about"
                className="inline-flex rounded-md border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-5xl px-4 py-14 scroll-mt-20">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Who we are</h2>
              <p className="mt-4 leading-relaxed text-zinc-600">{company.mission}</p>
              <p className="mt-4 leading-relaxed text-zinc-600">{company.foundedNote}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-zinc-900">Visit us</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {siteConfig.officeAddress}
              </p>
              <p className="mt-2 text-sm text-zinc-600">{siteConfig.officeHours}</p>
              <p className="mt-4 text-sm text-zinc-500">
                Medical applicants with completed registration are counseled here on
                NEET score and category.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-zinc-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-zinc-900">How we work with you</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {values.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-5"
                >
                  <h3 className="font-semibold text-teal-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Programs / admissions CTAs */}
        <section id="programs" className="mx-auto max-w-5xl px-4 py-14 scroll-mt-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Admissions 2026
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900">
            Register for the program that fits your goal
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-600">
            Choose a track below to submit your details. Medical registration includes
            an online fee; B.Tech AI/ML registration is free.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-zinc-900">B.Tech AI/ML</h3>
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
              <h3 className="text-xl font-semibold text-zinc-900">
                Medical college admissions
              </h3>
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
