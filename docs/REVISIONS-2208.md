# Client revisions, 22 August 2026 — audit

Audit only. No code was written in this pass.

## Sources, and what is actually authoritative

| File | What it is | Weight |
|---|---|---|
| `Website Revisions - 2208v1.pptx` | 8 slides, **every one an image**. No text frames, no speaker notes. The alt text pandoc extracted is AI-generated description, not the client's words | Direction only. Nothing in it can be quoted as copy |
| `pivot-prime-kpi-cards_3.html` | Working mockup, 5 KPI cards | Authoritative for structure and colour. **Not** for copy |
| `pp-services_11.html` | Working mockup, 5 service cards | Same |
| `WEBSITE PHOTO.jpg` | 4099x6149 portrait | Asset, drop-in |

**Slides 2, 4, 5, 7 are screenshots of our current site**, marked up.

> ### Slide 7 does not re-approve "BOOK CONSULTATION"
>
> Slide 7 shows the nav reading `BOOK CONSULTATION` and the founder panel reading
> `PORTRAIT COMING SOON`. **Both are states we had already changed before the deck
> arrived.** The screenshot records what Iram was looking at when she wrote her
> notes; it is not an instruction to keep what is in it.
>
> `BOOK CONSULTATION` is the wording spec 2.2 line 226 asks to be removed, and it
> was reverted to `Talk to us` in commit `73ff411`. The portrait placeholder is
> closed by her own new file. **Nobody should read this deck as re-approving that
> nav label.** If Iram does want it back, that is a change to spec 2.2 and needs
> saying in words, not inferring from a screenshot of a bug she was reporting.

---

## Your four, confirmed or corrected

### 1. KPI cards replace ResultsGraphic — **CONFIRMED, with a copy conflict attached**

Structurally you are right, and the served-HTML defect does close with it. All five
figures are in the mockup's static HTML:

```
>+7<  >40–60<  >+13<  >+27<  >67<     all present, none JS-injected
```

One `<script>`, one `createElement`, and it builds a decorative 20-dot retention grid.
No text is injected. That is a real fix for the defect where `ResultsGraphic` rotates
one metric every 3s and serves only the first.

**But the figures are not the spec's.** Spec 3.3 is a green block, verbatim by section 1:

| Spec 3.3 | Mockup | |
|---|---|---|
| 53% | **+7%** | changed |
| 62% | **40–60%** | changed, and now a range |
| 16% | **+13%** | changed |
| 27% | +27% | same |
| 67% | 67% | same |

Three of five results claims have moved. Labels moved too: "Reduction in duplicated
work, rework and inefficiency" → "Less duplicated work, rework & waste"; "Increase in
profit" → "Increase in profit **margin**". **CONFLICT.** These are commercial claims in
a verbatim block. Not ours to reconcile.

### 2. Palette expands to ten — **CONFIRMED exactly**

Slide 3's swatch reads, and I transcribed it from the image rather than trusting the
alt text:

```
row 1   #013325  #00d76d  #009f50  #000000  #ffffff     ← identical to our tokens
row 2   #fefbf8  #e8f4ec  #e8d7b5  #9f7a3d  #efeae0     ← the five you listed
```

Your five match the swatch character for character, and the top row matches
`globals.css` exactly. No existing colour is being redefined.

**Off-swatch hexes: eleven, not four.** You said "including", so this is the rest.
Mapped by perceptual distance, with the declaration each sits in:

| Hex | Nearest token | Δ | Used as | Verdict |
|---|---|---|---|---|
| `#fef9eb` | shell `#fefbf8` | 19 | heading, CTA on gold card | map |
| `#023d28` | forest `#013325` | 21 | body text | map |
| `#012a1d` | forest `#013325` | 23 | heading, CTA | map |
| `#014d2f` | forest `#013325` | 55 | price | map |
| `#c8f0da` | mist `#e8f4ec` | 61 | price on dark | REVIEW |
| `#007d40` | mid `#009f50` | 73 | card background | REVIEW |
| `#c49040` | bronze `#9f7a3d` | 75 | KPI chart stroke + label | REVIEW |
| `#b8d9c6` | sand `#e8d7b5` | 84 | body on dark | REVIEW — nearest is a *sand*, this is a *green*. Wrong hue family |
| `#3a3510` | forest `#013325` | 90 | "dark olive gold" card bg | REVIEW — nearest is green, this is olive |
| `#3d5244` | forest `#013325` | 119 | body text | REVIEW |
| `#c8af50` | bronze `#9f7a3d` | 129 | price, badge stroke | **CANNOT MAP** |

