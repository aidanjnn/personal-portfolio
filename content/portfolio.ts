import { intro, type IntroStyle } from "./intro";
import { listProjects, projectHref } from "./projects";
import { absoluteUrl, site } from "./site";
import { listThoughts, thoughtHref } from "./thoughts";
import { getUpdatedLabel } from "./updated";
import { listWork } from "./work";

/**
 * The public content of the Site as one JSON document (contract v2). The
 * terminal portfolio reads it from `/portfolio.json`, so every link is a full
 * URL and absent values are `null`. The terminal's Rust loader is the authority
 * on this shape; `npm run check:portfolio` runs it, and its JSON Schema is
 * https://raw.githubusercontent.com/aidanjnn/personal-portfolio-ssh/main/content/portfolio.schema.json
 */
export type Portfolio = {
  version: 2;
  updated: string | null;
  name: string;
  web: string;
  intro: { text: string; style: IntroStyle; url: string | null }[][];
  work: {
    year: number;
    company: string;
    role: string;
    description: string;
    url: string;
  }[];
  projects: {
    slug: string;
    title: string;
    event: string | null;
    summary: string;
    year: number;
    url: string;
  }[];
  thoughts: {
    slug: string;
    title: string;
    subtitle: string;
    year: number;
    url: string;
    sections: {
      heading: string;
      items: { text: string; url: string | null }[];
    }[];
  }[];
  webring: { previous: string; home: string; next: string };
};

function optionalUrl(href: string | undefined): string | null {
  return href === undefined ? null : absoluteUrl(href);
}

export function buildPortfolio(): Portfolio {
  return {
    version: 2,
    updated: getUpdatedLabel(),
    name: site.name,
    web: site.url,
    intro: intro.map((paragraph) =>
      paragraph.map(({ text, style, url }) => ({ text, style, url: optionalUrl(url) })),
    ),
    work: listWork().map(({ year, company, role, description, url }) => ({
      year,
      company,
      role,
      description,
      url: absoluteUrl(url),
    })),
    projects: listProjects().map((project) => ({
      slug: project.slug,
      title: project.title,
      event: project.event ?? null,
      summary: project.summary,
      year: project.year,
      url: absoluteUrl(projectHref(project)),
    })),
    thoughts: listThoughts().map((thought) => ({
      slug: thought.slug,
      title: thought.title,
      subtitle: thought.subtitle,
      year: thought.year,
      url: absoluteUrl(thoughtHref(thought)),
      sections: thought.sections.map(({ heading, items }) => ({
        heading,
        items: items.map(({ text, href }) => ({ text, url: optionalUrl(href) })),
      })),
    })),
    webring: {
      previous: absoluteUrl(site.webring.prev),
      home: absoluteUrl(site.webring.href),
      next: absoluteUrl(site.webring.next),
    },
  };
}

/** The exact bytes served at `/portfolio.json` and printed by `export:portfolio`. */
export function serializePortfolio(portfolio: Portfolio): string {
  return `${JSON.stringify(portfolio, null, 2)}\n`;
}
