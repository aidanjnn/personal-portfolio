import { intro, type IntroStyle } from "./home";
import { listProjects, projectHref } from "./projects";
import { site } from "./site";
import { listThoughts, thoughtHref } from "./thoughts";
import { getUpdatedLabel } from "./updated";
import { listWork } from "./work";

/**
 * The public content of the Site as one JSON document (contract v2, see
 * `public/portfolio.schema.json`). The terminal portfolio reads it from
 * `/portfolio.json`, so every link is a full URL and absent values are `null`.
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

function fullUrl(href: string): string {
  return href.startsWith("/") ? `${site.url}${href}` : href;
}

export async function buildPortfolio(): Promise<Portfolio> {
  return {
    version: 2,
    updated: await getUpdatedLabel(),
    name: site.name,
    web: site.url,
    intro: intro.map((paragraph) =>
      paragraph.map(({ text, style, url }) => ({ text, style, url: url ?? null })),
    ),
    work: listWork().map(({ year, company, role, description, url }) => ({
      year,
      company,
      role,
      description,
      url,
    })),
    projects: listProjects().map((project) => ({
      slug: project.slug,
      title: project.title,
      event: project.event ?? null,
      summary: project.summary,
      year: project.year,
      url: fullUrl(projectHref(project)),
    })),
    thoughts: listThoughts().map((thought) => ({
      slug: thought.slug,
      title: thought.title,
      subtitle: thought.subtitle,
      year: thought.year,
      url: fullUrl(thoughtHref(thought)),
      sections: thought.sections.map(({ heading, items }) => ({
        heading,
        items: items.map(({ text, href }) => ({ text, url: href ?? null })),
      })),
    })),
    webring: {
      previous: site.webring.prev,
      home: site.webring.href,
      next: site.webring.next,
    },
  };
}

/** The exact bytes served at `/portfolio.json` and printed by `export:portfolio`. */
export function serializePortfolio(portfolio: Portfolio): string {
  return `${JSON.stringify(portfolio, null, 2)}\n`;
}
