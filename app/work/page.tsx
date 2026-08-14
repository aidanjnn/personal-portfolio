import type { Metadata } from "next";
import { listWork } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected experience.",
};

export default function WorkPage() {
  const entries = listWork();

  return (
    <div>
      <h1 className="mb-10 text-[26px] font-bold tracking-[-0.01em] text-ink">
        Work
      </h1>
      <ul className="grid grid-cols-[2.75rem_minmax(0,1fr)_minmax(0,1fr)] gap-x-5 gap-y-5 text-[15px] leading-snug sm:grid-cols-[3.25rem_minmax(11.5rem,1fr)_minmax(9rem,1.15fr)] sm:gap-x-12">
        {entries.map((entry) => (
          <li
            key={`${entry.year}-${entry.company}`}
            className="col-span-3 grid grid-cols-subgrid items-baseline"
          >
            <span className="text-date">{entry.year}</span>
            <a
              href={entry.url}
              target="_blank"
              rel="noreferrer"
              className="text-ink transition-colors duration-200 ease-[var(--ease)] hover:text-faint"
            >
              {entry.company}
            </a>
            <span className="text-faint">{entry.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
