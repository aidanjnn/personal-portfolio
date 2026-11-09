import { listProjects } from "@/content/projects";
import { site } from "@/content/site";
import { listWork } from "@/content/work";

export const dynamic = "force-static";

function absolute(href: string): string {
  return href.startsWith("/") ? `${site.url}${href}` : href;
}

function llmsTxt(): string {
  const email = site.social.email.href.replace(/^mailto:/, "");
  const work = listWork().map(
    (entry) =>
      `- **${entry.company}**, ${entry.role} (${entry.year}): ${entry.description} ${entry.url}`,
  );
  const projects = listProjects().map((project) => {
    const event = project.event ? ` (${project.event})` : "";
    const href = absolute(project.url ?? `/projects/${project.slug}`);
    return `- **${project.title}**${event}, ${project.year}: ${project.summary} ${href}`;
  });

  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.bio} Expected graduation: ${site.graduation}.`,
    "",
    "## Looking for",
    "",
    `- ${site.seeking.summary}`,
    `- Terms: ${site.seeking.terms.join(", ")}`,
    `- Areas: ${site.seeking.roles.join(", ")}`,
    `- Locations: ${site.seeking.locations.join(", ")}`,
    "",
    "## Experience",
    "",
    ...work,
    "",
    "## Projects",
    "",
    ...projects,
    "",
    "## Focus",
    "",
    site.knowsAbout.join(", "),
    "",
    "## Contact",
    "",
    `- Email: ${email}`,
    `- LinkedIn: ${site.social.linkedin.href}`,
    `- GitHub: ${site.social.github.href}`,
    `- X: ${site.social.x.href}`,
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/)`,
    `- [Work](${site.url}/work)`,
    `- [Projects](${site.url}/projects)`,
    `- [Thoughts](${site.url}/thoughts)`,
    `- [About](${site.url}/about)`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
