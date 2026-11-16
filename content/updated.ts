import { execFileSync } from "node:child_process";

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

/** The deploy commit's committer date; empty when git or the repository is unavailable. */
function headCommitIso(): string {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

/**
 * The site's last update, from the commit being built. Reading the checkout
 * rather than the GitHub API keeps the label tied to the deploy, with no cache
 * to carry an old date across builds. Pass an ISO date to format a known commit.
 */
export function getUpdatedLabel(commitIso: string = headCommitIso()): string | null {
  const date = new Date(commitIso);
  return commitIso && !Number.isNaN(date.getTime()) ? formatUpdatedLabel(date) : null;
}
