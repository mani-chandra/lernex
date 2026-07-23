import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function ProgramsDropdown() {
  return (
    <div className="group relative">
      <Link
        href="/#programs"
        className="inline-flex items-center gap-1 hover:text-teal-700"
      >
        Programs
        <svg
          className="h-4 w-4 text-zinc-500 transition group-hover:text-teal-700"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="min-w-[12rem] rounded-md border border-zinc-200 bg-white py-1 shadow-lg">
          <Link
            href="/admissions/btech-ai-ml"
            className="block px-4 py-2.5 text-zinc-700 hover:bg-teal-50 hover:text-teal-800"
          >
            B.Tech AI/ML
          </Link>
          <Link
            href="/admissions/medical"
            className="block px-4 py-2.5 text-zinc-700 hover:bg-teal-50 hover:text-teal-800"
          >
            Medical
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-teal-800">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-700">
          <Link href="/#about" className="hover:text-teal-700">
            About
          </Link>
          <ProgramsDropdown />
          <Link
            href="/admin/login"
            className="rounded-md border border-zinc-300 px-2.5 py-1 text-teal-800 hover:bg-teal-50"
          >
            Staff
          </Link>
        </nav>
      </div>
    </header>
  );
}
