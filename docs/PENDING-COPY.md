# Pending copy and open decisions

Everything the build is waiting on, and every deviation logged rather than
silently taken. Nothing here blocks Step 1.

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

**Decided:** `#chief-of-staff` is canonical. `#cos` is handled as a client-side
hash alias that rewrites on load, so any link already sent out still lands.

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

### 3.1 The deep diagnostic does not present one domain per screen — **needs a decision**

Deep spec §8.2 says "One domain per screen, seven statements visible together,
with a progress indicator showing six steps."

The existing implementation interleaves instead: it round-robins across the six
domains seven times, then slices the 42 statements into six pages of seven. Every
page therefore mixes all six domains, and the six page titles are thematic
("How the business runs today", "Where the money actually goes") rather than
domain names.

This predates the rebuild and is a defensible choice, since grouping seven
similar statements together invites straight-lining down one column. But it
contradicts the spec, and the spec is the source of truth, so it is logged rather
than kept quietly. Someone needs to pick.

### 3.2 Joint-constraint reporting is narrower than the spec — **logged**

Deep spec §4.4 says "where two are within three points of each other, present
them as joint". The implementation only ever marks the second-ranked domain as
joint with the first. Two domains tied at ranks three and four are not marked.
Low impact, since the report leads on the primary constraint, but it is not what
the spec describes.

---

## 4. Colours with no approved mapping

See `docs/AUDIT.md` §4.2. Every hex used in the mockup-derived components traces
back to an approved mockup. The values below appear only in the older hand-built
pages, are absent from both the five-value brand palette and every mockup, and
are not being guessed at.

| Hex | Uses | Where | Note |
|---|---|---|---|
| `#093524` | 11 | Homepage, About, all four personas, How We Work, Footer | The dark section background everywhere. Near `#013325` but visibly lighter |
| `#4fb968` | 6 | Homepage sub-headings | Reads like an attempt at the neon that missed |
| `#123e2d` | 5 | Homepage persona cards, How We Work | Card surface on dark |
| `#21533e` | 5 | Homepage persona cards, How We Work | Card border on dark |
| `#164b36` | 4 | Homepage persona cards | Card hover state |
| `#21352b` | 1 | Homepage logo marquee | Divider rule |

Retained deliberately and not up for mapping: `#25d366` is WhatsApp's own brand
green on the floating button, and `#22c55e` on the deep diagnostic score is
carried over from the approved mockup, though it looks like a Tailwind default
that slipped in and is worth a second look.