`#c8af50` and `#3a3510` are a gold/olive pair with no counterpart on the swatch. Four
more are nearest-to a token of a different hue family, which means the number is
misleading. **Logged, not mapped silently, as instructed.** Six of the eleven need
Iram to say whether they are a new pair or a mistake.

### 3. Services cards show full body copy — **CONFIRMED structurally, CONFLICT on the copy**

The mockup has no `Read more`, no `line-clamp`, no `<details>`, no `aria-expanded`.
Full body, always visible. That is the right shape.

One correction to the premise: **our current truncation is presentational, not
structural.** `ServiceCards.tsx` uses CSS `line-clamp` (3 occurrences), so the full
sentence *is* in the served HTML today — `Most engagements start here` is present on
`/services`. The crawler sees everything. The reader sees a cut-off sentence. Bad, but
not the served-HTML defect class.

**The mockup's card copy does not match the spec.** Twelve lines are not in
`docs/spec.md` in any form, including all five body paragraphs and two CTA labels:

| Spec | Mockup |
|---|---|
| "…margin leakage, and where technology genuinely helps. You get a prioritised roadmap of what to fix and in what order. Most engagements start here." | "…margin leaks and the decisions that slow everything down." *(two sentences dropped)* |
| "See what tech we can build" | "See what we build" |
| "What market entry includes" | "How market entry works" |

**CONFLICT.** Wiring the mockup's text would overwrite verbatim green-block copy —
the exact defect `PENDING-COPY 1c` was opened for. The layout can be taken; the words
cannot, without Iram saying she rewrote them deliberately.

### 4. Portrait superseded — **CONFIRMED, clean**

`WEBSITE PHOTO.jpg` is 4099x6149, against the current 1066x1600. At 552 CSS px on
desktop that is comfortably past 2x, so the resolution note in `PENDING-COPY 1.9`
closes. Same subject, same seated framing, so `object-top` carries over unchanged.
No conflict. **REPLACE.**

---

## The two things you asked me to check specifically

### Does conditionally-rendered content still exist in the served HTML?

**Yes, everywhere I checked, with JavaScript off.**

- All ten spec 3.5 patterns: present, 1 occurrence each.
- Service card bodies behind the clamp: present.
- Nav dropdown panels: present (asserted since `c69617d`).

The patterns mockup keeps all ten visible simultaneously and adds a
Critical/Structural/Operational severity tier, so it does not regress this.

### Do the mockups reintroduce copy the reverse audit flagged?

**Not in the two HTML files — zero matches against the 44 `awaiting-client` entries.**

That result is narrower than it sounds, and I would rather say so: the deck is images,
so no automated cross-check can read it. Reading slide 5 by eye, the patterns panel
carries `SELECT THE SYMPTOMS THAT SOUND FAMILIAR`, `Discuss Your Fix →` and the three
tier labels. None are in the spec.

---

## A hole in our own reverse audit, found while doing this

`check-unsanctioned-copy.mjs` reported "clean" on a homepage carrying
`Discuss Your Fix →`, which is in neither `docs/spec.md` nor
`scripts/sanctioned-copy.json`.

The cause is mine. It does `html.split(/<\/header>/i).pop()` to skip the site header
before collecting links and buttons. `<header>` is a valid sectioning element and this
page contains **three**, so it takes everything after the *last* one and discards the
rest of the page:

```
links   in full page: 48   seen by the checker: 17   DROPPED: 31
buttons in full page: 39   seen by the checker:  8   DROPPED: 31
```

