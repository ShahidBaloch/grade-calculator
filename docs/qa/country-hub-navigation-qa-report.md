# QA Report: Country Hub & Calculator Navigation

**Product area:** GradCalc — country hubs, Calculators menu, URL persistence, geo calculator pages  
**Release focus:** USA remains default market; non-US hubs show only sensible, selectable tools; country context must not reset when switching **indexable** geo tools; generic syllabus tools canonicalize worldwide (no duplicate geo URLs in sitemap).  
**Document version:** 2026-10-26 (rev 4 — indexable geo / SEO structure)  
**Owner:** Engineering → QA handoff  
**Changelog (rev 4):** **Indexable vs offered** — dropdown lists only **indexable** geo tools (`isIndexableGeoCalculator`); hub featured cards may still show generic tools but link to **worldwide** URLs. **UK menu ≈ 1 row** (degree classification). Stale `/hub/generic-slug` URLs **308** to worldwide (Cycle K expanded). McMaster canonical **`/ca/mcmaster-gpa-to-us-gpa`**; root `/mcmaster-gpa-to-us-gpa` **308** → CA. Aligns with SEO structure audit P0 (hidden geo duplicates removed from build + sitemap).  
**Changelog (rev 2–3):** Live base URL; **308**; sessionStorage; Cycle K; live H1/canonical fixes (4716f6e).

---

## 1. Scope (what changed)

| Area | Expected behavior |
|------|-------------------|
| **Calculators dropdown** | On a country hub, menu lists **only indexable geo tools** — tools that have their own `/xx/tool-slug` in the sitemap (local grading system), not every “offered” generic syllabus copy. |
| **Hub landing cards** | Featured tools on `/{code}` may include generic tools (e.g. GCSE on UK hub); card links use **canonical** URLs (GCSE → `/gcse-grade-calculator`, not `/uk/gcse-grade-calculator`). |
| **Market rules** | Region-specific tools (e.g. India CGPA→GPA, McMaster, ATAR, UK degree class) must **not** appear under unrelated countries. |
| **URL persistence** | From `/ca/...`, switching calculators keeps the **country prefix** only when the target is **indexable** on that hub. Generic tools (final grade, average, test grade, canvas, etc. on most hubs) navigate to **worldwide** paths even from hub context. |
| **Session memory** | Choosing a non-US country stores the hub in **`sessionStorage`**. It **survives a hard refresh** and clears when the **tab/window closes**, or when the user visits `/us` explicitly (C3). Session rewrite follows the same indexable-geo rules as in-URL context. |
| **UK GPA** | US-style GPA menu items on UK context route to **UK degree classification**, not duplicate “selected” GPA rows. Direct `/uk/*gpa*` URLs **308** to degree classification. **No** indexable geo pages for UK final/GCSE/weighted (worldwide canonical). |
| **Canada GPA** | High school / weighted / raise GPA aliases **308** to **`/ca/gpa-calculator`**. McMaster lives at **`/ca/mcmaster-gpa-to-us-gpa`**; worldwide `/mcmaster-gpa-to-us-gpa` **308** → CA. |
| **Stale geo URLs** | Old nonsense URLs (e.g. `/uk/cgpa-to-gpa`) **308** to canonical. **Generic** stale URLs (e.g. `/uk/final-grade-calculator`) **308** to worldwide tool URL. |
| **Chrome / labels** | Country header shows country name on hub; Calculators header shows current tool name; breadcrumb current page is teal/semibold. |

**Out of scope for this pass:** Calculator math accuracy, grading-scale content, production CDN, analytics.

**Related engineering audit:** `SEO-STRUCTURE-AUDIT-2026-10-26-urdu.html` — P0 was ~55 indexable-but-not-sitemap geo duplicates; rev 4 code limits static geo routes + sitemap to **indexable** pairs only.

---

## 2. Test environment

