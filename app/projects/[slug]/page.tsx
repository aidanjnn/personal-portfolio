import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, listProjects } from "@/content/projects";

export function generateStaticParams() {
  return listProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Not found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm text-foreground/50">
          {project.year}
          {project.role ? ` · ${project.role}` : null}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-md text-lg leading-8 text-foreground/70">
          {project.summary}
        </p>
      </header>
      {project.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2 text-sm text-foreground/60">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      {project.url ? (
        <p>
          <a
            href={project.url}
            className="font-medium hover:underline"
            rel="noreferrer"
          >
            Visit project
          </a>
        </p>
      ) : null}
    </article>
  );
}
