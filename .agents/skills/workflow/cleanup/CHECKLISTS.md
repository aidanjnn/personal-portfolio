# Cleanup checklists

Reference for [cleanup](SKILL.md). Load when planning or implementing passes.

## Operating principles

- Boring, obvious code over clever abstractions.
- Deletion over abstraction when code adds no leverage.
- Simple local helpers over frameworks.
- Explicit domain names over `data`, `result`, `item`, `temp`, `helper`.
- One clear path over compatibility fallbacks unless still required.
- Fewer files when splits do not improve clarity, testability, or ownership.
- More files only when separation is real — not because two blocks look similar.
- Abstract when the **shared concept** is real, not when two snippets look alike.

## Cleanup targets

Look for and fix:

- Repeated logic, magic constants, repeated string literals.
- Large functions mixing unrelated concerns; boolean-flag soup.
- Deep nesting (prefer guard clauses; max ~2 levels).
- Dead code, unused imports/variables, unreachable branches.
- Development artifacts: debug logs (`console.log`, stray `print`, `logger.debug` spam), temporary helpers, scratch scripts, leftover scaffolding.
- Pass-through wrappers and redundant types/schemas.
- Multiple representations of the same concept.
- Inconsistent error handling at boundaries.
- UI: mixed-responsibility giants vs pointless one-line wrappers.
- Over-complex state; unused props/parameters.
- Repeated shape-mapping between similar DTOs.
- Tests that mirror implementation instead of asserting behavior.

## LOC reduction

**Good reduction**

- Removes dead or provably unused paths.
- Collapses duplicate branches.
- Drops unnecessary intermediates when names stay clear.
- Replaces verbose boilerplate with a named helper that **reduces** cognitive load.
- Simplifies types/transformations without hiding behavior.

**Bad reduction**

- One-liners that hide control flow.
- Removing domain-meaningful names.
- Implicit behavior or weakened errors.
- Fewer tests or weaker assertions.
- Harder next change for marginal line count.

## Comment policy

**Remove:**

- Comments that restate the code or narrate what the next line does.
- Tombstones (`# Removed: old_function`, `# was: previous_value`, `# no longer needed`).
- Diff narration and access-audit comments (`# added for X`, `# changed from Y to Z`, `# updated to use W`).
- Commented-out code (git history keeps it).
- Section banners and TODO/FIXME left over from development that no longer point at real work.
- Docstrings that only repeat the signature.

**Keep or add** only for:

- Why (not what).
- Non-obvious domain rules.
- Compliance, security, or audit constraints.
- Performance tradeoffs worth remembering.
- External system quirks (LOS, vendor APIs, webhooks).
- Migration or compatibility windows with an exit.
- Invariants the next editor must not break.

Goal: self-documenting structure and names; comments for exceptions.

## Performance policy

Secondary to simplification. Implement only when changes are:

- Safe and behavior-preserving.
- Localized and easy to reason about.
- Clearly beneficial.
- Not readability-negative.

**Look for**

- N+1 queries; repeated DB/API calls; over-fetching.
- Avoidable recomputation, parsing, serialization.
- Hot loops; missing batching where obvious.
- React: avoidable re-renders, unstable object/function identities in deps.
- Heavy imports used for tiny utilities.

**Skip**

- Speculative caching, premature memoization, micro-opts that obscure intent.
