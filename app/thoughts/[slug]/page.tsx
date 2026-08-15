import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThoughtArticle } from "@/components/thoughts/thought-article";
import { getThought, listThoughts } from "@/content/thoughts";

export function generateStaticParams() {
  return listThoughts().map((thought) => ({ slug: thought.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/thoughts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const thought = getThought(slug);

  if (!thought) {
    return { title: "Not found" };
  }

  return {
    title: thought.title,
    description: thought.subtitle,
  };
}

export default async function ThoughtPage({
  params,
}: PageProps<"/thoughts/[slug]">) {
  const { slug } = await params;
  const thought = getThought(slug);

  if (!thought) {
    notFound();
  }

  return <ThoughtArticle thought={thought} />;
}
