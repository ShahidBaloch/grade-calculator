# QA Report: Country Hub & Calculator Navigation

**Product area:** GradCalc — country hubs, Calculators menu, URL persistence, geo calculator pages  
**Release focus:** USA remains default market; non-US hubs show only sensible, selectable tools; country context must not reset when switching calculators.  
**Document version:** 2026-10-26  
**Owner:** Engineering → QA handoff

---

## 1. Scope (what changed)

| Area | Expected behavior |
|------|-------------------|
| **Calculators dropdown** | On a country hub, menu lists **only** tools that open a real `/xx/tool-slug` page for that market (not the full worldwide list). |
| **Market rules** | Region-specific tools (e.g. India CGPA→GPA, McMaster, ATAR, GCSE, UK degree class) must **not** appear under unrelated countries. |
| **URL persistence** | From `/ca/...`, `/uk/...`, etc., switching calculators keeps the **same country prefix** when the tool is offered on that hub. |
| **Session memory** | Choosing a non-US country (without being on a `/us` URL) can persist for the session so worldwide pages still link with that hub until refresh or explicit US hub visit. |
| **UK GPA** | US-style GPA menu items on UK context route to **UK degree classification**, not duplicate “selected” GPA rows. |
| **Canada GPA** | High school / weighted / raise GPA aliases open **one** Canadian GPA page (no duplicate menu rows). |
| **Stale geo URLs** | Old nonsense URLs (e.g. `/uk/cgpa-to-gpa`) **301** to the correct canonical URL. |
| **Chrome / labels** | Country header shows country name on hub; Calculators header shows current tool name; breadcrumb current page is teal/semibold. |

**Out of scope for this pass:** Calculator math accuracy, grading-scale content, production CDN, analytics.

---

## 2. Test environment

| Item | Notes |
|------|--------|
| **Build** | `npm run dev` (port may be **3000**, **3001**, or **3100** — confirm in terminal). |
| **Browsers** | Chrome (required), one of Firefox / Safari / Edge (smoke). |
| **Viewports** | Desktop 1280px+; mobile 390px (iPhone-class) for nav dropdowns. |
| **Clean runs** | Use **incognito** or clear site data when testing session memory (Cycle 3). |
| **Automated regression (dev)** | `npx vitest run tests/utils/country-path.test.ts tests/utils/country-nav.test.ts tests/utils/hub-calculator-nav.test.ts tests/seo/hub-offerings.test.ts tests/utils/preferred-country-hub.test.ts` |

---

## 3. QA cycles overview

| Cycle | Name | Priority |
|-------|------|----------|
| **A** | Worldwide / US default | P0 |
| **B** | Country hub landing & headers | P0 |
| **C** | Session preferred country | P1 |
| **D** | Calculators menu — per country catalog | P0 |
| **E** | In-hub calculator hopping (URL stays on hub) | P0 |
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
| B1 | Open `/{code}` hub | Hub H1 and copy match country; no US-only assumptions in hero. |
| B2 | On any `/{code}/...` calculator | Header **Countries** shows that country name (not generic “Countries” only). |
| B3 | Same page | Header **Calculators** shows **current tool name** (e.g. “Final Grade Calculator”), not only the word “Calculators”. |

---

## Cycle C — Session preferred country (P1)

| ID | Steps | Expected |
|----|--------|----------|
| C1 | Incognito → visit `/nz/gpa-calculator` → navigate to worldwide `/final-grade-calculator` via menu or link | URL becomes **`/nz/final-grade-calculator`** (NZ offered tool), not silent jump to US/worldwide-only path if NZ geo exists. |
| C2 | After C1, hard refresh on `/nz/final-grade-calculator` | Still NZ URL; menu unchanged. |
| C3 | Visit `/us` hub explicitly | Preferred non-US session cleared; subsequent worldwide links use default (no `/pk/` etc.) until user picks another country again. |

---

## Cycle D — Calculators menu per country (P0)

Open Calculators dropdown on a calculator page for each hub. **Pass = only listed tools appear; nothing from “Must NOT appear” in Cycle F.**

### D1 — Expected menu **includes** (spot-check)

