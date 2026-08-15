# Pending copy and open decisions

---

## 0. Stage one scope and the diagnostic flag

Stage one ships the site itself. The diagnostic, its report, the email delivery
of that report and the database are a later phase.

### 0.1 The flag

`NEXT_PUBLIC_ENABLE_DIAGNOSTIC`, defined in `src/lib/flags.ts`, **defaults to
false**. While false:

- `/diagnostic` returns `notFound()`, so the route 404s
- the page declares `robots: { index: false, follow: false }`
- the route is excluded from `/sitemap.xml`
- neither the navigation nor the footer carries a diagnostic entry

It is `NEXT_PUBLIC_` because it is read in page modules evaluated during the
build and in client components, so it has to be inlined rather than read from the
server environment. That also means **flipping it requires a rebuild**, not just
a restart.

An unset or misspelt variable keeps the diagnostic off. The failure mode of a
typo is a hidden feature rather than an unfinished one exposed to the public.

### 0.2 Where the work is kept

**Nothing was reverted.** The diagnostic work stays in the tree, gated. The full
record is on **`feature/diagnostic-phase-2`**, branched from `3518f02`, which
carries:

- the deep instrument rebuilt to one domain per screen (spec 8.2)
- the corrected domain order and explicit tie-breaking
- stable, spec-derived statement ids and the twelve anchor ids
- the scoring, presentation and statement modules with 24 tests

Ongoing diagnostic work belongs on that branch, not on `revamp/spec-v1.7.1`.

### 0.3 What is not built yet

The instrument currently at `/diagnostic` is the **deep 42-statement version**.
The split into a public 12-question instrument at `/diagnostic` and an unlisted
deep one at `/diagnostic/deep` is later-phase work, so `/diagnostic/deep` does
not exist and 404s on its own account rather than by the flag.

### 0.4 The CTA substitution — **needs a decision, not blocking**

The spec makes the diagnostic the destination of the secondary CTA everywhere:
the hero, the homepage close, and the routing blocks on the service and persona
pages. With the diagnostic gated, those CTAs would lead to a 404.

For stage one they point at `/contact`. Both labels are the spec's own wording,
nothing is invented:

| Phase | Label | Destination | Spec source |
|---|---|---|---|
| Phase two | Take the 4-minute diagnostic | `/diagnostic` | 2.2, secondary CTA |
| **Stage one** | **Talk to us** | **`/contact`** | 2.2, header button |

Both live in `src/content/cta.ts` as `JOURNEY_CTA`, selected by the flag, so
every consumer follows automatically. Reverting is not an edit at all: turn the
flag on and the diagnostic label and destination come back.

**The judgement call, flagged rather than assumed.** The brief said to keep the
spec's secondary CTA wording. Read literally that would ship a button reading
"Take the 4-minute diagnostic" that lands on a contact form, promising an
instrument that does not exist and delivering a form instead. That is a worse
defect than the substitution it is meant to avoid, so the label moves with the
destination, using the spec's other CTA wording rather than new copy. Say if you
want the literal reading instead: it is one line in `cta.ts`.

### 0.5 WhatsApp

In scope for stage one and unchanged in intent. The floating button appears on
every page and each service page carries two inline WhatsApp CTAs, which were
already present rather than added.

The number now comes from `NEXT_PUBLIC_WHATSAPP_NUMBER` rather than being
hardcoded in eleven places. When it is unset, every WhatsApp CTA degrades to
`/contact` rather than producing a broken `wa.me` link, and the label falls back
from "Talk to us on WhatsApp" to "Talk to us" so it does not promise a channel
it cannot open.


---

Everything the build is waiting on, and every deviation logged rather than
silently taken. Nothing here blocks stage one.

Items marked **client** need Iram. Items marked **Saif** are ours. Items marked
**logged** are decided and recorded so they can be reversed cheaply.

---

## 1. Copy still with the client

Each of these lives in `src/content/` behind a `TODO(client)` marker and renders
as an empty block until the real text lands. No placeholder figures, no invented
client names.

