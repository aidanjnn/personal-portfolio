import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Notes and thoughts.",
};

export default function ThoughtsPage() {
  return (
    <div>
      <h1 className="mb-7 text-[26px] font-bold tracking-[-0.01em] text-ink">
        Thoughts
      </h1>
      <p className="text-[15px] leading-[1.6] text-mute">No thoughts yet.</p>
    </div>
  );
}