| Item | Notes |
|------|--------|
| **Live (primary)** | Base URL **`https://www.gradcalc.com`** (apex `gradcalc.com` **308** → www). Prefer this for release QA. |
| **Local (optional)** | `npm run dev` — port may be **3000**, **3001**, or **3100** (confirm in terminal). Do not mix local expectations with live redirect codes. |
| **Browsers** | Chrome (required), one of Firefox / Safari / Edge (smoke). |
| **Viewports** | Desktop 1280px+; mobile 390px (iPhone-class) for nav dropdowns. |
| **Clean runs** | Use **incognito** or clear site data when testing session memory (**Cycle C**). |
| **Automated regression** | `npx vitest run tests/utils/country-path.test.ts tests/utils/country-nav.test.ts tests/utils/hub-calculator-nav.test.ts tests/seo/hub-offerings.test.ts tests/seo/geo-indexable.test.ts tests/utils/preferred-country-hub.test.ts` |

---

## 3. QA cycles overview

| Cycle | Name | Priority |
|-------|------|----------|
| **A** | Worldwide / US default | P0 |
| **B** | Country hub landing & headers | P0 |
| **C** | Session preferred country | P1 |
| **D** | Calculators menu — per country catalog | P0 |
| **E** | In-hub calculator hopping (indexable vs worldwide) | P0 |
| **F** | Negative — forbidden tools per hub | P0 |
| **G** | UK — degree class & GPA alias behavior | P0 |
| **H** | Canada — McMaster & GPA dedupe | P1 |
| **I** | India & Pakistan — CGPA suite | P1 |
| **J** | Australia & New Zealand — ATAR & GPA | P1 |
| **K** | Redirects (stale geo URLs) | P1 |
| **L** | Nav active states & breadcrumbs | P2 |
| **M** | Footer / related links rewrite | P2 |
| **N** | Accessibility smoke (keyboard + focus) | P2 |

---

## Cycle A — Worldwide / US default (P0)

| ID | Steps | Expected |
|----|--------|----------|
| A1 | Open `/` or `/gpa-calculator` | No `/us/` prefix required; tools work; Calculators menu shows **full** worldwide catalog (+ footers). |
| A2 | Open `/us` hub | United States hub; Calculators menu still **full** catalog (US is not a trimmed hub menu). |
| A3 | From worldwide page, open **Countries → United States** | Lands on `/us`; country label shows United States where applicable. |

---

## Cycle B — Country hub landing & headers (P0)

Repeat for: **Canada** `/ca`, **UK** `/uk`, **Australia** `/au`, **New Zealand** `/nz`, **India** `/in`, **Pakistan** `/pk`.

| ID | Steps | Expected |
|----|--------|----------|
| B1 | Open `/{code}` hub | Hub H1 and copy match country; no US-only assumptions in hero. Expected H1 pattern: **`{Country} grading tools`**. |
| B2 | On any `/{code}/...` calculator | Header **Countries** shows that country name (not generic “Countries” only). |
| B3 | Same page | Header **Calculators** shows **current tool name** (e.g. “Final Grade Calculator”), not only the word “Calculators”. |

---

## Cycle C — Session preferred country (P1)

Uses **`sessionStorage`** (survives refresh; clears on tab close).

| ID | Steps | Expected |
|----|--------|----------|
| C1 | Incognito → visit `/nz/gpa-calculator` → open **Final Grade** via menu or link | **`/final-grade-calculator`** (worldwide) — Final Grade is **not** indexable on NZ. |
| C1b | Incognito → visit `/ca/gpa-calculator` → open **Final Grade** | **`/ca/final-grade-calculator`** (indexable on CA). |
| C2 | After C1b, hard refresh on `/ca/final-grade-calculator` | Still CA URL; menu unchanged (**sessionStorage** survives refresh). |
| C3 | Visit `/us` hub explicitly | Preferred non-US session cleared; subsequent worldwide links use default (no `/pk/` etc.) until user picks another country again. **No automated vitest covers “visit /us clears preference” end-to-end — manual required.** |

---

## Cycle D — Calculators menu per country (P0)

Open Calculators dropdown on a calculator page for each hub. **Pass = only listed tools appear; nothing from “Must NOT appear” in Cycle F.** Counts are **indexable menu rows** (rev 4 code), not every featured hub card.

### D1 — Expected menu **includes** (spot-check)

