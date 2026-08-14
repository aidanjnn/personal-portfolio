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
      <header className="flex flex-col gap-3">
        <p className="text-[12.5px] text-date">
          {project.year}
          {project.role ? ` · ${project.role}` : null}
        </p>
        <h1 className="text-[26px] font-bold tracking-[-0.01em] text-ink">
          {project.title}
        </h1>
        <p className="text-[15px] leading-[1.6] text-pretty text-mute">
          {project.summary}
        </p>
      </header>
      {project.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[12.5px] text-date">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      {project.url ? (
        <p>
          <a
            href={project.url}
            className="font-medium text-ink underline decoration-decoration underline-offset-2 hover:decoration-faint"
            rel="noreferrer"
          >
            Visit project
          </a>
        </p>
      ) : null}
    </article>
  );
}
