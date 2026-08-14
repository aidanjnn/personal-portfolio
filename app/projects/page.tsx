import type { Metadata } from "next";
import { ProjectIndex } from "@/components/projects/project-index";
import { listProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work.",
};

export default function ProjectsPage() {
  const projects = listProjects();

  return (
    <div>
      <h1 className="mb-7 text-[26px] font-bold tracking-[-0.01em] text-ink">
        Projects
      </h1>
      <ProjectIndex projects={projects} />
    </div>
  );
}