| Hub | Must include (examples) | Approx selectable count (indexable menu) |
|-----|-------------------------|------------------------------------------|
| `/ca` | GPA, Cumulative GPA, College GPA, McMaster 12-Point→US, Final Grade, Letter Grade (weighted if listed) | **7** |
| `/uk` | **Degree Classification only** (no GCSE / final / weighted in dropdown) | **1** |
| `/au` | GPA, Cumulative GPA, **ATAR**, Letter Grade (and other indexable AU featured tools) | **5** |
| `/nz` | GPA, Cumulative GPA, Letter Grade, Weighted Grade (**no ATAR**, **no Final Grade row**) | **4** |
| `/in` | CGPA suite, India CGPA→US GPA, GPA Calculator, etc. (indexable IN set) | **6** |
| `/pk` | CGPA suite, GPA, Cumulative GPA (**no India CGPA→US GPA row**) | **6** |

> **Note:** “CGPA↔%” means **two** menu rows: `cgpa-to-percentage` and `percentage-to-cgpa`.  
> **Note:** GCSE, UK→US reference, and generic grade tools remain reachable from the **hub page cards** or worldwide menu, not necessarily from the UK Calculators dropdown.

### D2 — Menu stability

| ID | Steps | Expected |
|----|--------|----------|
| D2a | On `/uk/degree-classification-calculator`, open Calculators menu → note count | Same **1-item** catalog on any UK-prefixed indexable page |
| D2b | On `/ca/gpa-calculator`, switch to Final Grade via menu | Menu list **unchanged** (still CA indexable catalog); only current item highlight changes |

### D3 — Footer rows

| ID | Expected |
|----|----------|
| D3 | Each hub menu ends with **“All {Country} tools”** → hub path, and **“All Calculators”** → `/calculators` |

---

## Cycle E — In-hub calculator hopping (P0)

Start on hub calculator; use **Calculators** menu to switch tools.

| ID | Start URL | Click tool | Expected URL |
|----|-----------|------------|--------------|
| E1 | `/ca/gpa-calculator` | Weighted Grade Calculator | `/ca/weighted-grade-calculator` (if in CA indexable menu) or worldwide if not listed |
| E2 | `/ca/weighted-grade-calculator` | Final Grade Calculator | `/ca/final-grade-calculator` |
| E3 | `/uk/degree-classification-calculator` | *(no GCSE in menu)* | Open GCSE from **hub card** or worldwide menu → **`/gcse-grade-calculator`** (not `/uk/gcse-grade-calculator`) |
| E4 | `/pk/cgpa-calculator` | GPA Calculator | `/pk/gpa-calculator` |
| E5 | `/au/gpa-calculator` | ATAR Calculator | `/au/atar-calculator` |
| E6 | `/in/cgpa-to-gpa` | CGPA to Percentage | `/in/cgpa-to-percentage` |
| E7 | `/nz/gpa-calculator` | Final Grade Calculator | **`/final-grade-calculator`** (worldwide) |

---

## Cycle F — Negative: forbidden tools (P0)

**Method:** On each hub’s calculator page, open Calculators dropdown and search visually (or browser find). Also probe direct URLs.

### Must NOT appear in menu; direct `/{hub}/{tool}` must **308** away (or 404). Do **not** expect wrong-country H1.

| Hub | Must NOT offer / host |
|-----|------------------------|
| **CA** | ATAR, GCSE, UK degree class, UK→US reference, all CGPA tools, India CGPA→US GPA, EOC, UC/CSU, middle school GPA. **Note:** high-school / weighted / raise GPA are **aliases** → **308** to `/ca/gpa-calculator` (not separate menu rows). |
| **UK** | Separate US GPA calculator **menu rows**, CGPA suite, McMaster, ATAR, EOC, UC/CSU, middle school GPA. **Note:** `/uk/gpa-calculator`, `/uk/raise-gpa-calculator`, etc. **308** to `/uk/degree-classification-calculator`. **Note:** `/uk/final-grade-calculator`, `/uk/gcse-grade-calculator`, `/uk/weighted-grade-calculator` **308** to worldwide (no UK geo copy). |
| **AU** | McMaster, GCSE, UK tools, CGPA suite, EOC, UC/CSU, US high school / weighted / raise GPA. **Note:** `/au/average-grade-calculator` and other generic featured tools **308** worldwide if probed with `/au/` prefix. |
| **NZ** | **ATAR** (menu **and** `/nz/atar-calculator` → **308** `/au/atar-calculator`), McMaster, GCSE, UK tools, CGPA suite, US-only GPA variants, **Final Grade** as `/nz/final-grade-calculator` |
| **IN** | McMaster, ATAR, GCSE, UK tools, EOC, UC/CSU, US high school / weighted / raise GPA, **Cumulative GPA**, **College GPA** (both redirect worldwide; Cumulative not in IN menu) |
| **PK** | **India CGPA→US GPA**, McMaster, ATAR, GCSE, UK tools, US-only variants: high-school, weighted, raise, **college**, middle-school (PK **does** include Cumulative GPA in menu) |

