import Link from "next/link";
import { listProjects } from "@/content/projects";
import { site } from "@/content/site";

export default function HomePage() {
  const projects = listProjects();

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
        <p className="max-w-md text-lg leading-8 text-foreground/70">
          {site.tagline}
        </p>
      </section>

      {projects.length > 0 ? (
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/50">
            Projects
          </h2>
          <ul className="flex flex-col gap-8">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col gap-1"
                >
                  <span className="font-medium group-hover:underline">
                    {project.title}
                  </span>
                  <span className="text-foreground/70">{project.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
