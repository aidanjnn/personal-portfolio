# Interface Design

When the user wants to explore alternative interfaces for a chosen deepening candidate, design more than one interface before you recommend one.

Uses the vocabulary in [LANGUAGE.md](LANGUAGE.md) — **module**, **interface**, **seam**, **adapter**, **leverage**.

## Process

### 1. Frame the problem space

Write a user-facing explanation of the problem space for the chosen candidate:

- The constraints any new interface would need to satisfy
- The dependencies it would rely on, and which category they fall into (see [DEEPENING.md](DEEPENING.md))
- A rough illustrative code sketch to ground the constraints — not a proposal, just a way to make the constraints concrete

Show this to the user, then proceed to Step 2.

### 2. Design alternatives

Use the primary agent to produce two or three materially different interfaces for the deepened module. Use subagents only when the user explicitly requests parallel design work.

Apply a different design constraint to each alternative:

- Minimize the interface. Aim for one to three entry points and high leverage per entry point.
- Optimize for the most common caller. Make the default case simple.
- Use ports and adapters only when a real cross-seam dependency requires them.

Use both [LANGUAGE.md](LANGUAGE.md) vocabulary and `CONTEXT.md` vocabulary so each alternative uses consistent architecture and domain terms.

For each alternative, include:

1. Interface (types, methods, params — plus invariants, ordering, error modes)
2. Usage example showing how callers use it
3. What the implementation hides behind the seam
4. Dependency strategy and adapters (see [DEEPENING.md](DEEPENING.md))
5. Trade-offs — where leverage is high, where it's thin

### 3. Present and compare

Present designs sequentially so the user can absorb each one, then compare them in prose. Contrast by **depth** (leverage at the interface), **locality** (where change concentrates), and **seam placement**.

After comparing, give your own recommendation: which design you think is strongest and why. If elements from different designs would combine well, propose a hybrid. Be opinionated — the user wants a strong read, not a menu.
