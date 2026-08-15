"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { Work } from "@/content/work";

export function WorkRow({ work }: { work: Work }) {
  const [open, setOpen] = useState(false);
  const descriptionId = useId();

  return (
    <li className="col-span-3 grid grid-cols-subgrid items-baseline">
      <span className="text-date tabular-nums">{work.year}</span>
      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
        <a
          href={work.url}
          target="_blank"
          rel="noreferrer"
          className="text-ink transition-colors duration-200 ease-[var(--ease)] hover:text-faint"
        >
          <Image
            src={work.logo}
            alt=""
            width={18}
            height={18}
            unoptimized
            className="mr-2.5 inline-block size-[18px] rounded-[4px] object-contain align-[-4px]"
          />
          {work.company}
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={descriptionId}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex cursor-pointer text-faint transition-colors duration-200 ease-[var(--ease)] hover:text-ink"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            data-open={open}
            className="size-3 origin-center transition-transform duration-200 ease-[var(--ease)] data-[open=true]:rotate-180 motion-reduce:transition-none"
          >
            <path
              d="M2.5 4.25 6 7.75l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">More about {work.company}</span>
        </button>
      </div>
      <span className="whitespace-nowrap text-faint">{work.role}</span>
      <p
        id={descriptionId}
        hidden={!open}
        className="col-start-2 col-end-4 mt-1.5 min-w-0 text-faint"
      >
        {work.description}
      </p>
    </li>
  );
}
