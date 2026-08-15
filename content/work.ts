export type WorkEntry = {
  year: number;
  company: string;
  role: string;
  logo: string;
  url: string;
};

const work: readonly WorkEntry[] = [
  {
    year: 2026,
    company: "Copperlane (YC W26)",
    logo: "/images/logos/copperlane.png",
    role: "Software Engineering Intern",
    url: "https://www.copperlane.ai/",
  },
  {
    year: 2026,
    company: "UW Blueprint",
    logo: "/images/logos/uw-blueprint.png",
    role: "Software Engineer",
    url: "https://uwblueprint.org",
  },
  {
    year: 2025,
    company: "WATonomous",
    logo: "/images/logos/watonomous.png",
    role: "Robotics",
    url: "https://www.watonomous.ca/",
  },
  {
    year: 2024,
    company: "Vancouver General Hospital",
    logo: "/images/logos/vancouver-general-hospital.png",
    role: "Biomedical Engineering Intern",
    url: "https://www.providencehealthcare.org/en/health-care-professionals/tools-resources/lower-mainland-biomedical-engineering",
  },
  {
    year: 2024,
    company: "Strive",
    logo: "/images/logos/strive.png",
    role: "Organizer",
    url: "https://strivecompetition.org",
  },
];

export function listWork(): readonly WorkEntry[] {
  return work;
}
