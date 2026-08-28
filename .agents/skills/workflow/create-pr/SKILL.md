---
name: create-pr
description: Open a GitHub PR with a Conventional Commits title and a structured body (Summary, Context, Changes, Notes & Risks). Use for create PR, draft PR, or PR title/body text.
allowed-tools: Bash, Read, Grep, Glob
---

# Create Pull Request

PR **title** (GitHub field, not the body): **Conventional Commits** — `type(scope): imperative summary`, <72 chars, lowercase scope, no period.

This explicit request enters the PR phase. Do not use this skill during normal implementation.

## Workflow

1. **Inspect the branch**
   - Run `git status --short --branch` to confirm the current branch and whether there are uncommitted changes.
   - **If the current branch is `main` (or `master`), do not open the PR from it.** Create a new branch off it first (`git checkout -b <type>/<short-slug>`, mirroring the change, e.g. `feat/projects-section`), move any uncommitted or just-made commits there, and open the PR from that branch.
   - Check whether the branch already tracks a remote branch. If not, push with `git push -u origin HEAD` before creating the PR.
   - Use `main` as the base branch unless the user explicitly names a different base.

2. **Verify before opening**
   - Run `npm run lint` and `npm run build`. Do not open a PR on a branch that fails either.
   - If `react-doctor` is in use, run it per the `react-doctor` skill. A missing numeric score is not a PR blocker when diagnostics are clean.

3. **Review the full PR scope**
   - Review **all commits since the branch diverged** from the base branch, not just the latest commit:
     - `git log --reverse --format=%s main..HEAD`
     - `git diff --stat main...HEAD`
     - `git diff main...HEAD`
   - Synthesize the overall change into one PR title and one concise summary.

4. **PR title** (GitHub field only; never in the markdown body): `type(scope): imperative summary`; types `feat|fix|refactor|chore|docs|test|perf|style`; describes the whole branch, not only the last commit. Pass it via `gh pr create --title`.

5. **PR body** — use this structure:

```markdown
## Summary
<1-3 sentences>

## Context
<why, background, linked issue>

## Changes
- **Theme**
  - ...
- **Theme**
  - ...

## Notes & Risks
- ...
```

6. **Editing discipline**
   - Summary: short. Context: motivation and background. Changes: grouped bullets. Notes & Risks: rollout, visual regressions, or `- None.`
   - If the repo has a `.github/pull_request_template.md`, follow that structure instead.

7. **Omit** — checklists, test plans, `## Testing`, `- [ ]`, and empty placeholders (TBD, TODO).

8. **Create**

```bash
gh pr create --base main --title "$TITLE" --body "$(cat <<'EOF'
## Summary
...

## Context
...

## Changes
- ...

## Notes & Risks
- None.
EOF
)"
```

Use `--draft` only if asked.

## Rules

- No `gh pr create --fill`. Title = Conventional Commits; body = the sections above.
- No test plan unless the user asks. No placeholders left in the body.
- Never add agent attribution to the PR body — no "Generated with …" footer, no robot emoji, no co-author lines. The PR is the user's work.
- Link issues with `Closes #123` in **Context**, only when a real issue number exists. Never invent one.

## Example

**Title:** `feat(projects): add filterable project grid with case study pages`

**Body:**

```markdown
## Summary

Adds a filterable project grid to the home page and a dedicated case study route for each project.

## Context

Closes #14

The single flat list did not scale past six projects and gave no room for detail.

## Changes
- **Home** — Project grid with tag filtering and keyboard-navigable filter chips
- **Routes** — New `/projects/[slug]` case study page with static params
- **Content** — Project metadata moved into a typed module

## Notes & Risks
- Old `/work#project-name` anchors now redirect; check external links.
```