| ID | Steps | Expected |
|----|--------|----------|
| F1 | Direct visit `/uk/cgpa-to-gpa` | **308** to `/in/cgpa-to-gpa` (final canonical, 1 hop); **no** H1 like “United Kingdom India CGPA…” |
| F2 | Direct visit `/ca/atar-calculator` | **308** to `/au/atar-calculator` |
| F3 | Direct visit `/pk/cgpa-to-gpa` | **308** to `/in/cgpa-to-gpa`; not a PK-prefixed page |
| F4 | Direct visit `/au/high-school-gpa-calculator` | **308** to worldwide `/high-school-gpa-calculator` |
| F5 | Direct visit `/nz/atar-calculator` | **308** to `/au/atar-calculator` |
| F6 | Direct visit `/in/cumulative-gpa-calculator` | **308** away (worldwide cumulative); not an IN page |
| F7 | Direct visit `/in/college-gpa-calculator` | **308** away (worldwide college); not an IN page |
| F8 | Direct visit `/uk/final-grade-calculator` | **308** to `/final-grade-calculator` (**not** 200 with UK H1) |
| F9 | Direct visit `/uk/gcse-grade-calculator` | **308** to `/gcse-grade-calculator` |
| F10 | Direct visit `/au/average-grade-calculator` | **308** to `/average-grade-calculator` |

---

## Cycle G — UK specific (P0)

| ID | Steps | Expected |
|----|--------|----------|
| G1 | On `/uk/...`, open Calculators | **One** degree-classification entry; **no** separate “GPA Calculator”, “Raise GPA”, “Cumulative GPA”, **GCSE**, **Final Grade** rows |
| G2 | From `/uk` hub, click GCSE featured card | Lands **`/gcse-grade-calculator`** (worldwide), not `/uk/gcse-grade-calculator` |
| G3 | On `/uk/degree-classification-calculator`, click each menu item | Each navigates; **only one** item appears selected |
| G4 | H1 check | H1 must not double-prefix (fixed live 2026-10-26: “UK Degree Classification Calculator”) |

---

## Cycle H — Canada specific (P1)

| ID | Steps | Expected |
|----|--------|----------|
| H1 | CA Calculators menu | **Single** GPA entry (no separate High School / Weighted / Raise GPA rows) |
| H2 | Direct `/ca/high-school-gpa-calculator` | **308** to `/ca/gpa-calculator` |
| H2b | Direct `/ca/weighted-gpa-calculator` and `/ca/raise-gpa-calculator` | **308** to `/ca/gpa-calculator` |
| H3 | `/ca/mcmaster-gpa-to-us-gpa` | Loads; title sensible (McMaster + Canada context) |
| H4 | Direct `/mcmaster-gpa-to-us-gpa` | **308** to `/ca/mcmaster-gpa-to-us-gpa` |

---

## Cycle I — India & Pakistan (P1)

| ID | Steps | Expected |
|----|--------|----------|
| I1 | `/in/cgpa-to-gpa` | India-focused copy; country = India in breadcrumb. H1 must not double “India” (fixed live 2026-10-26) |
| I2 | `/pk/cgpa-calculator` | Pakistan HEC context; **no** “India CGPA→US GPA” in PK menu |
| I3 | PK / IN menu | Both **CGPA to Percentage** and **Percentage to CGPA** present (two rows), plus SGPA→CGPA and CGPA calculator |

---

## Cycle J — Australia & New Zealand (P1)

| ID | Steps | Expected |
|----|--------|----------|
| J1 | `/au` menu | ATAR present |
| J2 | `/nz` menu | ATAR **absent** |
| J3 | From `/nz/gpa-calculator`, user needs ATAR | Must use AU path (e.g. `/au/atar-calculator`); `/nz/atar-calculator` **308** → AU |

