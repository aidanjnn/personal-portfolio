import Image from "next/image";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 flex items-center justify-between text-[13px] text-faint">
      <p>© {site.name} 2026</p>
      <nav aria-label="SE Webring" className="flex items-center gap-2.5">
        <a
          href={site.webring.prev}
          aria-label="Previous site"
          className="transition-colors duration-200 ease-[var(--ease)] hover:text-ink"
        >
          ←
        </a>
        <a
          href={site.webring.href}
          aria-label="SE Webring"
          className="text-ink transition-opacity duration-200 ease-[var(--ease)] hover:opacity-60"
        >
          <Image
            src="/images/se-webring.svg"
            alt=""
            width={16}
            height={16}
            unoptimized
            className="size-4"
          />
        </a>
        <a
          href={site.webring.next}
          aria-label="Next site"
          className="transition-colors duration-200 ease-[var(--ease)] hover:text-ink"
        >
          →
        </a>
      </nav>
    </footer>
  );
}
