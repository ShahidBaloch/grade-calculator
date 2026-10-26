# country-hub-navigation-qa-report — Rev SCRATCH 2026-10-26 evening

# GradCalc Country Hub QA — LIVE Scratch (HTTP)

_2026-10-26 shaam (scratch run, ~17:27–18:05 PKT, UTC+5) — LIVE https://www.gradcalc.com_

## Khulasa (Verdict)

HTTP stream: PASS (koi P0 HTTP failure nahi mili). Sitemap ke 315/315 URLs 200 dete hain. 33 probe paths × 2 hosts × 3 cycles = 198 requests — sab CONSISTENT (teeno cycles mein same status + Location). Apex gradcalc.com → www.gradcalc.com 308. Saare redirects 308 hain (301 nahi).
UI (D-UK/D-IN/E3/C1/M1) browser checks parent alag se chala raha hai — yeh report sirf curl/HTTP side hai.

## Purane P0 ka status (re-verified)

• /nz/final-grade-calculator → ab 200 (on-hub) — FIXED.
• /in/final-grade-calculator → ab 200 (on-hub) — FIXED.
• /au/college-gpa-calculator → 308 → /au/gpa-calculator (ab AU hub ke andar hi rehta hai, worldwide nahi) — FIXED/acceptable.
• /uk/gcse-grade-calculator → 308 → /gcse-grade-calculator (WW). GCSE ka canonical WW path hai aur sitemap mein /uk/gcse… nahi hai — P1 design note (UK-only product WW URL par).
• /uk/gcse → 404 (koi redirect nahi) — P2.
• /in/mcmaster-gpa-to-us-gpa → 308 → /ca/mcmaster-gpa-to-us-gpa — expected (note).
• /cgpa-to-gpa aur /pk/cgpa-to-gpa → 308 → /in/cgpa-to-gpa — PK user IN page par jata hai (P1/P2 geo note).
• /uk|/au|/pk|/us/final-grade-calculator → 308 → /final-grade-calculator (WW). /in/cumulative-gpa-calculator → WW. /uk/gpa-calculator → /uk/degree-classification-calculator. /nz/college-gpa-calculator → /nz/gpa-calculator.

## Hidden geo 200 / H1

Koi hidden geo 200 (sitemap ke bahar 200) probe set mein nahi mila; non-sitemap geo paths sab 308 ya 404. 315 sitemap pages mein har page par exactly 1 H1, koi double-prefix H1 pattern nahi mila, saare canonicals self-referencing, koi noindex nahi. Hub pages (/us…/pk) ke saare internal links sitemap URLs par hain (koi link redirect/404 par nahi).

## Redirect matrix (3× cycle)

Columns: request, first status, Location, final status, final URL, consistency.

