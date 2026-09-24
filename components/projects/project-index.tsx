import Link from "next/link";
import { projectHref, type Project } from "@/content/projects";

export function ProjectIndex({
  projects,
}: {
  projects: readonly Project[];
}) {
  if (projects.length === 0) {
    return <p className="text-[15px] leading-[1.6] text-mute">No projects yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-8">
      {projects.map((project) => {
        const href = projectHref(project);
        const titleClassName =
          "font-semibold text-ink transition-colors duration-200 ease-[var(--ease)] hover:text-faint";

        return (
          <li
            key={project.slug}
            className="grid grid-cols-[3.25rem_minmax(0,1fr)] items-baseline gap-x-5"
          >
            <span className="text-[15px] text-date tabular-nums">
              {project.year}
            </span>
            <div>
              {href.startsWith("/") ? (
                <Link href={href} className={titleClassName}>
                  {project.title}
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={titleClassName}
                >
                  {project.title}
                </a>
              )}
              {project.event ? (
                <span className="font-normal text-faint">
                  {" "}({project.event})
                </span>
              ) : null}
              <p className="mt-1 text-[15px] leading-[1.6] text-faint">
                {project.summary}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
