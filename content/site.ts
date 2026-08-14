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
  description: string;
  tagline: string;
  bio: string;
  updatedLabel: string;
  nav: readonly NavItem[];
  social: readonly SocialLink[];
  links: {
    softwareEngineering: string;
    copperlane: string;
  };
};

export const site: Site = {
  name: "Aidan Jeon",
  title: "Aidan Jeon",
  description:
    "Software Engineering student at the University of Waterloo, building agents for regulated finance at Copperlane.",
  tagline:
    "Software Engineering student at the University of Waterloo, focused on agent infrastructure and dabbling into physical AI.",
  bio: "I'm a Software Engineering student at the University of Waterloo, focused on agent infrastructure and dabbling into physical AI. Currently building agents for regulated finance at Copperlane (YC W26).",
  updatedLabel: "Updated Jul 15th, 2026",
  nav: [
    { href: "/work", label: "Work" },
    { href: "/projects", label: "Projects" },
    { href: "/thoughts", label: "Thoughts" },
  ],
  social: [
    { href: "https://x.com/aidanjnn", label: "X" },
    { href: "https://linkedin.com/in/aidanjeon", label: "LinkedIn" },
    { href: "https://github.com/aidanjnn", label: "GitHub" },
    { href: "mailto:aidanjeon00@gmail.com", label: "email" },
  ],
  links: {
    softwareEngineering: "https://uwaterloo.ca/engineering/",
    copperlane: "https://www.copperlane.ai/",
  },
};