| Request | Status | Location | Final | Final URL | 3× |
|---|---|---|---|---|---|
| gradcalc.com/au/atar-calculator | 308 | https://www.gradcalc.com/au/atar-calculator | 200 | https://www.gradcalc.com/au/atar-calculator | CONSISTENT |
| gradcalc.com/au/college-gpa-calculator | 308 | https://www.gradcalc.com/au/college-gpa-calculator | 200 | https://www.gradcalc.com/au/gpa-calculator | CONSISTENT |
| gradcalc.com/au/final-grade-calculator | 308 | https://www.gradcalc.com/au/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| gradcalc.com/au/gpa-calculator | 308 | https://www.gradcalc.com/au/gpa-calculator | 200 | https://www.gradcalc.com/au/gpa-calculator | CONSISTENT |
| gradcalc.com/au | 308 | https://www.gradcalc.com/au | 200 | https://www.gradcalc.com/au | CONSISTENT |
| gradcalc.com/ca/final-grade-calculator | 308 | https://www.gradcalc.com/ca/final-grade-calculator | 200 | https://www.gradcalc.com/ca/final-grade-calculator | CONSISTENT |
| gradcalc.com/ca/mcmaster-gpa-to-us-gpa | 308 | https://www.gradcalc.com/ca/mcmaster-gpa-to-us-gpa | 200 | https://www.gradcalc.com/ca/mcmaster-gpa-to-us-gpa | CONSISTENT |
| gradcalc.com/ca/university/omsas-gpa-calculator | 308 | https://www.gradcalc.com/ca/university/omsas-gpa-calculator | 200 | https://www.gradcalc.com/ca/university/omsas-gpa-calculator | CONSISTENT |
| gradcalc.com/ca | 308 | https://www.gradcalc.com/ca | 200 | https://www.gradcalc.com/ca | CONSISTENT |
| gradcalc.com/cgpa-to-gpa | 308 | https://www.gradcalc.com/cgpa-to-gpa | 200 | https://www.gradcalc.com/in/cgpa-to-gpa | CONSISTENT |
| gradcalc.com/final-grade-calculator | 308 | https://www.gradcalc.com/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| gradcalc.com/gcse-grade-calculator | 308 | https://www.gradcalc.com/gcse-grade-calculator | 200 | https://www.gradcalc.com/gcse-grade-calculator | CONSISTENT |
| gradcalc.com/in/cgpa-to-gpa | 308 | https://www.gradcalc.com/in/cgpa-to-gpa | 200 | https://www.gradcalc.com/in/cgpa-to-gpa | CONSISTENT |
| gradcalc.com/in/cumulative-gpa-calculator | 308 | https://www.gradcalc.com/in/cumulative-gpa-calculator | 200 | https://www.gradcalc.com/cumulative-gpa-calculator | CONSISTENT |
| gradcalc.com/in/final-grade-calculator | 308 | https://www.gradcalc.com/in/final-grade-calculator | 200 | https://www.gradcalc.com/in/final-grade-calculator | CONSISTENT |
| gradcalc.com/in/mcmaster-gpa-to-us-gpa | 308 | https://www.gradcalc.com/in/mcmaster-gpa-to-us-gpa | 200 | https://www.gradcalc.com/ca/mcmaster-gpa-to-us-gpa | CONSISTENT |
| gradcalc.com/in | 308 | https://www.gradcalc.com/in | 200 | https://www.gradcalc.com/in | CONSISTENT |
| gradcalc.com/nz/college-gpa-calculator | 308 | https://www.gradcalc.com/nz/college-gpa-calculator | 200 | https://www.gradcalc.com/nz/gpa-calculator | CONSISTENT |
| gradcalc.com/nz/final-grade-calculator | 308 | https://www.gradcalc.com/nz/final-grade-calculator | 200 | https://www.gradcalc.com/nz/final-grade-calculator | CONSISTENT |
| gradcalc.com/nz | 308 | https://www.gradcalc.com/nz | 200 | https://www.gradcalc.com/nz | CONSISTENT |
| gradcalc.com/pk/cgpa-to-gpa | 308 | https://www.gradcalc.com/pk/cgpa-to-gpa | 200 | https://www.gradcalc.com/in/cgpa-to-gpa | CONSISTENT |
| gradcalc.com/pk/final-grade-calculator | 308 | https://www.gradcalc.com/pk/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| gradcalc.com/pk | 308 | https://www.gradcalc.com/pk | 200 | https://www.gradcalc.com/pk | CONSISTENT |
| gradcalc.com/uk/degree-classification-calculator | 308 | https://www.gradcalc.com/uk/degree-classification-calculator | 200 | https://www.gradcalc.com/uk/degree-classification-calculator | CONSISTENT |
| gradcalc.com/uk/final-grade-calculator | 308 | https://www.gradcalc.com/uk/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| gradcalc.com/uk/gcse-grade-calculator | 308 | https://www.gradcalc.com/uk/gcse-grade-calculator | 200 | https://www.gradcalc.com/gcse-grade-calculator | CONSISTENT |
| gradcalc.com/uk/gcse | 308 | https://www.gradcalc.com/uk/gcse | 404 | https://www.gradcalc.com/uk/gcse | CONSISTENT |
| gradcalc.com/uk/gpa-calculator | 308 | https://www.gradcalc.com/uk/gpa-calculator | 200 | https://www.gradcalc.com/uk/degree-classification-calculator | CONSISTENT |
| gradcalc.com/uk | 308 | https://www.gradcalc.com/uk | 200 | https://www.gradcalc.com/uk | CONSISTENT |
| gradcalc.com/us/final-grade-calculator | 308 | https://www.gradcalc.com/us/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| gradcalc.com/us/gpa-calculator | 308 | https://www.gradcalc.com/us/gpa-calculator | 200 | https://www.gradcalc.com/gpa-calculator | CONSISTENT |
| gradcalc.com/us | 308 | https://www.gradcalc.com/us | 200 | https://www.gradcalc.com/us | CONSISTENT |
| gradcalc.com/ | 308 | https://www.gradcalc.com/ | 200 | https://www.gradcalc.com/ | CONSISTENT |
| www.gradcalc.com/au/atar-calculator | 200 | - | 200 | https://www.gradcalc.com/au/atar-calculator | CONSISTENT |
| www.gradcalc.com/au/college-gpa-calculator | 308 | https://www.gradcalc.com/au/gpa-calculator | 200 | https://www.gradcalc.com/au/gpa-calculator | CONSISTENT |
| www.gradcalc.com/au/final-grade-calculator | 308 | https://www.gradcalc.com/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/au/gpa-calculator | 200 | - | 200 | https://www.gradcalc.com/au/gpa-calculator | CONSISTENT |
| www.gradcalc.com/au | 200 | - | 200 | https://www.gradcalc.com/au | CONSISTENT |
| www.gradcalc.com/ca/final-grade-calculator | 200 | - | 200 | https://www.gradcalc.com/ca/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/ca/mcmaster-gpa-to-us-gpa | 200 | - | 200 | https://www.gradcalc.com/ca/mcmaster-gpa-to-us-gpa | CONSISTENT |
| www.gradcalc.com/ca/university/omsas-gpa-calculator | 200 | - | 200 | https://www.gradcalc.com/ca/university/omsas-gpa-calculator | CONSISTENT |
| www.gradcalc.com/ca | 200 | - | 200 | https://www.gradcalc.com/ca | CONSISTENT |
| www.gradcalc.com/cgpa-to-gpa | 308 | https://www.gradcalc.com/in/cgpa-to-gpa | 200 | https://www.gradcalc.com/in/cgpa-to-gpa | CONSISTENT |
| www.gradcalc.com/final-grade-calculator | 200 | - | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/gcse-grade-calculator | 200 | - | 200 | https://www.gradcalc.com/gcse-grade-calculator | CONSISTENT |
| www.gradcalc.com/in/cgpa-to-gpa | 200 | - | 200 | https://www.gradcalc.com/in/cgpa-to-gpa | CONSISTENT |
| www.gradcalc.com/in/cumulative-gpa-calculator | 308 | https://www.gradcalc.com/cumulative-gpa-calculator | 200 | https://www.gradcalc.com/cumulative-gpa-calculator | CONSISTENT |
| www.gradcalc.com/in/final-grade-calculator | 200 | - | 200 | https://www.gradcalc.com/in/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/in/mcmaster-gpa-to-us-gpa | 308 | https://www.gradcalc.com/ca/mcmaster-gpa-to-us-gpa | 200 | https://www.gradcalc.com/ca/mcmaster-gpa-to-us-gpa | CONSISTENT |
| www.gradcalc.com/in | 200 | - | 200 | https://www.gradcalc.com/in | CONSISTENT |
| www.gradcalc.com/nz/college-gpa-calculator | 308 | https://www.gradcalc.com/nz/gpa-calculator | 200 | https://www.gradcalc.com/nz/gpa-calculator | CONSISTENT |
| www.gradcalc.com/nz/final-grade-calculator | 200 | - | 200 | https://www.gradcalc.com/nz/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/nz | 200 | - | 200 | https://www.gradcalc.com/nz | CONSISTENT |
| www.gradcalc.com/pk/cgpa-to-gpa | 308 | https://www.gradcalc.com/in/cgpa-to-gpa | 200 | https://www.gradcalc.com/in/cgpa-to-gpa | CONSISTENT |
| www.gradcalc.com/pk/final-grade-calculator | 308 | https://www.gradcalc.com/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/pk | 200 | - | 200 | https://www.gradcalc.com/pk | CONSISTENT |
| www.gradcalc.com/uk/degree-classification-calculator | 200 | - | 200 | https://www.gradcalc.com/uk/degree-classification-calculator | CONSISTENT |
| www.gradcalc.com/uk/final-grade-calculator | 308 | https://www.gradcalc.com/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/uk/gcse-grade-calculator | 308 | https://www.gradcalc.com/gcse-grade-calculator | 200 | https://www.gradcalc.com/gcse-grade-calculator | CONSISTENT |
| www.gradcalc.com/uk/gcse | 404 | - | 404 | https://www.gradcalc.com/uk/gcse | CONSISTENT |
| www.gradcalc.com/uk/gpa-calculator | 308 | https://www.gradcalc.com/uk/degree-classification-calculator | 200 | https://www.gradcalc.com/uk/degree-classification-calculator | CONSISTENT |
| www.gradcalc.com/uk | 200 | - | 200 | https://www.gradcalc.com/uk | CONSISTENT |
| www.gradcalc.com/us/final-grade-calculator | 308 | https://www.gradcalc.com/final-grade-calculator | 200 | https://www.gradcalc.com/final-grade-calculator | CONSISTENT |
| www.gradcalc.com/us/gpa-calculator | 308 | https://www.gradcalc.com/gpa-calculator | 200 | https://www.gradcalc.com/gpa-calculator | CONSISTENT |
| www.gradcalc.com/us | 200 | - | 200 | https://www.gradcalc.com/us | CONSISTENT |
| www.gradcalc.com/ | 200 | - | 200 | https://www.gradcalc.com/ | CONSISTENT |

