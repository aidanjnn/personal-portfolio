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
  nav: readonly NavItem[];
  social: readonly SocialLink[];
};

export const site: Site = {
  name: "Aidan Jeon",
  title: "Aidan Jeon",
  description: "Personal portfolio of Aidan Jeon.",
  tagline: "Software engineer.",
  bio: "Bio coming soon.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
  ],
  social: [],
};