| # | Item | Spec § | Owner | Blocks |
|---|---|---|---|---|
| 1.1 | Eighteen constraint commentary blocks: per domain, three to four sentences on what the constraint costs, three checks to run this week, and one recommendation paragraph | 7.2, deep 8.4 | client | Report email, both diagnostics |
| 1.2 | Homepage result card 6: a count of bespoke builds shipped, or manual hours removed per month | 3.3, 10 #4 | **Saif** | Homepage results band |
| 1.3 | Confirmation of result cards 4 and 5 against the master table | 3.3, 10 #4 | client | Homepage results band |
| 1.4 | Master results table sign-off. Operational waste is published as both "40 to 60% reduction" and "10 to 40% reduction". These cannot both be true and the spec calls it a direct contradiction | 9, 10 #5 | client | Homepage, About, case studies |
| 1.5 | Final wording for the contingent fee section. No percentage or formula is to be published | 3.10, 10 #3 | client | Homepage 3.10 |
| 1.6 | Which team members appear, with photographs and one-line credentials | 6.3, 10 #2 | client | About team layer |
| 1.7 | Which clients may be named, confirmed in writing | 3.8, 10 #1 | client | Case studies, logo bar |
| 1.8 | Privacy policy legal sign-off by a UAE-qualified adviser | 2.7 | client | `/privacy`, both diagnostics, all three API routes |
| 1.9 | Founder portrait at full resolution, plus the two article URLs for the proof bar | 8.1, 10 #8 | client | Homepage 3.7, About 6.1, proof bar |
| 1.10 | CRM, dashboard and Scentmatic assets, client data blurred | 8.1, 10 #8 | **Saif** | Technology Builds |
| 1.11 | Homepage services card 6 body. The spec reads "START WITH THE DIAGNOSTIC (TEXT AS PER CARD SHOWN)" and the card it refers to is an image, so there is no transcribable copy | 3.4 | client | Homepage 3.4, `/services` |
| 1.12 | RAKEZ activity scope confirmation for selling software as a standalone product | 10 #7 | client | Technology Builds going live |
| 1.13 | The WhatsApp pre-fill message. Spec 2.2 says to point the header button "at WhatsApp with the homepage pre-fill" but never states the wording. Linking without pre-filled text until it arrives, which opens the chat empty rather than putting words in a prospect's mouth | 2.2 | client | Nothing, the CTA works without it |

---

## 2. Spec contradictions, logged and worked around

### 2.1 The fractional service slug — **logged, decided**

The spec gives two URLs for one page:

- §2.1 "New URLs required" lists `/services/fractional-coo`
- §4.2 defines the page as `/services/fractional-leadership`, and the §3.4 card button points there

**Decided:** hold `/services/fractional-coo`. The slug and the nav label match, and
it is the term searched in this market. The H1 stays "Fractional Leadership" as
§4.2 wrote it, because the page covers COO, Chief of Staff and CFO seats. A
permanent redirect from `/services/fractional-leadership` means either link
resolves. Iram to be told, not to be waited on.

### 2.2 The Chief of Staff anchor — **logged, decided**

§4.2 instructs "build the three anchors: `#coo`, `#chief-of-staff` and `#cfo`",
then eleven lines later labels the seat `#cos`.

**Decided:** `#chief-of-staff` is canonical, with `#cos` to be aliased so any
link already sent out still lands.

**Not yet implemented.** None of the three seat anchors exist on
`/services/fractional-coo` today, so neither the canonical fragment nor the alias
resolves. Spec 4.2 calls these anchors load-bearing, since the persona pages and
the homepage services card link straight into a specific seat. This belongs to
the stage one audit pass over the existing service pages, which is where it is
tracked rather than assumed done.

### 2.3 Persona headlines: spec against mockup — **client**

§§5.1 to 5.4 say to keep the existing persona H1s verbatim, describing them as
the strongest writing on the site. `req/pivotprime-persona-pages.html` carries
four completely different ones.

| Live and in this repo (spec says keep) | Mockup |
|---|---|
| You've created something real. | You're a founder, and everything still depends on you. |
| Revenue is increasing, but margins are uneven. | You are running an SME that is growing but not settled. |
| You're carrying delivery, risk, and outcomes | You're expected to drive results, but you are alone in the execution. |
| You are responsible for the whole system. | You are accountable for the P&L, across teams, markets and moving parts. |

**Built as:** the spec version, the live copy. If Iram confirms the mockup is the
later approval, the swap is one line per page. Saif is asking her directly.

### 2.4 Two homepage sections with no place in the spec order — **logged, relocated not deleted**

The homepage currently carries two sections that do not appear anywhere in the
3.1 to 3.12 running order:

- "We don't just understand your challenges. We fix what's really holding your business back"
- "We've sat in the system. Now we help reshape it."

**Decided:** neither is deleted. Both move into the About page content under §6.1,
where "We've sat in the system" reads as authority copy rather than homepage
filler. The homepage renders the twelve specified sections and nothing else.
Iram can veto the move without anyone rewriting copy.

---

## 3. Build deviations found in the existing code

### 3.1 The deep diagnostic screen structure — **resolved, built to spec**

