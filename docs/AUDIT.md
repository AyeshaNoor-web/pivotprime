# Pivot Prime — Repository Audit

Pre-build audit of `src/app` and `src/components` against `PivotPrime_Website_Copy_Spec_v1_7_1.docx`.
No code has been changed. Produced at commit `132ad61`.

**Tag key:** KEEP (live and correct, do not touch) · FIX (small correction) · REPLACE (swap copy for spec) · NEW (build it) · MOVE (relocate) · DELETE (remove).

---

## 1. Route inventory

| # | Current route | Spec § | Tag | What has to happen |
|---|---|---|---|---|
| 1 | `/` | 3.1–3.12 | **REPLACE** | Twelve specified sections; four of the current seven survive. Breakdown in §2 below. |
| 2 | `/who-we-are` | 6 | **MOVE** + FIX + NEW | → `/about`. Add 6.1 opener and 6.3 team layer, delete one section, fix `behavior`, add `#team` anchor. `#case-studies` already exists. |
| 3 | `/what-we-do` | 4.6 | **MOVE** + FIX | → `/services/how-we-work`. Content is correct and stays. H1 becomes "How we work"; append the routing block. |
| 4 | `/services` | 4, 2.1 | **REPLACE** | Tabbed single page becomes a parent overview plus five real child routes. |
| 5 | `/diagnostic` | 7.3 | **MOVE** + FIX | This is already the deep 42-statement instrument. Move to `/diagnostic/deep`, `noindex`, token-gated. |
| 6 | `/diagnostic` (public) | 7.2 | **NEW** | Twelve statements, one per screen, email last. Does not exist. |
| 7 | `/for-corporate-owners` | 5.4 | **MOVE** + FIX | → `/for-pl-owners`. Two typo fixes, three sub-line rewrites, dual CTA block. |
| 8 | `/for-founders` | 5.1 | **FIX** | URL unchanged. Three sub-lines, audit floor, routing block. |
| 9 | `/for-smes` | 5.2 | **FIX** | URL unchanged. Three sub-lines, margin paragraph, routing block. |
| 10 | `/for-corporate-leaders` | 5.3 | **FIX** | URL unchanged. Three sub-lines, demote "What We Offer" to H2, routing block. |
| 11 | `/our-blog` | 2.1 | **MOVE** | → `/insights`. Placeholder page, content unchanged. |
| 12 | `/contact` | 2.3, 2.4 | **FIX** | Form is non-functional (`type="button"`, no handler, no action). Needs `/api/enquiry`. |
| 13 | `layout.tsx` | 4.5 | **FIX** | One global title/description for every page. Needs per-route metadata, OG tags, schema. |

### Routes that do not exist yet

`/services` (overview) · `/services/operational-clarity-audit` · `/services/fractional-coo` · `/services/build-and-place` · `/services/technology-builds` · `/services/uae-market-entry` · `/services/how-we-work` · `/about` · `/privacy` · `/diagnostic/deep` · `/insights` · `/for-pl-owners`

`next.config.ts` is empty. Every redirect in Step 1 is unwritten, so all six renamed routes will 404 on rename.

---

## 2. Homepage, section by section

The spec fixes the section order. Current order does not match, and half the sections do not exist.

| Spec § | Section | Present? | Tag | Note |
|---|---|---|---|---|
| 3.1 | Hero | Yes, wrong copy | **REPLACE** | Live copy is "For businesses ready to operate in their prime state". CTA is `GET IN TOUCH` → WhatsApp; spec wants two buttons, neither to WhatsApp. |
| 3.2 | Proof bar | Yes, wrong place | **MOVE** | Logo marquee is buried at line 200 inside the black section. Must sit directly under the hero. Needs the two publication links and rounded corners on row two. |
| 3.3 | Results | Yes, wrong figures | **REPLACE** | Eight cards with ranges. Spec wants six cards with single figures. Card 6 blocked (see §5). |
| 3.4 | What do we actually do | **No** | **NEW** | Five service cards plus diagnostic card. Entirely absent from the homepage. |
| 3.5 | The patterns | Yes, wrong place | **MOVE** + FIX | Currently above the stats; belongs below services. Ten patterns specified, nine present, wording differs. Typing animation replaces the static list. |
| 3.6 | One accountable party | **No** | **NEW** | Full-width dark green, pull quote, CTA. |
| 3.7 | The person behind it | **No** | **NEW** | Two columns, founder portrait. Portrait asset not supplied. |
| 3.8 | Case studies | **No** | **NEW** on homepage | Three case studies exist on `/who-we-are` only. Spec places them on the homepage too. |
| 3.9 | The four personas | Yes | **KEEP** | Cards are correct. Only downstream routing changes. |
| 3.10 | How we are paid | **No** | **NEW** | Blocked on final wording (see §5). |
| 3.11 | Close | Yes, wrong copy | **REPLACE** | "We help leaders and teams break through for good" is replaced. Background stays. |
| 3.12 | Footer | Yes | **FIX** | Link list, `/contact` fix, privacy link. |

