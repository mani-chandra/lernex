import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-teal-800">
          {siteConfig.name}
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-zinc-700">
          <Link href="/admissions/btech-ai-ml" className="hover:text-teal-700">
            B.Tech AI/ML
          </Link>
          <Link href="/admissions/medical" className="hover:text-teal-700">
            Medical
          </Link>
        </nav>
      </div>
    </header>
  );
}
