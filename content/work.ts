export type Work = {
  year: number;
  company: string;
  role: string;
  description: string;
  logo: string;
  url: string;
};

const work: readonly Work[] = [
  {
    year: 2026,
    company: "Copperlane (YC W26)",
    logo: "/images/logos/copperlane.png",
    role: "Software Engineering Intern",
    description:
      "Building agent harnesses + internal tools for regulated finance",
    url: "https://www.copperlane.ai/",
  },
  {
    year: 2026,
    company: "UW Blueprint",
    logo: "/images/logos/uw-blueprint.png",
    role: "Software Engineer",
    description: "Home Again Furniture Bank: Building software for NPOs",
    url: "https://uwblueprint.org",
  },
  {
    year: 2025,
    company: "WATonomous",
    logo: "/images/logos/watonomous.png",
    role: "Robotics",
    description: "Working on autonomous driving software",
    url: "https://www.watonomous.ca/",
  },
  {
    year: 2024,
    company: "Vancouver General Hospital",
    logo: "/images/logos/vancouver-general-hospital.png",
    role: "Biomedical Engineering Intern",
    description:
      "Biomedical engineering intern @ BC's largest hospital, worked on medical device hardware, technical reports",
    url: "https://www.providencehealthcare.org/en/health-care-professionals/tools-resources/lower-mainland-biomedical-engineering",
  },
  {
    year: 2024,
    company: "Strive",
    logo: "/images/logos/strive.png",
    role: "Organizer",
    description:
      "Helped lead western Canada's largest tech-business comp hosting [AI start-ups, Microsoft/EA PMs, EY product design, etc.]",
    url: "https://strivecompetition.org",
  },
];

export function listWork(): readonly Work[] {
  return work;
}

export function currentWork(): Work {
  return work[0];
}

export function workKey(work: Work): string {
  return `${work.year}-${work.company}`;
}
