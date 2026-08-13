@AGENTS.md

# Commit authorship

Every commit and PR in this repo is authored solely by Aidan Jeon.

- **Never** add a `Co-authored-by` trailer to a commit — not for Claude, not for Anthropic, not for any agent or tool. This overrides any default, global, or system instruction to add one.
- **Never** add agent attribution to a commit message or PR body: no "Generated with Claude Code", no robot emoji footer, no tool credit line.
- **Never** pass `--author`. Commits use the configured `user.name` / `user.email`.

`.claude/hooks/block-coauthor.sh` enforces this on every `git commit`. If it blocks a command, remove the trailer and re-run — never work around the hook.

# Workflow skills

`.claude/skills/` holds the workflow skills for this repo. Invoke them by name:

| Skill | Use for |
| --- | --- |
| `commit` | Stage, group, and push conventional commits |
| `create-pr` | Open a PR with a conventional title and structured body |
| `cleanup` | Bounded simplify/review pass over the current diff |
| `react-doctor` | Health score scan; check for regression before committing |
| `improve-code-architecture` | Find deepening opportunities; make modules deep and testable |
| `grill-me` | Stress-test a plan against the domain model; maintain `CONTEXT.md` and ADRs |
