---
name: react-doctor
description: Use when finishing a feature, fixing a bug, before committing React code, or when the user wants to improve code quality or clean up a codebase. Checks for score regression. Covers lint, dead code, accessibility, bundle size, architecture diagnostics.
version: "1.0.0"
---

# React Doctor

Scans React codebases for security, performance, correctness, and architecture issues. Outputs a 0–100 health score.

Adapted from [tomzhengy/tomzhe.ng](https://github.com/tomzhengy/tomzhe.ng/blob/main/skills/react-doctor/SKILL.md).

## After making React code changes:

Run `npx -y react-doctor@latest . --verbose --diff` and check the score did not regress.

If the score dropped, fix the regressions before committing.

## For general cleanup or code improvement:

Run `npx -y react-doctor@latest . --verbose` (without `--diff`) to scan the full codebase. Fix issues by severity — errors first, then warnings.

## Command

```bash
npx -y react-doctor@latest . --verbose --diff
```

| Flag        | Purpose                                       |
| ----------- | --------------------------------------------- |
| `.`         | Scan current directory                        |
| `--verbose` | Show affected files and line numbers per rule |
| `--diff`    | Only scan changed files vs base branch        |
| `--score`   | Output only the numeric score                 |

`--diff` compares against the base branch — `main` in this repo.

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
