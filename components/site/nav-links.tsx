"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/site";

export function NavLinks({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "text-ink no-underline"
                  : "text-faint no-underline transition-colors duration-200 ease-[var(--ease)] hover:text-mute"
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
