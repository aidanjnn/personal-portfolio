import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectIndex({
  projects,
}: {
  projects: readonly Project[];
}) {
  if (projects.length === 0) {
    return <p className="text-[15px] leading-[1.6] text-mute">No projects yet.</p>;
  }

  return (
    <ul className="border-t border-rule">
      {projects.map((project) => (
        <li key={project.slug} className="border-b border-rule">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-baseline py-[9px] text-[13.5px]"
          >
            <span className="w-[80px] shrink-0 text-[12px] text-date">
              {project.year}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1 leading-snug">
              <span className="font-medium text-ink underline decoration-decoration underline-offset-2">
                {project.title}
              </span>
              <span className="text-mute">{project.summary}</span>
              {project.tags.length > 0 ? (
                <span className="text-[12px] text-date">
                  {project.tags.join(" · ")}
                </span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
