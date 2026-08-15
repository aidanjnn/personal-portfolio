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
  description:
    "Software Engineering student at the University of Waterloo, building agents for regulated finance at Copperlane.",
  tagline:
    "Software Engineering student at the University of Waterloo, focused on agent infrastructure and dabbling into physical AI.",
  bio: "I'm a Software Engineering student at the University of Waterloo, focused on agent infrastructure and dabbling into physical AI. Currently building agents for regulated finance at Copperlane (YC W26).",
  updatedLabel: "Updated Jul 15th, 2026",
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
