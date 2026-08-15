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
    slug: "otto",
    title: "Otto",
    summary:
      "Voice agent automating GitHub, Gmail, & G-Cal via natural speech. Won 1st place at NexHacks at CMU (1500+ hackers) (Best use of LiveKit — $1000 + internship).",
    year: 2026,
    tags: [],
    url: "https://github.com/abrj7/otto",
  },
  {
    slug: "toothfairy",
    title: "Toothfairy",
    summary: "Cursor for dentists, streamlining dental workflows",
    year: 2026,
    tags: [],
    url: "https://github.com/7kzaincode/toothfairy",
  },
  {
    slug: "sketchy",
    title: "Sketchy",
    summary: "Draw wireframes & deploy to Vercel in <60 seconds",
    year: 2026,
    tags: [],
    url: "https://github.com/aidanjnn/sketchy",
  },
];

export function listProjects(): readonly Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
