export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  tags: readonly string[];
  url?: string;
  role?: string;
};

const projects: readonly Project[] = [
  {
    slug: "example-project",
    title: "Example project",
    summary:
      "A placeholder so the project route and content module have a real shape to work against.",
    year: 2026,
    tags: ["Next.js"],
    role: "Author",
  },
];

export function listProjects(): readonly Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
