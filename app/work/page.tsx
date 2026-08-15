import type { Metadata } from "next";
import Image from "next/image";
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
      <ul className="space-y-6 text-[15px] leading-snug">
        {entries.map((entry) => (
          <li
            key={`${entry.year}-${entry.company}`}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-5 sm:grid-cols-[3.25rem_14.5rem_minmax(0,1fr)] sm:gap-x-4"
          >
            <span className="col-start-1 row-start-1 text-date tabular-nums">
              {entry.year}
            </span>
            <a
              href={entry.url}
              target="_blank"
              rel="noreferrer"
              className="col-start-2 row-start-1 text-ink transition-colors duration-200 ease-[var(--ease)] hover:text-faint"
            >
              <Image
                src={entry.logo}
                alt=""
                width={18}
                height={18}
                unoptimized
                className="mr-2.5 inline-block size-[18px] rounded-[4px] object-contain align-[-4px]"
              />
              {entry.company}
            </a>
            <span className="col-start-2 row-start-2 text-faint sm:col-start-3 sm:row-start-1">
              {entry.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
