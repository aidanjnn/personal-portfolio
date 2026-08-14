import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-6 text-sm text-foreground/60">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        {site.social.length > 0 ? (
          <ul className="flex gap-5">
            {site.social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