**FIXED, and it was worse than reported above.** The site header is a `<nav>`, not a
`<header>`, so the slice never excluded the site header at all: it only threw away
page content. The collector now loads each route in Chrome with **JavaScript off**,
the same served HTML the other checks read, and removes the header and footer nodes
by `data-site-header` / `data-site-footer`. No offset arithmetic anywhere. It also
crawls rather than reading the sitemap, which had silently skipped `/privacy`, a
route deliberately kept out of the sitemap because it carries `noindex`.

Corrected numbers, 16 routes:

| | distinct items | trace to spec | trace to allowlist | **unsanctioned** |
|---|---|---|---|---|
| chrome excluded | 168 | 67 | 95 | **6** |
| whole document | 179 | 76 | 97 | **6** |

The previously reported "53 traced, 44 awaiting" described the contents of the
allowlist file, not anything verified. **The real finding is 6 unsanctioned, where it
had reported 0.** All six were invisible to the broken version, and all six come from
the merged commits rather than from this round: `Book a Consultation`,
`Discuss Your Fix →`, `Talk to our team→`, and three `ResultsGraphic` segment labels.

Worth noting for a later decision: including the header and footer costs nothing.
The same six fail either way, and it covers eleven more items. Excluding chrome is
what was asked for and is what ships; there is no evidence it is the better default.

**Sweep of the rest of the suite: no other script has this fault.** Every
`split`/`slice`/`indexOf` elsewhere is on a URL, a filesystem path, or display
truncation. `check-content` and `check-links` match against the whole document and
limit to no region.

**62 of 87 calls to action on the homepage, 71%, are invisible to it** — including
every pattern chip. So "53 traced, 44 awaiting" is understated by an unknown margin,
and the check that was built to close a one-directional gap shipped with a hole of its
own. Headings are unaffected; they match against the full document.

This needs fixing before any of the work below, or the round lands unaudited.

---

## Change list

| # | Change | Component | Tag |
|---|---|---|---|
| 1 | Five KPI cards, all metrics simultaneous | `ResultsGraphic.tsx` → new component | **REPLACE** |
| 2 | Retires the 3s rotation and its served-HTML defect | `ResultsGraphic.tsx` | **REPLACE** |
| 3 | Metric figures 53→+7, 62→40–60, 16→+13 | `content/homepage.ts` `METRICS` | **CONFLICT** vs spec 3.3 |
| 4 | Metric labels reworded | `content/homepage.ts` | **CONFLICT** vs spec 3.3 |
| 5 | Before/after sub-visuals per card (dot grid, KYC 10→3 days) | new | **NEW** |
| 6 | Five palette tokens | `globals.css` `@theme` | **NEW** |
| 7 | Ten-value palette enforced | `scripts/lint-palette.mjs` | **REPLACE** |
| 8 | Eleven off-swatch hexes, six unmappable or wrong-hue | both mockups | **CONFLICT** |
| 9 | Service cards full body, no truncation | `ServiceCards.tsx` | **REPLACE** |
| 10 | Service card body copy rewritten | `content/services.ts` | **CONFLICT** vs spec 4.x |
| 11 | Two service CTA labels rewritten | `content/cta.ts` | **CONFLICT** vs spec |
| 12 | Portrait at 4099x6149 | `public/`, `FOUNDER.portrait` | **REPLACE** |
| 13 | Pattern severity tiers | `PatternsList.tsx` | **NEW** |
| 14 | Pattern panel copy, not in spec | `content/homepage.ts` | **NEW**, unsanctioned |
| 15 | 3 em dashes, 2 en dashes in the KPI mockup | copy linter would reject | **CONFLICT** vs spec §1 |
| 16 | `check-unsanctioned-copy.mjs` drops 71% of homepage CTAs | `scripts/` | **FIX FIRST** |

## What needs Iram, not us

1. The three changed result figures, and whether the labels moved deliberately.
2. The rewritten service card bodies and the two CTA labels.
3. `#c8af50` and `#3a3510`: new sanctioned pair, or an error?
4. The four wrong-hue near-matches.
5. The em and en dashes: her own house rule bans the em dash.
