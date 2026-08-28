---
name: react-doctor
description: Use when finishing a feature, fixing a bug, before committing React code, or when the user types `/doctor`, asks to scan, triage, or clean up React diagnostics. Covers lint, accessibility, bundle size, architecture. Includes a regression check and a full local-triage workflow that fetches the canonical playbook.
version: "1.2.0"
---

# React Doctor

Scans React codebases for security, performance, correctness, and architecture issues.

Lint findings are local. The 0–100 health score is not — after the scan, the CLI POSTs diagnostics to `https://www.react.doctor/api/score`. If that request fails, times out, or is blocked, the scan still prints findings and says `Score unavailable (could not reach the score API)`.

## After making React code changes:

```bash
npx react-doctor@latest --verbose --scope changed --base main
```

Request unrestricted network for that command. The score API is not on the default sandbox allowlist, and the first request is often the one that fails.

Gate on **diagnostics**, not the number:

- If the score is present and dropped, fix the regressions before committing.
- If the score is unavailable and the scan found no issues, continue. Do not rerun just to get a number.
- Use `--no-score` when you only need diagnostics (offline, or the API is flaky).

## For general cleanup or code improvement:

Run `npx react-doctor@latest --verbose` (the default `--scope full`) to scan the full codebase. Fix issues by severity — errors first, then warnings. Same score-API rules as above.

## For a focused UI design audit:

Run `npx react-doctor@latest design --verbose`. This selects only design-tagged UI composition, typography, interaction, accessibility, and motion rules, including focused rules that remain opt-in during a general health scan.

## /doctor — full local triage workflow

When the user types `/doctor`, says "run react doctor", or asks for a full triage / cleanup pass (not just a regression check), fetch the canonical local-triage playbook and follow every step in it:

```bash
curl --fail --silent --show-error \
  --header 'Cache-Control: no-cache' \
  https://www.react.doctor/prompts/react-doctor-agent.md
```

The playbook is the single source of truth — a scan → filter → triage → fix → validate loop that edits the working tree directly (never commits, never opens PRs). Updating the prompt at its source updates every agent on its next fetch — no skill reinstall needed.

Pair it with the matching per-rule prompts at `https://www.react.doctor/prompts/rules/<plugin>/<rule>.md` (fetched on demand inside the playbook) so each fix uses the canonical, reviewer-tested recipe.

## Configuring or explaining rules

When the user wants to understand a rule, disagrees with one, or wants to disable / tune which rules run (not fix code), read [references/explain.md](references/explain.md) and follow it. Start with `npx react-doctor@latest rules explain <rule>`, then apply the narrowest control via `npx react-doctor@latest rules disable|set|category|ignore-tag …`, which edits your `doctor.config.*` (or `package.json#reactDoctor`).

## Command

```bash
npx react-doctor@latest --verbose --scope changed --base main
```

| Flag | Purpose |
| --- | --- |
| `.` | Scan current directory |
| `--verbose` | Show affected files and line numbers per rule |
| `--scope changed --base main` | Only report issues introduced vs `main` |
| `--scope lines` | Only report issues on the changed lines |
| `--score` | Output only the numeric score (still needs the API) |
| `--no-score` | Skip the score API |
| `design` | Run only the focused UI design diagnostics |
