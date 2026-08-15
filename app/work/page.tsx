import type { Metadata } from "next";
import { WorkRow } from "@/components/work/work-entry";
import { listWork, workKey } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected experience.",
};

export default function WorkPage() {
  return (
    <div>
      <h1 className="mb-10 text-[26px] font-bold tracking-[-0.01em] text-ink">
        Work
      </h1>
      <ul className="grid grid-cols-[2.75rem_max-content_minmax(0,1fr)] gap-x-5 gap-y-6 text-[15px] leading-snug sm:grid-cols-[3.25rem_max-content_minmax(0,1fr)] sm:gap-x-8">
        {listWork().map((work) => (
          <WorkRow key={workKey(work)} work={work} />
        ))}
      </ul>
    </div>
  );
}
