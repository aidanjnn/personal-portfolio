import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.bio,
};

export default function AboutPage() {
  return (
    <article className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="max-w-md text-lg leading-8 text-foreground/70">{site.bio}</p>
    </article>
  );
}
