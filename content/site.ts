export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  label: string;
};

export type Site = {
  name: string;
  title: string;
  url: string;
  description: string;
  tagline: string;
  bio: string;
  /** What Aidan is open to next; surfaced on home, JSON-LD, and llms.txt. */
  seeking: {
    summary: string;
    terms: readonly string[];
    roles: readonly string[];
    locations: readonly string[];
  };
  graduation: string;
  knowsAbout: readonly string[];
  softwareEngineering: string;
  nav: readonly NavItem[];
  social: {
    x: SocialLink;
    linkedin: SocialLink;
    github: SocialLink;
    email: SocialLink;
  };
  webring: {
    href: string;
    prev: string;
    next: string;
  };
};

export const site: Site = {
  name: "Aidan Jeon",
  title: "Aidan Jeon",
  url: "https://www.aidanjeon.com",
  description:
    "Software Engineering student at the University of Waterloo. Previously SWE intern at Copperlane (YC W26). Looking for Winter 2027 and Summer 2027 internships.",
  tagline:
    "Software Engineering student at the University of Waterloo, focused on agent infrastructure and dabbling into physical AI.",
  bio: "I'm a Software Engineering student at the University of Waterloo, focused on agent infrastructure and dabbling into physical AI. Most recently built agents and eval infrastructure for regulated finance as a software engineering intern at Copperlane (YC W26) in SF. Open to Winter 2027 and Summer 2027 software engineering internships.",
  seeking: {
    summary:
      "Winter 2027 and Summer 2027 software engineering internships at startups, working on AI agents, platform, or eval infrastructure. SF, NYC, or remote.",
    terms: ["Winter 2027 (Jan to Apr)", "Summer 2027"],
    roles: [
      "Software engineering intern",
      "AI agents",
      "Platform / infrastructure",
      "Evals / eval infrastructure",
    ],
    locations: ["San Francisco", "New York City", "Remote"],
  },
  graduation: "April 2029",
  knowsAbout: [
    "AI agents",
    "Agent infrastructure",
    "LLM evaluation harnesses",
    "Voice agents",
    "Augmented reality",
    "Physical AI",
    "Autonomous driving",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "Software engineering",
  ],
  softwareEngineering: "https://uwaterloo.ca/engineering/",
  nav: [
    { href: "/work", label: "996" },
    { href: "/projects", label: "Projects" },
    { href: "/thoughts", label: "Thoughts" },
  ],
  social: {
    x: { href: "https://x.com/aidanjnn", label: "X" },
    linkedin: { href: "https://linkedin.com/in/aidanjeon", label: "LinkedIn" },
    github: { href: "https://github.com/aidanjnn", label: "GitHub" },
    email: { href: "mailto:aidanjeon00@gmail.com", label: "email" },
  },
  webring: {
    href: "https://se-webring.xyz/",
    prev: "https://dwseoh.com",
    next: "https://www.simranthind.me/",
  },
};
