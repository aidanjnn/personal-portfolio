import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-medium tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex gap-5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
