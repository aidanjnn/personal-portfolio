import type { Metadata } from "next";
import { ThoughtIndex } from "@/components/thoughts/thought-index";
import { listThoughts } from "@/content/thoughts";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Notes and thoughts.",
};

export default function ThoughtsPage() {
  const thoughts = listThoughts();

  return (
    <div>
      <h1 className="mb-10 text-[26px] font-bold tracking-[-0.01em] text-ink">
        Thoughts
      </h1>
      <ThoughtIndex thoughts={thoughts} />
    </div>
  );
}
