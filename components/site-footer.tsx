import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-zinc-600">
        <p className="font-medium text-zinc-800">{siteConfig.name} Admissions</p>
        <p className="mt-2">{siteConfig.officeAddress}</p>
        <p>{siteConfig.officeHours}</p>
      </div>
    </footer>
  );
}
