import type { MetadataRoute } from "next";
import { listProjects, projectPageHref } from "@/content/projects";
import { absoluteUrl } from "@/content/site";
import { listThoughts, thoughtHref } from "@/content/thoughts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/work", "/projects", "/thoughts", "/about"];

  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    // The sitemap lists only this site's pages, so a Project's external url is not used here.
    ...listProjects().map((project) => ({
      url: absoluteUrl(projectPageHref(project)),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...listThoughts().map((thought) => ({
      url: absoluteUrl(thoughtHref(thought)),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
