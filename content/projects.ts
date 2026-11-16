export type Project = {
  slug: string;
  title: string;
  event?: string;
  summary: string;
  year: number;
  url?: string;
};

const projects: readonly Project[] = [
  {
    slug: "teachar",
    title: "teachAR",
    event: "Hack the North",
    summary:
      "AR tutor for learning physical skills through recorded ghost hands & an AI coach",
    year: 2026,
    url: "https://github.com/aidanjnn/teachAR",
  },
  {
    slug: "otto",
    title: "Otto",
    summary:
      "Voice agent automating GitHub, Gmail, & G-Cal via natural speech. Won 1st place at NexHacks at CMU (1500+ hackers) (Best use of LiveKit — $1000 + internship).",
    year: 2026,
    url: "https://github.com/abrj7/otto",
  },
  {
    slug: "toothfairy",
    title: "Toothfairy",
    summary: "Cursor for dentists, streamlining dental workflows",
    year: 2026,
    url: "https://github.com/7kzaincode/toothfairy",
  },
  {
    slug: "sketchy",
    title: "Sketchy",
    summary: "Draw wireframes & deploy to Vercel in <60 seconds",
    year: 2026,
    url: "https://github.com/aidanjnn/sketchy",
  },
];

export function listProjects(): readonly Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The Project's own page, which every Project has. */
export function projectPageHref(project: Project): string {
  return `/projects/${project.slug}`;
}

/** Where lists send a visitor: the external url when there is one, else the page. */
export function projectHref(project: Project): string {
  return project.url ?? projectPageHref(project);
}