---

## Cycle K — Redirects (P1)

Use curl (`-sI` / follow Location) or browser Network (disable cache). Live returns **308**.

| Stale URL | Expected destination (308) |
|-----------|------------------------------|
| `/uk/cgpa-to-gpa` | `/in/cgpa-to-gpa` (1 hop; live 2026-10-26) |
| `/uk/gpa-calculator` | `/uk/degree-classification-calculator` |
| `/uk/raise-gpa-calculator` | `/uk/degree-classification-calculator` |
| `/uk/final-grade-calculator` | `/final-grade-calculator` |
| `/uk/gcse-grade-calculator` | `/gcse-grade-calculator` |
| `/uk/weighted-grade-calculator` | `/weighted-grade-calculator` |
| `/ca/high-school-gpa-calculator` | `/ca/gpa-calculator` |
| `/ca/weighted-gpa-calculator` | `/ca/gpa-calculator` |
| `/ca/raise-gpa-calculator` | `/ca/gpa-calculator` |
| `/ca/atar-calculator` | `/au/atar-calculator` |
| `/mcmaster-gpa-to-us-gpa` | `/ca/mcmaster-gpa-to-us-gpa` |
| `/in/mcmaster-gpa-to-us-gpa` | `/ca/mcmaster-gpa-to-us-gpa` (or worldwide redirect chain — final URL CA) |
| `/au/gcse-grade-calculator` | `/gcse-grade-calculator` |
| `/au/average-grade-calculator` | `/average-grade-calculator` |
| `/au/high-school-gpa-calculator` | `/high-school-gpa-calculator` |
| `/nz/atar-calculator` | `/au/atar-calculator` |
| `/pk/cgpa-to-gpa` | `/in/cgpa-to-gpa` (1 hop; live 2026-10-26) |
| `/pk/atar-calculator` | `/au/atar-calculator` |
| `/in/atar-calculator` | `/au/atar-calculator` |
| `/in/cumulative-gpa-calculator` | `/cumulative-gpa-calculator` (worldwide) |
| `/in/college-gpa-calculator` | `/college-gpa-calculator` (worldwide) |

| ID | Pass criteria |
|----|----------------|
| K1 | Status **308** (301 also OK); Location matches table; single hop preferred |
| K2 | No redirect loops |
| K3 | Spot-check **F8–F10** and other forbidden geos — all **308**, wrong H1 never loads |
| K4 | Post-deploy: spot sample of former “hidden duplicate” URLs from SEO audit — **none** return **200** with hub canonical |

> Full app has many stale geo redirects in code; this table is the **minimum** release set. Merge probes with F1–F10.

---

## Cycle L — Nav active states & breadcrumbs (P2)

| ID | Steps | Expected |
|----|--------|----------|
| L1 | On `/pk/cgpa-calculator` | **Countries** nav active; **Calculators** nav active; current tool highlighted in dropdown |
| L2 | On `/pk` hub index only | Countries active; **Calculators not** active (hub index is not a calculator child) |
| L3 | Breadcrumb | Last crumb = current tool; styled as current (teal / semibold) |
| L4 | On `/final-grade-calculator` (worldwide) | Countries **not** active unless on a country URL |

---

## Cycle M — Footer & related links (P2)

| ID | Steps | Expected |
|----|--------|----------|
| M1 | On `/au/gpa-calculator`, click related calculator in sidebar/footer | Stays under `/au/` when tool is **indexable** on AU; otherwise worldwide |
| M2 | On `/grading-scales/pakistan`, click GPA/CGPA links | Routes to `/pk/...` tools |

---

## Cycle N — Accessibility smoke (P2)

| ID | Steps | Expected |
|----|--------|----------|
| N1 | Tab to Countries / Calculators triggers | Opens menu; Esc closes |
| N2 | Arrow keys / Enter in dropdown | Can reach a link and activate |
| N3 | Visible focus ring on menu items | Yes |

---

## 4. Regression matrix (quick pass)

Use **PASS / FAIL / N/A** per cell.

