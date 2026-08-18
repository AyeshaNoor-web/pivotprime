<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- project rules, outside the block next dev regenerates -->

## Reveal-on-scroll

Use `useRevealOnScroll` or `useSequentialReveal` from `src/lib/use-reveal-on-scroll.ts`.
Do not write a new `useState(false)` plus `IntersectionObserver`.

Both start **revealed** and un-reveal only when the element is below the fold and
motion is allowed. The naive version has a defect that is invisible in a browser
and obvious to a crawler: whatever the flag hides is hidden in the
server-rendered HTML and stays hidden without JavaScript. `CountUp` shipped every
result figure on the homepage as the string `0` for exactly this reason.

Treat any new `useState(false)` guarding visible content as a defect. The React
lint rule about calling setState synchronously inside an effect will also reject
the naive shape, so extend the primitive rather than working around the rule.

Guarded by `npm run check:content`, which asserts the copy is in the raw HTML
with JavaScript off.

## Commit messages state what was observed

Not what was intended. If a message says a component is shared, every consumer
has been checked. If it says a check passes, the check has been run against the
build being committed. If verification has not happened yet, the message says so
in those words.

This is a rule because it has been broken three times on this branch, each time
converting an unverified claim into a verified-looking one:

- "Verified at 360" when the viewport measured was 369, so the narrowest width
  was never tested and a 9px overflow survived several rounds of checking.
- A forbidden assertion matching `"We have sat in the system"` while the page
  rendered the contraction `"We've"`, so it passed while the section was still
  there and duplicated.
- "The grid is extracted to a shared component ... two implementations would
  drift" while `/services` had never been wired to it, so both implementations
  were sitting in the tree, described as consolidated.

A wrong claim in a commit message is worse than no claim, because it stops the
next person looking.

**Before claiming consolidation**, grep for every consumer. `npm run check`
covers heading structure and served copy, but nothing automatically verifies that
a shared module is the only source.

## The first output of a new measurement is not evidence yet

Run it, then check what it says against something you already know. A new tool is
as capable of being wrong as the thing it replaced, and it is more persuasive
because it looks objective.

This has happened four times on this branch, and the fourth is the instructive
one, because the tool built to solve the problem reproduced it:

- "Verified at 360" while the viewport measured 369.
- A forbidden assertion matching `"We have sat in the system"` where the page
  rendered the contraction, so it passed while the section was still there.
- A commit describing a component as shared while one consumer was never wired.
- `audit-spec-copy.mjs`, built specifically to stop hand-typed needles producing
  false results, reported 92 missing copy blocks on its first run. The real
  figure was 53. It was comparing pandoc's bullet prefixes and `{.mark}` spans
  literally. Then, once fixed, it reported 11 more that were also not defects:
  eight were its own artefacts and three were deliberate.

Before reporting a number a tool produced, find one case in it you can verify by
hand. If that case is wrong, the number is wrong.

## A gated or deviated decision is not done until the client can see it

The four rules above are all about claiming more than you observed. This one is
the opposite failure: doing the work correctly and leaving no trace of it where
the client looks.

Anything gated behind a flag, deferred to a later phase, or built differently
from the spec needs an entry in `docs/PENDING-COPY.md`, written in the client's
language rather than ours. The code change is not finished until that entry
exists.

Spec 3.11 gives the homepage close a supporting sentence promising a scored
result in four minutes. It is correctly gated, because the contact page cannot
honour that promise while the diagnostic is off. It was recorded nowhere the
client would look, so she would have opened her own close section, found the
standfirst missing, and read it as carelessness rather than as a decision.

`scripts/audit-spec-copy.mjs` holds the gated list in code. Every entry there
carries a `tracked:` field naming its `PENDING-COPY` entry, and the two are
cross-checked. That cross-check has now caught two omissions in the record on
work the code was handling correctly.
