export type WorkEntry = {
  year: number;
  company: string;
  role: string;
  url: string;
};

const work: readonly WorkEntry[] = [
  {
    year: 2026,
    company: "Copperlane (YC W26)",
    role: "Software Engineering Intern",
    url: "https://www.copperlane.ai/",
  },
  {
    year: 2026,
    company: "UW Blueprint",
    role: "Software Engineer",
    url: "https://uwblueprint.org",
  },
  {
    year: 2025,
    company: "WATonomous",
    role: "Robotics",
    url: "https://www.watonomous.ca/",
  },
  {
    year: 2024,
    company: "Vancouver General Hospital",
    role: "Biomedical Engineering Intern",
    url: "https://www.providencehealthcare.org/en/health-care-professionals/tools-resources/lower-mainland-biomedical-engineering",
  },
  {
    year: 2024,
    company: "Strive",
    role: "Organizer",
    url: "https://strivecompetition.org",
  },
];

export function listWork(): readonly WorkEntry[] {
  return work;
}
