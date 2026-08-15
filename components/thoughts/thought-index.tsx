import Link from "next/link";
import type { Thought } from "@/content/thoughts";

export function ThoughtIndex({
  thoughts,
}: {
  thoughts: readonly Thought[];
}) {
  if (thoughts.length === 0) {
    return <p className="text-[15px] leading-[1.6] text-mute">No thoughts yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-8">
      {thoughts.map((thought) => (
        <li
          key={thought.slug}
          className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-x-5"
        >
          <span className="text-[15px] text-date tabular-nums">
            {thought.year}
          </span>
          <div>
            <Link
              href={`/thoughts/${thought.slug}`}
              className="font-semibold text-ink transition-colors duration-200 ease-[var(--ease)] hover:text-faint"
            >
              {thought.title}
            </Link>
            <p className="mt-1 text-[15px] leading-[1.6] text-faint">
              {thought.subtitle}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
