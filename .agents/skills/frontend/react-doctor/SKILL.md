---
name: react-doctor
description: Use when finishing a feature, fixing a bug, before committing React code, or when the user wants to improve code quality or clean up a codebase. Checks for score regression. Covers lint, dead code, accessibility, bundle size, architecture diagnostics.
version: "1.1.0"
---

# React Doctor

Scans React codebases for security, performance, correctness, and architecture issues.

Lint findings are local. The 0–100 health score is not — after the scan, the CLI POSTs diagnostics to `https://www.react.doctor/api/score`. If that request fails, times out, or is blocked, the scan still prints findings and says `Score unavailable (could not reach the score API)`.

Adapted from [tomzhengy/tomzhe.ng](https://github.com/tomzhengy/tomzhe.ng/blob/main/skills/react-doctor/SKILL.md).

## After making React code changes:

```bash
npx -y react-doctor@latest . --verbose --scope changed --base main
```

Request unrestricted network for that command. The score API is not on the default sandbox allowlist, and the first request is often the one that fails.

Gate on **diagnostics**, not the number:

- If the score is present and dropped, fix the regressions before committing.
- If the score is unavailable and the scan found no issues, continue. Do not rerun just to get a number.
- Use `--no-score` when you only need diagnostics (offline, or the API is flaky).

## For general cleanup or code improvement:

Run `npx -y react-doctor@latest . --verbose` (no `--scope`) to scan the full codebase. Fix issues by severity — errors first, then warnings. Same score-API rules as above.

## Command

```bash
npx -y react-doctor@latest . --verbose --scope changed --base main
```

| Flag | Purpose |
| --- | --- |
| `.` | Scan current directory |
| `--verbose` | Show affected files and line numbers per rule |
| `--scope changed --base main` | Only scan files changed vs `main` |
| `--score` | Output only the numeric score (still needs the API) |
| `--no-score` | Skip the score API |

`--diff` is deprecated. Do not use it.

## Suppressing rules

Deliberate design choices will trip rules that are correct in the general case (tiny text, wide letter spacing, large hero components). Do not rewrite intentional design to satisfy a rule.

Instead, add the rule to `react-doctor.config.json` at the repo root, with the narrowest scope that works — a per-file `override` before a global `ignore`:

```json
{
  "ignore": {
    "rules": ["react-doctor/no-wide-letter-spacing"],
    "overrides": [
      {
        "files": ["app/components/Hero.tsx"],
        "rules": ["react-doctor/no-giant-component"]
      }
    ]
  }
}
```

Every suppression is a claim that the rule is wrong *here*. If you cannot say why, fix the code instead.