| Hub | Must include (examples) |
|-----|-------------------------|
| `/ca` | GPA Calculator, Cumulative GPA, College GPA, McMaster 12-Point→US, Final Grade, Weighted Grade, Letter Grade |
| `/uk` | Degree Classification, GCSE Grade, UK Degree→US Reference, Final Grade, Weighted Grade |
| `/au` | GPA, Cumulative GPA, **ATAR**, Final Grade, Weighted Grade |
| `/nz` | GPA, Cumulative GPA, Final Grade, Weighted Grade (**no ATAR row**) |
| `/in` | CGPA Calculator, CGPA↔%, SGPA→CGPA, **India CGPA→US GPA**, GPA Calculator, Final Grade |
| `/pk` | CGPA Calculator, CGPA↔%, SGPA→CGPA, GPA, Cumulative GPA (**no India CGPA→US GPA row**) |

### D2 — Menu stability

| ID | Steps | Expected |
|----|--------|----------|
| D2a | On `/uk/gcse-grade-calculator`, open Calculators menu → note count | Same count and same items on `/uk/degree-classification-calculator` |
| D2b | On `/ca/gpa-calculator`, switch to Final Grade via menu | Menu list **unchanged** (still CA catalog); only current item highlight changes |

### D3 — Footer rows

| ID | Expected |
|----|----------|
| D3 | Each hub menu ends with **“All {Country} tools”** → hub path, and **“All Calculators”** → `/calculators` |

---

## Cycle E — In-hub calculator hopping (P0)

Start on hub calculator; use **Calculators** menu to switch tools.

| ID | Start URL | Click tool | Expected URL |
|----|-----------|------------|--------------|
| E1 | `/ca/gpa-calculator` | Weighted Grade Calculator | `/ca/weighted-grade-calculator` |
| E2 | `/ca/weighted-grade-calculator` | Final Grade Calculator | `/ca/final-grade-calculator` |
| E3 | `/uk/degree-classification-calculator` | GCSE Grade Calculator | `/uk/gcse-grade-calculator` |
| E4 | `/pk/cgpa-calculator` | GPA Calculator | `/pk/gpa-calculator` |
| E5 | `/au/gpa-calculator` | ATAR Calculator | `/au/atar-calculator` |
| E6 | `/in/cgpa-to-gpa` | CGPA to Percentage | `/in/cgpa-to-percentage` |

---

## Cycle F — Negative: forbidden tools (P0)

**Method:** On each hub’s calculator page, open Calculators dropdown and search visually (or browser find). Optionally type URL directly.

### Must NOT appear in menu AND must NOT load as `/{hub}/{tool}` (404 or 301 away)

| Hub | Must NOT offer / host |
|-----|------------------------|
| **CA** | ATAR, GCSE, UK degree class, UK→US reference, all CGPA tools, India CGPA→US GPA, EOC, UC/CSU, middle/high school GPA, weighted/raise GPA |
| **UK** | Any US GPA calculator row, CGPA suite, McMaster, ATAR, EOC, UC/CSU, middle school GPA |
| **AU** | McMaster, GCSE, UK tools, CGPA suite, EOC, UC/CSU, US high school / weighted / raise GPA |
| **NZ** | ATAR (in menu), McMaster, GCSE, UK tools, CGPA suite, US-only GPA variants |
| **IN** | McMaster, ATAR, GCSE, UK tools, EOC, UC/CSU, US high school / weighted / raise GPA |
| **PK** | **India CGPA→US GPA**, McMaster, ATAR, GCSE, UK tools, US-only GPA variants |

| ID | Steps | Expected |
|----|--------|----------|
| F1 | Direct visit `/uk/cgpa-to-gpa` | **301** to `/cgpa-to-gpa` (or final canonical); **no** H1 like “United Kingdom India CGPA…” |
| F2 | Direct visit `/ca/atar-calculator` | **301** to `/au/atar-calculator` (ATAR is Australia canonical) |
| F3 | Direct visit `/pk/cgpa-to-gpa` | **301** to `/cgpa-to-gpa`; not a PK-prefixed page |
| F4 | Direct visit `/au/high-school-gpa-calculator` | **301** to worldwide `/high-school-gpa-calculator` |

---

## Cycle G — UK specific (P0)