| Scenario | CA | UK | AU | NZ | IN | PK | US / WW |
|----------|----|----|----|----|----|----|---------|
| Hub menu ≠ full worldwide list | | | | | | | N/A (full list) |
| Switch calc keeps hub prefix (indexable only) | | | | | | | N/A |
| Generic tool from hub → worldwide URL | | | | | | | N/A |
| No foreign-only tool in menu | | | | | | | |
| H1 not “{Country} {WrongCountryTool}” / no double prefix | | | | | | | |
| Breadcrumb country correct | | | | | | | |
| Stale geo URL redirects (308) | | | | | | | |

---

## 5. Defect reporting template

```
Title: [Hub] [Calculator menu / URL / redirect] — short description
Environment: URL, browser, viewport
Steps: 1…n
Expected: (from this doc)
Actual:
Screenshot / Network HAR (for 308 cases)
Severity: P0–P2
```

### Known open defects (do not re-open as P0)

| Sev | Issue |
|-----|--------|
| ~~P2~~ FIXED (4716f6e, live 2026-10-26) | `/in/cgpa-to-gpa` H1 now “India CGPA to US 4.0 GPA” |
| ~~P2~~ FIXED (live 2026-10-26) | `/uk/degree-classification-calculator` H1 now “UK Degree Classification Calculator” |
| ~~P2~~ FIXED (live 2026-10-26) | `/cgpa-to-gpa` now **308** → `/in/cgpa-to-gpa` (single canonical) |
| P1 | SEO audit follow-ups: CGPA root vs `/in/*`/`/pk/*` overlap; weak internal links to UK→US reference (product/SEO backlog) |

---

## 6. Sign-off checklist

- [ ] Cycles **A, B, D, E, F, G** — all **P0** passed on Chrome desktop (live base)  
- [ ] Cycles **C, H, I, J, K** — **P1** passed (include **K4** after rev 4 deploy)  
- [ ] Cycles **L, M, N** — **P2** passed or waived with reason  
- [ ] Regression matrix filled  
- [ ] No open **P0** defects  
- [ ] Automated vitest suite green on release branch  
- [ ] Critical redirects retested **3×** (cache-busted) with stable 308  

**QA sign-off:** _______________  **Date:** _______________  
**Product sign-off:** _______________  **Date:** _______________

---

## 7. Reference — engineering tests

Automated coverage lives in:

- `tests/seo/hub-offerings.test.ts` — forbidden tools per hub, canonical URLs  
- `tests/seo/geo-indexable.test.ts` — indexable geo vs sitemap, stale generic hub redirects  
- `tests/utils/hub-calculator-nav.test.ts` — selectable (indexable) menu slugs  
- `tests/utils/country-path.test.ts` — resolve paths, Canada chain, UK/NZ worldwide generic  
- `tests/utils/country-nav.test.ts` — nav labels, active states  
- `tests/utils/preferred-country-hub.test.ts` — session hub memory (unit; C3 visit-/us clear is manual)

QA manual cycles above intentionally overlap these tests plus UX checks automation cannot see (visual labels, keyboard, multi-browser).

## Rev 3 note (2026-10-26 live re-run, commit 4716f6e)

- Worldwide `/cgpa-to-gpa` now **308** → `/in/cgpa-to-gpa`; UK/PK CGPA→GPA aliases go straight to `/in/cgpa-to-gpa` in one hop.
- All three earlier P2 items (H1 double prefix ×2, canonical overlap) verified fixed on live.
- Extra live-confirmed aliases (308 → worldwide): `/uk/mcmaster-gpa-to-us-gpa`, `/au/mcmaster-gpa-to-us-gpa`, `/ca/gcse-grade-calculator`, `/ca/cgpa-calculator`.

## Rev 4 note (2026-10-26 — indexable geo, pre/live deploy)

- Calculators dropdown counts: CA **7**, UK **1**, AU **5**, NZ **4**, IN **6**, PK **6** (indexable menu rows).
- Direct `/uk/final-grade-calculator`, `/uk/gcse-grade-calculator`, `/au/average-grade-calculator`, etc. must **308** — re-run Cycle **K** + **F8–F10** on production after deploy.
- `/mcmaster-gpa-to-us-gpa` → **`/ca/mcmaster-gpa-to-us-gpa`**.