Sections currently on the homepage with **no place in the spec order**: "We don't just understand your challenges" (line 36) and "We've sat in the system" (line 175). Neither appears in 3.1–3.12. I have tagged them **DELETE** pending your confirmation, since deleting live copy is not something I want to infer.

---

## 3. Component inventory

| Component | Tag | Note |
|---|---|---|
| `Navbar.tsx` | **REPLACE** | Old WordPress IA. Needs three dropdowns, six top-level items, `TALK TO US` button. Mobile dropdown is a non-interactive `<div>`, not a disclosure. |
| `Footer.tsx` | **FIX** | Links point at old routes. Social icons are `href="#"`. Needs privacy link. |
| `DiagnosticApp.tsx` | **MOVE** + FIX | 642 lines, scoring inline. Extract to `src/lib/diagnostic/scoring.ts`. Contains the em dash at line 487. |
| `Service1–5*.tsx` | **MOVE** | Content is good and largely matches spec 4.1–4.5. Each moves behind its own route segment. |
| `ServiceTabs.tsx` | **DELETE** | Spec 4 says the parent page is "a copy of the services section from the home page", i.e. cards, not tabs. Tabs also hide four of five services from crawlers. |
| `CountUp.tsx`, `FadeUp.tsx` | **KEEP** | Match spec 8.3. Neither respects `prefers-reduced-motion` yet — FIX. |
| `WhatsappButton.tsx` | **KEEP** | Spec 2.2 says it stays exactly as it is. |

---

## 4. Cross-cutting findings

**4.1 Domain order is wrong in the diagnostic.** `DiagnosticApp.tsx:15` has `["founder", "commercial", "process", "tech", "people", "data"]`. Spec 7.1 and the deep docx §2 both order them founder, process, commercial, data, people, technology. This is not cosmetic: both instruments break ties by domain order, so the wrong order returns the wrong constraint whenever two domains tie. Fix before extracting the shared scoring module.

**4.2 Off-palette colours throughout.** The approved palette is five values (`#013325`, `#00d76d`, `#009f50`, `#000000`, `#ffffff`), confirmed against the swatch image in the spec. The homepage uses `#4FB968`, `#093524`, `#123e2d`, `#21533e`, `#164b36`, `#21352b` — none are in it. `globals.css` defines only `--color-primary: #009F50`. The mockups add `#af8943` gold, `#efe7d8` sand and `#f7f9f8` paper, which Iram's annotations endorse. Proposal: define the full token set in `@theme` and remove every hardcoded hex.

**4.3 No backend exists.** No `route.ts` anywhere, no `zod`, `resend` or Supabase client in `package.json`, no `.env.example`. The contact form's submit button is `type="button"` with no handler, so it silently does nothing today. All of Step 3 is greenfield.

**4.4 No test setup.** No runner, no config, no test files. Step 2 requires unit-tested scoring, so a runner needs adding (Vitest is the lightest fit here).

**4.5 House-rule violations found.** One em dash, `DiagnosticApp.tsx:487`. Zero exclamation marks. One American spelling in prose, `who-we-are/page.tsx:71` (`behavior`), plus one in `what-we-do/page.tsx:215`. One `AED` string, `Service1ClarityAudit.tsx:53`, and it is the correct audit floor. Spec 2.5 typos still live: `for-corporate-owners/page.tsx:50` ("2-12 week rest") and `page.tsx:67` (trailing full stop). "intergrated", "SME's" and "stretched. misaligned" were already fixed in this repo, so 2.5 is partly done.

One thing the lint script must handle: `behavior` also appears three times as the DOM `scrollTo({ behavior })` option, which is a Web API and must not be flagged. The check has to read JSX text nodes, not raw source, or it will fail the build on correct code.

**4.6 Spec §11 defects mostly do not apply here.** 11.2 (case studies two and three not rendering) and 11.4 (patterns list formatting) describe the live WordPress site. In this repo all three case studies render, and the patterns list is deliberate markup. 11.1 (mid-word heading breaks) and 11.3 (carousel clipping) are also WordPress artefacts, since neither a `word-break` rule nor a carousel exists in the React code. Treat §11 as a description of what not to reproduce, rather than a bug list against this repo. Worth confirming you agree before I close them out.

---

## 5. Blocked on client copy

To go in `src/content/` with `TODO(client)` markers and tracked in `docs/PENDING-COPY.md`:

| Item | Spec § | Blocks |
|---|---|---|
| Eighteen constraint commentary blocks (6 × narrative, 6 × three checks, 6 × recommendation) | 7.2, deep 8.4 | Report email, both diagnostics |
| Result card 6 figure — **yours to supply** | 3.3, 10 #4 | Homepage results band |
| Result cards 4 and 5 confirmation against master table | 3.3, 10 #4 | Homepage results band |
| Master results table sign-off (operational waste 40–60% vs 10–40% is a direct contradiction) | 9, 10 #5 | Homepage, About, case studies |
| Contingent fee wording | 3.10, 10 #3 | Homepage 3.10 |
| Team names and photographs | 6.3, 10 #2 | About team layer |
| Client names cleared for publication | 3.8, 10 #1 | Case studies, logo bar |
| Privacy policy legal sign-off | 2.7 | `/privacy`, both diagnostics, all three API routes |
| Founder portrait at full resolution, plus two article URLs | 8.1, 10 #8 | Homepage 3.7, About 6.1, proof bar |
| CRM and dashboard screenshots — **yours to supply** | 8.1, 10 #8 | Technology Builds |

---

## 6. Decisions I need from you before Step 1

**6.1 The fractional route name.** The spec contradicts itself. §2.1 lists `/services/fractional-coo` under "New URLs required", but §4.2 defines the page as `/services/fractional-leadership`, and the §3.4 card button points there too. Your kickoff says `fractional-coo`. I will build `fractional-coo` and add a redirect from `fractional-leadership`, unless you prefer the reverse — the page covers COO, Chief of Staff and CFO, so `fractional-leadership` describes it more honestly. Your call, and it is a one-line change either way.

**6.2 The Chief of Staff anchor.** §4.2 says to build `#coo`, `#chief-of-staff` and `#cfo`, then eleven lines later labels the seat `#cos`. Anchors are load-bearing here because persona pages link straight into them. I propose `#chief-of-staff`.

**6.3 Persona headline conflict — spec versus mockup.** The spec (5.1–5.4) says keep the existing persona H1s verbatim, calling them the strongest writing on the site. `req/pivotprime-persona-pages.html` shows completely different H1s:

| Repo (matches live site) | Mockup |
|---|---|
| You've created something real. | You're a founder, and everything still depends on you. |
| Revenue is increasing, but margins are uneven. | You are running an SME that is growing but not settled. |
| You're carrying delivery, risk, and outcomes | You're expected to drive results, but you are alone in the execution. |
| You are responsible for the whole system. | You are accountable for the P&L, across teams, markets and moving parts. |

Your rule is spec wins, so I will keep the repo copy and take only layout from the mockup. Flagging it because the mockup copy is arguably better and Iram may have approved it later than the spec text.

**6.4 The two unspecified homepage sections** in §2 above — delete, or keep and place somewhere?

**6.5 `pivotprime.html` (386 KB) and `scratch/generate_pages.py`** were committed at the repo root. **Removed in `52e4098`.**

`generate_pages.py` was not harmless scaffolding left behind. It is a live footgun: it opens `src/app/<route>/page.tsx` in write mode for eight routes and replaces each with a "This is a placeholder for the X page content. We are currently migrating content to the new Next.js platform" stub. One `python scratch/generate_pages.py` from the repo root would have destroyed all four persona pages, About, How We Work, Insights and Contact, with no prompt and no backup beyond git. It sat one command away from a day of lost work for anyone who ran it to see what it did. Deleting it was the fix; git history retains it.

---

## 7. Proposed commit sequence

Once the above is settled, in this order, each independently buildable:

1. `chore: add copy lint, vitest, .env.example` — tooling first so everything after is checked
2. `fix: spec 2.5 typographical corrections` — small, isolated, no layout risk
3. `refactor: extract diagnostic scoring to lib, correct domain order` + tests
4. `feat: route map and permanent redirects` — `next.config.ts`, no UI change
5. `refactor: split services into child routes` — moves `Service*.tsx`, deletes `ServiceTabs`
6. `feat: design tokens` — full palette into `@theme`, strip hardcoded hex
7. `feat: navbar and footer for new IA`
8. `feat: homepage sections 3.1–3.12` — the largest piece, split across several commits
9. `feat: public 12-question diagnostic`
10. `feat: api routes, privacy page, consent gate`
11. Phase two: service pages, persona fixes, about

---

## Notes on sources

`docs/spec.md` is pending — `pandoc` was not installed on this machine, install is running now. In the meantime I worked from a plain-text conversion, plus the 48 reference images extracted from the spec's embedded media, which is where the colour swatch in §4.2 comes from.

`PivotPrime_Constraint_Diagnostic_v1.docx` is **not** in `req/`, but I already have it from the Drive export you shared earlier this session. It is the full 42-statement spec with scoring, stage weights, weighted-deficit ranking and the AI layer. I will copy it into `req/` so the repo is self-contained. `/diagnostic/deep` is therefore not blocked.
