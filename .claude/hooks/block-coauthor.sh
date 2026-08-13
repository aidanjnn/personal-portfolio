#!/usr/bin/env bash
# Blocks any `git commit` that carries a Co-authored-by trailer.
# Commits in this repo are authored by Aidan Jeon alone — no agent co-authorship.
set -euo pipefail

command=$(jq -r '.tool_input.command // ""')

case "$command" in
  *git*commit*) ;;
  *) exit 0 ;;
esac

if printf '%s' "$command" | grep -qiE 'co[-_ ]?authored[-_ ]?by'; then
  cat >&2 <<'EOF'
Blocked: commits in this repo never carry a Co-authored-by trailer.

Every commit is authored solely by the repo owner. Re-run the same commit with
the trailer removed — do not add Claude, Anthropic, or any agent as co-author.
EOF
  exit 2
fi

exit 0
