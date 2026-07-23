import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-zinc-800">{siteConfig.name} Admissions</p>
          <p className="mt-2">{siteConfig.officeAddress}</p>
          <p>{siteConfig.officeHours}</p>
        </div>
        <Link
          href="/admin/login"
          className="font-medium text-teal-800 hover:text-teal-900 hover:underline"
        >
          Staff login →
        </Link>
      </div>
    </footer>
  );
}