| ID | Steps | Expected |
|----|--------|----------|
| G1 | On `/uk/...`, open Calculators | **One** degree-classification entry; **no** separate “GPA Calculator”, “Raise GPA”, “Cumulative GPA” rows |
| G2 | From `/uk/gcse-grade-calculator`, if GPA appears in footer/related links, click | Lands **`/uk/degree-classification-calculator`**, not `/gpa-calculator` |
| G3 | On `/uk/degree-classification-calculator`, click each menu item | Each navigates; **only one** item appears selected (no multi-highlight on alias targets) |

---

## Cycle H — Canada specific (P1)

| ID | Steps | Expected |
|----|--------|----------|
| H1 | CA Calculators menu | **Single** GPA entry (no separate High School / Weighted / Raise GPA rows) |
| H2 | Direct `/ca/high-school-gpa-calculator` | **301** to `/ca/gpa-calculator` |
| H3 | `/ca/mcmaster-gpa-to-us-gpa` | Loads; title sensible (McMaster + Canada context, not another country) |

---

## Cycle I — India & Pakistan (P1)

| ID | Steps | Expected |
|----|--------|----------|
| I1 | `/in/cgpa-to-gpa` | India-focused copy; country = India in breadcrumb |
| I2 | `/pk/cgpa-calculator` | Pakistan HEC context; **no** “India CGPA→US GPA” in PK menu |
| I3 | PK menu | CGPA↔%, SGPA→CGPA, CGPA calculator present |

---

## Cycle J — Australia & New Zealand (P1)

| ID | Steps | Expected |
|----|--------|----------|
| J1 | `/au` menu | ATAR present |
| J2 | `/nz` menu | ATAR **absent** |
| J3 | From `/nz/gpa-calculator`, user needs ATAR | Must use AU/worldwide path (e.g. link to `/au/atar-calculator`), not `/nz/atar-calculator` |

---

## Cycle K — Redirects (P1)

Use browser devtools **Network** (disable cache) or curl.

| Stale URL | Expected destination (301) |
|-----------|------------------------------|
| `/uk/cgpa-to-gpa` | `/cgpa-to-gpa` |
| `/uk/gpa-calculator` | `/uk/degree-classification-calculator` |
| `/ca/high-school-gpa-calculator` | `/ca/gpa-calculator` |
| `/in/mcmaster-gpa-to-us-gpa` | `/mcmaster-gpa-to-us-gpa` |
| `/au/gcse-grade-calculator` | `/gcse-grade-calculator` |

| ID | Pass criteria |
|----|----------------|
| K1 | Status **301** (or 308); Location header matches table |
| K2 | No redirect loops |

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
| M1 | On `/au/gpa-calculator`, click related calculator in sidebar/footer | Stays under `/au/` when tool is AU-offered |
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
| Switch calc keeps hub prefix | | | | | | | N/A |
| No foreign-only tool in menu | | | | | | | |
| H1 not “{Country} {WrongCountryTool}” | | | | | | | |
| Breadcrumb country correct | | | | | | | |
| Stale geo URL redirects | | | | | | | |

---

## 5. Defect reporting template

```
Title: [Hub] [Calculator menu / URL / redirect] — short description
Environment: URL, browser, viewport
Steps: 1…n
Expected: (from this doc)
Actual:
Screenshot / Network HAR (for 301 cases)
Severity: P0–P2
```

---

## 6. Sign-off checklist

- [ ] Cycles **A, B, D, E, F, G** — all **P0** passed on Chrome desktop  
- [ ] Cycles **C, H, I, J, K** — **P1** passed  
- [ ] Cycles **L, M, N** — **P2** passed or waived with reason  
- [ ] Regression matrix filled  
- [ ] No open **P0** defects  
- [ ] Automated vitest suite green on release branch  

**QA sign-off:** _______________  **Date:** _______________  
**Product sign-off:** _______________  **Date:** _______________

---

## 7. Reference — engineering tests

Automated coverage lives in:

- `tests/seo/hub-offerings.test.ts` — forbidden tools per hub, canonical URLs  
- `tests/utils/hub-calculator-nav.test.ts` — selectable menu slugs  
- `tests/utils/country-path.test.ts` — resolve paths, Canada chain, UK CGPA  
- `tests/utils/country-nav.test.ts` — nav labels, active states  
- `tests/utils/preferred-country-hub.test.ts` — session hub memory  

QA manual cycles above intentionally overlap these tests plus UX checks automation cannot see (visual labels, keyboard, multi-browser).
