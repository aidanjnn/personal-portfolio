import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.bio,
};

export default function AboutPage() {
  return (
    <article>
      <h1 className="mb-7 text-[26px] font-bold tracking-[-0.01em] text-ink">
        About
      </h1>
      <p className="text-[15px] leading-[1.6] text-pretty text-mute">{site.bio}</p>
    </article>
  );
}
