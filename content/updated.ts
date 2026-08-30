import { execFileSync } from "node:child_process";

const REPO =
  process.env.GITHUB_REPOSITORY ?? "aidanjnn/personal-portfolio";
const BRANCH = "main";

function ordinal(day: number): string {
  const mod100 = day % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/** Formats like "Updated Jul 15th, 2026". */
export function formatUpdatedLabel(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const;

  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `Updated ${month} ${day}${ordinal(day)}, ${year}`;
}

async function fetchMainCommitDate(): Promise<Date | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "personal-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits?sha=${BRANCH}&per_page=1`,
      {
        headers,
        // Resolve once per build / deploy; the label tracks main merges.
        cache: "force-cache",
      },
    );

    if (!res.ok) return null;

    const commits = (await res.json()) as Array<{
      commit?: { committer?: { date?: string }; author?: { date?: string } };
    }>;

    const iso =
      commits[0]?.commit?.committer?.date ?? commits[0]?.commit?.author?.date;
    return iso ? new Date(iso) : null;
  } catch {
    return null;
  }
}

function gitMainCommitDate(): Date | null {
  for (const ref of [`origin/${BRANCH}`, BRANCH] as const) {
    try {
      const iso = execFileSync("git", ["log", "-1", "--format=%cI", ref], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (iso) return new Date(iso);
    } catch {
      // try the next ref
    }
  }
  return null;
}

/** Latest site update from commits on `main` (GitHub API, else local git). */
export async function getUpdatedLabel(): Promise<string | null> {
  const date = (await fetchMainCommitDate()) ?? gitMainCommitDate();
  return date ? formatUpdatedLabel(date) : null;
}
