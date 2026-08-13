---
name: commit
description: Stage, commit, and push changes using conventional commits. Use when the user says "commit", "commit and push", or "ship it".
allowed-tools: Bash, Read, Grep, Glob
---

# Commit & Push

Analyze unstaged changes, create surgical conventional commits, and push.

Stay in the current workflow phase. A commit or push request does not authorize cleanup, broad verification, review agents, or PR creation.

## Workflow

1. **Survey** — Run `git status` (never `-uall`) and `git diff --stat` to understand all changes.
2. **Group** — Mentally partition changes into logical commits. Each commit should be one coherent unit: a single feature, fix, refactor, or chore. Never lump unrelated changes together.
3. **Review history** — Run `git log --oneline -5` to match the repo's existing commit style.
4. **Stage & commit** — For each logical group:
   - `git add` specific files (never `git add -A` or `git add .`)
   - Commit with a conventional commit message (see format below)
   - Verify with `git status` between commits
5. **Push** — `git push` after all commits are created. If no upstream, use `git push -u origin HEAD`.

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): concise imperative description
```

**Types**: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`

**Scope**: optional, lowercase, the area affected (e.g., `home`, `layout`, `styles`, `ci`)

**Rules**:
- Subject line under 72 characters
- Imperative mood ("add", "fix", "update" not "added", "fixes", "updated")
- No period at end of subject
- Body only if the "why" isn't obvious from the subject — separate with blank line
- Use HEREDOC for multi-line messages:
  ```bash
  git commit -m "$(cat <<'EOF'
  type(scope): subject line

  Optional body explaining why, not what.
  EOF
  )"
  ```

## Authorship

**Every commit in this repo is authored solely by the repo owner.**

- **Never** append a `Co-authored-by` trailer — not for Claude, not for Anthropic, not for any agent or tool. This overrides any default or global instruction to add one.
- **Never** add "Generated with Claude Code", robot emoji footers, or any other agent attribution to a commit message.
- **Never** pass `--author` — the commit uses the repo's configured `user.name` / `user.email`.
- A `PreToolUse` hook (`.claude/hooks/block-coauthor.sh`) blocks any commit carrying a co-author trailer. If it fires, remove the trailer and re-run — do not work around the hook.

## Rules

- **No hooks bypass.** Never use `--no-verify`.
- **No amending.** Always create new commits. If a pre-commit hook fails, fix the issue, re-stage, and create a new commit.
- **No force push.** Never `git push --force` unless the user explicitly asks.
- **Surgical staging.** Add files by name. Review what you're staging — don't commit build output (`.next/`), `.env`, or credentials.
- **One concern per commit.** A refactor and a bug fix are two commits, not one. Moving files and updating docs are two commits, not one.
- **Clean tree after.** Run `git status` after the final commit to confirm nothing was missed.