Deep spec §8.2 says "One domain per screen, seven statements visible together,
with a progress indicator showing six steps." The implementation interleaved
instead, round-robining across all six domains so every page mixed all six.

**Built to spec.** Six domain-titled screens of seven statements each.

The straight-lining risk that the interleave was reaching for is handled without
breaking §8.2: statement order is randomised **within** each domain screen, per
session. Seven near-identical statements in a fixed column is what invites a
straight run down one point of the scale, and shuffling inside the block removes
that without moving a statement between domains.

Scoring is unaffected. Statements now carry a stable, spec-derived id, so the
exported answers key on identity rather than on the position a statement happened
to render at. Re-run comparison holds and the twelve short-instrument anchors
still map.

### 3.1a The six discarded thematic page titles — **client, if wanted**

The interleaved layout carried six thematic section titles. They belonged to a
structure where a page genuinely had no single subject, and they appear in
neither the website spec nor the diagnostic document, so they are not sanctioned
copy. Section titles are now the domain names from spec §7.1.

Recorded here in case Iram wants them back as section furniture, for example as a
strapline under the domain name:

1. How the business runs today
2. Where the money actually goes
3. What happens under pressure
4. Who owns what
5. What the numbers tell you
6. What is holding the ceiling down

Note they were written against the old page order, so they do not map one to one
onto the six domains as they now stand.

### 3.1b One deep statement had drifted from the spec — **corrected**

Deep spec statement 10 reads "What sales commits to is consistently what
**operations** can actually deliver." The repo had "what **delivery** can
actually deliver", which also reads awkwardly against its own verb. Corrected to
the spec wording while moving the pool into `src/lib/diagnostic/statements.ts`.

Flagged because it is a change to an instrument statement, not to marketing copy.
It is not an anchor, so no short-instrument comparison is affected.

### 3.2 Joint-constraint reporting is narrower than the spec — **logged**

Deep spec §4.4 says "where two are within three points of each other, present
them as joint". The implementation only ever marks the second-ranked domain as
joint with the first. Two domains tied at ranks three and four are not marked.
Low impact, since the report leads on the primary constraint, but it is not what
the spec describes.

---

## 4. Colours

### 4.1 The six off-palette values — **resolved**

All six are resolved and applied. The palette stays at five.

| Hex | Was | Now |
|---|---|---|
| `#093524` | Dark section background on 8 files | Collapsed to `#013325`. The two differ by 8 on red and 2 elsewhere, the same colour typed twice |
| `#4fb968` | Homepage sub-headings | Replaced by context, not by value: `mid` on light, `neon` on dark, which is the mockups' own `.g` / `.ondark .g` rule |
| `#123e2d` | Card surface on dark | `rgba(255,255,255,.05)`, derived from forest |
| `#21533e` | Card border on dark | `rgba(255,255,255,.14)` |
| `#164b36` | Card hover | `rgba(255,255,255,.08)` |
| `#21352b` | Marquee divider | `rgba(255,255,255,.14)` |

Spec 3.9 tags the persona cards KEEP. That covers the design intent of the
cards, not the four hexes someone reached for to build them, so deriving the
surfaces from the forest token sits inside the tag rather than against it.

### 4.2 The mockups disagree with each other on the neon — **logged**

`req/pivotprime-diagnostic-deep v2 mock up.html` declares `--neon:#22c55e`.
Every other mockup declares `--neon:#00d76d`, and `#00d76d` is what the swatch
plate in the copy spec shows. This is a mockup inconsistency, not a developer
error: the deep diagnostic was built faithfully to a mockup that was itself off.

**Standardised on `#00d76d` site-wide.** Worth telling whoever produced the
mockups, so the next export does not reintroduce it.

### 4.3 Deliberately off-palette — **enforced**

`#25D366` on the floating WhatsApp button is Meta's mandated brand green. It is
registered in `scripts/palette-allow.json` with the reason, and carries a comment
at the usage site, so nobody "fixes" it to `--color-neon` in three months.

### 4.4 Three leftovers not covered by the six — **open, low priority**

These predate the rebuild, live only in `globals.css`, and were not part of the
six resolved above, so they have not been touched.

| Token | Hex | Reached through |
|---|---|---|
| `--color-primary-dark` | `#008744` | `hover:bg-primary-dark`, used site-wide on buttons |
| `--color-dark` | `#121212` | No current usage found |
| `--color-light` | `#f5f5f5` | No current usage found |

`--color-primary-dark` is the live one: it is the hover state on every primary
button. The mockups do hover with opacity rather than a second green, so the
consistent fix is to drop the token and hover on alpha. Not done unasked,
because it changes every button on the site.
