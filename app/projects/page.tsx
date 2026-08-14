import type { Metadata } from "next";
import Link from "next/link";
import { listProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work.",
};

export default function ProjectsPage() {
  const projects = listProjects();

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-foreground/70">No projects yet.</p>
      ) : (
        <ul className="flex flex-col gap-10">
          {projects.map((project) => (
            <li key={project.slug} className="flex flex-col gap-1">
              <Link
                href={`/projects/${project.slug}`}
                className="font-medium hover:underline"
              >
                {project.title}
              </Link>
              <p className="text-foreground/70">{project.summary}</p>
              <p className="text-sm text-foreground/50">
                {project.year}
                {project.tags.length > 0 ? ` · ${project.tags.join(", ")}` : null}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
