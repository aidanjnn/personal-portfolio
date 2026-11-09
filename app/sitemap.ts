import type { MetadataRoute } from "next";
import { listProjects } from "@/content/projects";
import { site } from "@/content/site";
import { listThoughts } from "@/content/thoughts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/projects", "/thoughts", "/about"];

  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...listProjects().map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...listThoughts().map((thought) => ({
      url: `${site.url}/thoughts/${thought.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
