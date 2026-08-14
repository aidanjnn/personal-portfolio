import Link from "next/link";
import { site } from "@/content/site";
import { NavLinks } from "@/components/site/nav-links";

export function SiteHeader() {
  return (
    <header className="mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[20px]">
      <Link
        href="/"
        className="font-bold tracking-[-0.01em] text-ink no-underline"
      >
        {site.name}
      </Link>
      <nav aria-label="Primary">
        <NavLinks items={site.nav} />
      </nav>
    </header>
  );
}
