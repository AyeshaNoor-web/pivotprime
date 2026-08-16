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
