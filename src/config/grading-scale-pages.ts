import type { ScaleId } from "@/types/grading-scale";
import type { FaqItem } from "@/types/seo";

export interface GradingScalePageConfig {
  slug: string;
  path: string;
  scaleId: ScaleId;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  notes: string[];
  /** Other scales shown side by side with the main table (e.g. US 10-point vs plus/minus vs 7-point). */
  compareScaleIds?: ScaleId[];
  /** Visible FAQ list; also emitted as FAQPage JSON-LD. */
  faqs?: FaqItem[];
}

export const gradingScalePages: GradingScalePageConfig[] = [
  {
    slug: "us",
    path: "/grading-scales/us",
    scaleId: "us-standard",
    title: "US Grading Scale — A–F Letter Grades & GPA Chart",
    description:
      "US grading scale chart: A+ through F letter grades with percentage ranges and 4.0 GPA points. Covers the 10-point, plus/minus, and 7-point US grading scales used by high schools and colleges.",
    keywords: [
      "us grading scale",
      "us grading scale chart",
      "american grading scale",
      "gpa scale",
      "4.0 gpa scale",
      "letter grade scale us",
      "10 point grading scale",
      "7 point grading scale",
    ],
    intro:
      "The US grading scale uses letter grades A through F to represent academic performance. The chart below shows the most common US grading scale — the plus/minus scale (A+ through F) — with percentage bands and 4.0 GPA grade points used by most colleges and high schools. Many districts also use a plain 10-point grading scale (A 90–100%, B 80–89%, C 70–79%, D 60–69%, F below 60%) or a stricter 7-point grading scale (A from 93%, fail below 70%). The comparison table shows the same score across all three US grading scales. Exact cutoffs vary by school; always check your syllabus.",
    notes: [
      "The US plus/minus grading scale splits each letter into three bands. A+ is 97–100%, A is 93–96%, A− is 90–92%, B+ is 87–89%, B is 83–86%, B− is 80–82%, C+ is 77–79%, C is 73–76%, C− is 70–72%, D+ is 67–69%, D is 63–66%, D− is 60–62%, and F is below 60%.",
      "For federal statistics, NCES uses a four-point framework (A=4, B=3, C=2, D=1, F=0); it does not define one national plus/minus percentage table.",
      "The 10-point US grading scale is the most common: 90–100 = A, 80–89 = B, 70–79 = C, 60–69 = D, below 60 = F. It is the EZ grader's default setting.",
      "The 7-point US grading scale is stricter: A 93–100, B 85–92, C 77–84, D 70–76, F below 70. The same 92% earns a B on the 7-point scale but an A on the 10-point scale.",
      "Weighted GPA (Honors/AP/IB) adds bonus grade points above the standard 4.0 scale — typically +0.5 for Honors and +1.0 for AP or IB courses.",
    ],
    compareScaleIds: ["us-lenient", "us-standard", "us-seven-point"],
    faqs: [
      {
        question: "What is the US grading scale?",
        answer:
          "The US grading scale assigns letter grades A through F based on percentage scores. The most common US grading scale is the 10-point scale: A = 90–100%, B = 80–89%, C = 70–79%, D = 60–69%, F = below 60%. Many colleges and high schools use a plus/minus version that adds A−, B+, B−, etc. A third version — the 7-point grading scale — starts an A at 93% and fails anything below 70%.",
      },
      {
        question: "What is the grading scale for US high school?",
        answer:
          "Most US high schools use the 10-point grading scale: A 90–100%, B 80–89%, C 70–79%, D 60–69%, F below 60%. Some schools add plus/minus grades (A 93–96%, A− 90–92%, B+ 87–89%) and others use the stricter 7-point grading scale where an A starts at 93% and anything under 70% fails. Check your student handbook for which US grading scale your school uses.",
      },
      {
        question: "What is a 10-point grading scale?",
        answer:
          "The 10-point grading scale gives each US letter grade a 10-percentage-point band: A 90–100, B 80–89, C 70–79, D 60–69, F below 60. It is the most common US grading scale for high schools and colleges and the default on most grade calculators.",
      },
      {
        question: "What is a 7-point grading scale?",
        answer:
          "The 7-point grading scale is a stricter US grading scale where each letter covers a 7-point band: A 93–100, B 85–92, C 77–84, D 70–76, F below 70. A 92% earns a B on this scale instead of an A on the 10-point scale, and a 69% fails instead of earning a D.",
      },
      {
        question: "What is the 4.0 GPA scale?",
        answer:
          "The 4.0 GPA scale is the standard US grade point scale: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0. With plus/minus grades: A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0. Most US schools cap A+ at 4.0, though a few assign 4.3.",
      },
      {
        question: "Is a 93 an A or an A−?",
        answer:
          "On the US plus/minus grading scale, 93% is an A (93–96%), while 90–92% is an A−. On the plain 10-point US grading scale, any score 90% or above is an A. On the 7-point grading scale, 93% is the minimum for an A.",
      },
      {
        question: "What percentage is a passing grade in the US?",
        answer:
          "On the standard 10-point and plus/minus US grading scales, 60% or higher is passing (D− or better). On the 7-point US grading scale the pass mark rises to 70%. Many US colleges require a C (70%+) or better for a course to count toward a major or satisfy degree requirements.",
      },
      {
        question: "How does the US grading scale compare to other countries?",
        answer:
          "The US A–F letter grading scale is unique to North America. The UK uses a First/2:1/2:2/Third degree classification based on percentages above 40%. Australia uses HD/D/C/P bands (High Distinction, Distinction, Credit, Pass). Canada largely follows the same A–F letter system as the US. Use our grading scales page to compare.",
      },
    ],
  },
  {
    slug: "uk",
    path: "/grading-scales/uk",
    scaleId: "uk-degree",
    title: "UK University Grading System — Degree Classes",
    description:
      "UK university degree classifications: First (1st), Upper Second (2:1), Lower Second (2:2), Third, and Fail with percentage boundaries — not US GPA.",
    keywords: [
      "uk grading scale",
      "uk grading system",
      "uk university grading system",
      "british university grading system",
      "degree classification",
      "honours degree classification",
      "2:1 grade",
      "first class degree",
    ],
    intro:
      "UK universities classify undergraduate degrees using degree classes rather than a US-style GPA. Percentage marks map to First (70%+), 2:1 (60–69%), 2:2 (50–59%), Third (40–49%), and Fail below 40%.",
    notes: [
      "This table shows UK bands only — it does not assign an official US 4.0 GPA.",
      "Do not self-report converted GPAs (for example 2:1 → 3.7) unless the receiving institution requires it.",
      "For an illustrative US comparison only, open /uk-degree-to-us-gpa-reference.",
      "GCSE uses a separate 9–1 numeric scale — open the GCSE scale page and calculator.",
      "Your final classification usually comes from a weighted average of your module marks, with first-year marks often counting for nothing or very little and later years weighted more heavily. The exact weighting is set by each university.",
      "Many universities apply a borderline rule: an average just below a boundary (for example 68–69%) can be raised to the higher class when enough credits were earned in that class. The size of the zone and the rule differ by university.",
      "Marks above 80% are uncommon in most UK subjects because marking criteria reserve that range for exceptional work, so a 70% is a strong mark rather than an average one.",
      "Taught master's degrees use a different scheme: Distinction (usually 70%+), Merit (60–69%), Pass (50–59%) and Fail below 50%.",
    ],
    faqs: [
      {
        question: "What is the UK university grading system?",
        answer:
          "UK honours degrees are awarded in classes rather than as a GPA: First-class honours (70% and above), Upper second-class or 2:1 (60–69%), Lower second-class or 2:2 (50–59%) and Third-class honours (40–49%). Below 40% is a fail. Your class comes from a weighted average of your module marks.",
      },
      {
        question: "Is a 2:1 a good degree?",
        answer:
          "Yes. A 2:1 (60–69%) is the class most UK graduate employers and master's programmes ask for as a minimum, and it is one of the most common classes awarded. A First (70%+) is the highest class.",
      },
      {
        question: "What percentage is a First in the UK?",
        answer:
          "A First-class degree normally needs an overall weighted average of 70% or above. Some universities also award a First to a high 2:1 average when most of your final-year credits are at First level — check your university's classification rules.",
      },
      {
        question: "What is a 2:2 degree?",
        answer:
          "A 2:2, or Lower second-class honours, is an average of 50–59%. It is a pass with honours; some employers and postgraduate courses accept it, while others set a 2:1 minimum.",
      },
      {
        question: "Does UK university use GPA?",
        answer:
          "Most UK universities report degree classes and percentage marks, not a GPA. A few publish a GPA alongside the class, but there is no single national conversion to the US 4.0 scale, so use the receiving institution's or credential evaluator's table when you need one.",
      },
      {
        question: "How are UK degree classifications worked out?",
        answer:
          "Each module mark is weighted by its credits, and each year is weighted by the university's rule (often the final year counts most). The weighted average sets your class, and borderline rules may move you up if you are within a point or two of the next boundary.",
      },
    ],
  },
  {
    slug: "australia",
    path: "/grading-scales/australia",
    scaleId: "au-seven-point",
    title: "Generic Australian 7-Point Example (Illustrative)",
    description:
      "Illustrative HD, D, C, P, F bands with 7.0 GPA points — not a national standard. Compare UQ and Monash presets for institution-specific tables.",
    keywords: ["australian gpa calculator", "australia grading scale", "hd grade", "7.0 gpa scale"],
    intro:
      "Many planning examples use HD, D, C, P, and F bands mapped to a 7-point GPA. Real universities publish their own scales — UQ uses 7-point GPA, Monash uses 4-point GPA, and UNSW often emphasises WAM. Treat this page as an illustrative example only.",
    notes: [
      "Grade points are not universal across Australian institutions.",
      "UQ publishes a 7-point scale — see the UQ grading scale reference page.",
      "Monash uses a 4-point GPA (maximum 4.0) — see the Monash grading scale reference page.",
      "ATAR is a separate measure for school leavers entering university.",
      "Do not use AU GPA × 4/7 as an official US GPA conversion.",
      "ATAR is a Year 12 rank — do not convert ATAR to GPA or UK classifications.",
    ],
  },
  {
    slug: "australia-uq",
    path: "/grading-scales/australia-uq",
    scaleId: "au-uq-seven-point",
    title: "University of Queensland (UQ) — 7-Point GPA",
    description:
      "UQ numeric grades 1–7 (HD through marginal fail) with illustrative percentage planning bands. Course cut-offs can vary — confirm on my.UQ.",
    keywords: ["uq gpa scale", "uq grading scale", "7 point gpa uq"],
    intro:
      "The University of Queensland publishes a 7-point GPA scale for coursework grades. UQ notes that other institutions use different grading scales and GPA calculation methods — always read your own handbook.",
    notes: [
      "UQ GPA uses the numeric course grade (1–7). Grades 3, 2, and 1 are fails/marginal fails — not GPA 0. Non-graded fail (N) is treated as grade 2 when a GPA must be calculated.",
      "Illustrative percentage bands are for planning only; subject cut-offs can differ.",
      "Monash and other universities are not on this 7-point table.",
    ],
  },
  {
    slug: "australia-monash",
    path: "/grading-scales/australia-monash",
    scaleId: "au-monash-four-point",
    title: "Monash University — 4-Point GPA",
    description:
      "Monash HD/D/C/P/NP/F/HF/WF grade points on a 4-point GPA scale (maximum 4.0), per Monash's published GPA methodology.",
    keywords: ["monash gpa scale", "monash grading scale", "monash 4 point gpa", "monash gpa calculator", "monash hd grade"],
    intro:
      "Monash University calculates GPA on a 4-point grading scale with 4.0 as the maximum. This is not the same as the 7-point model used at universities such as UQ.",
    notes: [
      "Near Pass = 0.7, Fail and Hurdle Fail = 0.3, Withdrawn Fail = 0.0 — enter the transcript code (NP, F, HF, WF).",
      "Monash weights grade points by unit credit points in official GPA calculations.",
      "Select this preset on the /au GPA calculator pages when estimating Monash coursework.",
      "The percentage bands are HD 80–100, D 70–79, C 60–69 and P 50–59; a Near Pass covers 45–49 and a Fail is below 45.",
      "Monash's GPA is a credit-weighted average: multiply each unit's grade points by its credit points, add them up, and divide by the total credit points attempted.",
      "Monash also reports a weighted average mark (WAM) for some honours and scholarship decisions. WAM uses your percentage marks, not grade points, so the two numbers measure different things.",
    ],
    faqs: [
      {
        question: "What is a HD at Monash?",
        answer:
          "HD stands for High Distinction, the top grade at Monash. It covers marks from 80 to 100 and is worth 4.0 grade points in the Monash GPA.",
      },
      {
        question: "What is a good GPA at Monash?",
        answer:
          "Because Monash uses a 4-point scale, a 3.0 means you averaged a Distinction and is usually considered strong. Honours entry and scholarships often look for a credit-weighted average around Distinction level; check your faculty's requirement.",
      },
      {
        question: "How do I calculate my Monash GPA?",
        answer:
          "For each unit, multiply the grade points (HD 4, D 3, C 2, P 1, NP 0.7, F 0.3) by the unit's credit points. Add the results and divide by the total credit points. A standard 6-credit-point unit counts the same as any other 6-point unit.",
      },
      {
        question: "Does a fail count in my Monash GPA?",
        answer:
          "Yes. A Fail or Hurdle Fail still adds 0.3 grade points and its credit points, and a Withdrawn Fail adds 0, so failed units pull your GPA down.",
      },
      {
        question: "Is the Monash GPA the same as the UQ GPA?",
        answer:
          "No. Monash uses a 4-point scale (maximum 4.0) while UQ uses a 7-point scale (maximum 7). Compare the grade letters rather than the numbers.",
      },
    ],
  },
  {
    slug: "canada",
    path: "/grading-scales/canada",
    scaleId: "ca-standard",
    title: "Canada Grading Scale — Percentage to 4.0 GPA (Example)",
    description:
      "Example Canadian letter bands and 4.0 GPA points for planning — not a single national standard used at every university.",
    keywords: ["canadian grading scale", "canada gpa scale", "letter grade canada"],
    intro:
      "This chart shows one illustrative way to map percentage marks to letter grades and 4.0 GPA points. Canadian universities do not share one official percentage-to-GPA conversion — UBC tells students to use the evaluating body's scale when converting for admissions, and Waterloo, Guelph, McGill, and others publish their own tables.",
    notes: [
      "Treat this chart as a planning preset, not a “standard Canadian conversion.”",
      "Quebec CEGEP and some programs may use different scales.",
      "McMaster uses a separate 12-point GPA — use /mcmaster-gpa-to-us-gpa with McMaster's lookup, not 12 ÷ 3.",
      "If your transcript awards A+ = 4.33 quality points, open the Canada 4.33 reference page.",
    ],
  },
  {
    slug: "canada-433",
    path: "/grading-scales/canada-433",
    scaleId: "ca-four-three-three",
    title: "Illustrative Canadian Preset (A+ = 4.33 GPA)",
    description:
      "Example 4.33 GPA chart where A+ earns 4.33 quality points, with percentage bands. Used at some universities, not universal across Canada.",
    keywords: ["canada 4.33 gpa", "canadian a+ 4.33", "4.3 gpa scale canada", "a+ 4.33"],
    intro:
      "Several Canadian universities record A+ as 4.33 quality points on a 4.33-cap scale. That is still institution-specific — identical percentage cutoffs are not guaranteed for every program or admissions conversion.",
    notes: [
      "Use this preset when your faculty calendar lists A+ = 4.33.",
      "Ontario and other provinces may still use A+ = 4.0 on a 4.0 scale — use the illustrative 4.0-cap preset instead.",
      "For US or international applications, follow the receiving institution's or credential evaluator's table.",
      "Examples on GradCalc: SFU and Toronto Metropolitan University both record A+ as 4.33, while Queen's and Concordia use a 4.3 cap. Each school's own calculator page shows its exact table.",
      "On a 4.33 scale, A is 4.0 and A− is 3.67, so a straight-A transcript is 4.0 rather than the maximum. Only A+ grades push a GPA above 4.0.",
      "Ontario medical schools convert every transcript to their own 4.0 scale through OMSAS, so a 4.33 GPA is re-mapped there rather than divided down.",
    ],
    faqs: [
      {
        question: "Which Canadian universities use a 4.33 GPA scale?",
        answer:
          "Simon Fraser University and Toronto Metropolitan University both give A+ 4.33 points. Queen's University and Concordia use a very similar 4.3 cap. Many others, such as McMaster (12-point), York (9-point), uOttawa (10-point) and UBC (percentages), use different scales entirely.",
      },
      {
        question: "Is a 4.33 GPA the same as a 4.0?",
        answer:
          "No. A 4.33 is the top of a 4.33 scale and means all A+ grades. On a 4.0 scale the maximum is 4.0. To compare, convert each course grade with the receiving school's table instead of scaling the overall GPA.",
      },
      {
        question: "How do I convert a 4.33 GPA to 4.0?",
        answer:
          "There is no single official formula. Admissions offices and credential evaluators convert each letter grade with their own table (for example, A+ and A both become 4.0). Dividing by 4.33 and multiplying by 4 is only a rough estimate.",
      },
      {
        question: "What is a good GPA on a 4.33 scale?",
        answer:
          "A 3.67 (A−) or higher is usually considered excellent, and a 3.0 (B) is a solid average. Scholarship and graduate-school cut-offs vary by program, so check the requirement you are aiming for.",
      },
    ],
  },
  {
    slug: "new-zealand",
    path: "/grading-scales/new-zealand",
    scaleId: "nz-nine-point",
    title: "UC Grading Scale (Canterbury) & Auckland — NZ 9-Point",
    description:
      "New Zealand university grade scale used at UC (University of Canterbury) and Auckland: A+ to C- with percentage ranges and 9-point GPA values. A+ = 9.0.",
    keywords: ["uc grading scale", "uc grade scale", "nz grading scale", "new zealand gpa", "9 point gpa scale"],
    intro:
      "New Zealand universities commonly use a 9-point GPA scale. Letter grades map to percentage bands similar to other Commonwealth systems.",
    notes: [
      "University of Canterbury (UC) and the University of Auckland use these A+ to C- passing bands and 9-point values. Failing grades differ (UC uses D and E; Auckland uses D+, D, and D-) — check your university calendar.",
      "NCEA uses a separate standards-based system for secondary school.",
      "University boundaries may vary slightly by institution.",
      "Our calculators use the NZ 9-point preset for university-style grading.",
      "On the 9-point scale, A+ (90–100%) is 9, A (85–89%) 8, A− (80–84%) 7, B+ (75–79%) 6, B (70–74%) 5, B− (65–69%) 4, C+ (60–64%) 3, C (55–59%) 2 and C− (50–54%) 1. Fails are worth 0.",
      "Your GPA is a points-weighted average: multiply each course's grade value by its points (for example 15 points), add them up, and divide by the total points attempted.",
      "Fifty percent is the usual pass mark, so a C− is the lowest passing grade.",
    ],
    faqs: [
      {
        question: "What is the grading scale at the University of Canterbury (UC)?",
        answer:
          "UC uses letter grades from A+ to E. A+ (90–100%) is worth 9 points, A 8, A− 7, B+ 6, B 5, B− 4, C+ 3, C 2 and C− 1. D and E are failing grades worth 0. Fifty percent is a pass.",
      },
      {
        question: "What is a good GPA in New Zealand?",
        answer:
          "On the 9-point scale, a GPA of 7 or above averages an A−, which is excellent. A 5 (B average) is solid, and many postgraduate programmes ask for a B average or better in your final-year courses.",
      },
      {
        question: "How do I calculate my GPA at a New Zealand university?",
        answer:
          "Multiply each course's grade value (A+ = 9 down to C− = 1, fails = 0) by its points, add the products and divide by the total points. The GPA calculator on this site does this when you choose the New Zealand scale.",
      },
      {
        question: "What is the difference between NCEA and university grades?",
        answer:
          "NCEA is the secondary-school qualification: standards are marked Not Achieved, Achieved, Merit or Excellence and earn credits. University courses are graded A+ to E with a 9-point GPA.",
      },
    ],
  },
  {
    slug: "gcse",
    path: "/grading-scales/gcse",
    scaleId: "uk-gcse",
    title: "GCSE Grading Scale (9–1) & Grade Boundaries",
    description:
      "England GCSE 9–1 percentage bands used in our educational converter, plus how they relate to the old A*–G letters.",
    keywords: ["gcse 9-1", "gcse grading scale", "gcse 9-1 grading scale", "gcse grading", "gcse 9 to 1 grade scale", "grade boundaries"],
    intro:
      "England’s GCSE 9–1 scale replaced A*–G. Grade 9 is the highest. Grade 4 is commonly a standard pass and grade 5 is a strong pass. Official boundaries move every series.",
    notes: [
      "This table is an educational default for planning, not a live awarding-body boundary set.",
      "Wales and Northern Ireland may still use different letter systems.",
      "University admissions use A-levels or equivalents, not this GCSE converter.",
      "Ofqual anchored the new scale to the old letters: the bottom of grade 7 lines up with the bottom of the old A, the bottom of grade 4 with the bottom of the old C, and the bottom of grade 1 with the bottom of the old G. Grade 9 sits above the old A* threshold.",
      "The Department for Education calls grade 4 a standard pass and grade 5 a strong pass. School performance tables report both.",
      "Grade boundaries are set by each exam board after marking, so the raw mark needed for a 4 or a 7 changes from series to series and subject to subject. Boards publish them on results day.",
      "A result below grade 1 is U (ungraded).",
    ],
    faqs: [
      {
        question: "What is a pass in GCSE?",
        answer:
          "Grade 4 is a standard pass and grade 5 is a strong pass. Students in England who do not get at least a 4 in English or maths usually keep studying that subject after 16.",
      },
      {
        question: "What is a 9 in GCSE equal to?",
        answer:
          "Grade 9 is the top grade and sits above the old A*. Grades 8 and 9 together cover roughly the old A* range, grade 7 matches the old A, and grade 4 matches the old C.",
      },
      {
        question: "What are GCSE grade boundaries?",
        answer:
          "Grade boundaries are the minimum raw marks needed for each grade in a particular exam series. Exam boards such as AQA, Edexcel and OCR set them after marking and publish them on results day, so they change every year.",
      },
      {
        question: "What is a 6 in old GCSE grades?",
        answer:
          "A 6 falls between the old C and A — it is roughly a high B. Grades 5 and 6 together cover the old B and the top of the old C.",
      },
      {
        question: "Do Wales and Northern Ireland use the 9–1 GCSE scale?",
        answer:
          "Wales kept A*–G letter grades for its own GCSEs. Northern Ireland's CCEA uses a nine-point letter scale (A* to G, with a C*). English exam boards' 9–1 GCSEs can still be taken in those countries.",
      },
    ],
  },
  {
    slug: "india",
    path: "/grading-scales/india",
    scaleId: "in-ten-point",
    title: "India 10-Point CGPA Scale",
    description:
      "Illustrative Indian 10-point CGPA bands (O to F) with percentage ranges. IIT, NIT, and state university cut-offs vary — check your institution's table.",
    keywords: ["india cgpa scale", "10 point cgpa", "ugc grading scale", "cbse cgpa"],
    intro:
      "This chart is an illustrative 10-point university preset (O–F) for planning. Letter cutoffs vary by campus. CBSE board marks and university CGPA are different systems. CBSE historically used ×9.5 on some certificates; UGC does not publish one national ×9.5 rule.",
    notes: [
      "Board marksheets and university CGPA tables don't always match, so check with your institution.",
      "Use the CGPA to Percentage calculator for ×9.5, ×10, and SPPU-style formulas.",
      "US applications may need a separate 4.0 conversion via WES or the target school.",
    ],
  },
  {
    slug: "pakistan",
    path: "/grading-scales/pakistan",
    scaleId: "pk-hec",
    title: "Pakistan HEC 4.0 Grading Scale",
    description:
      "Pakistan HEC grading scale: Uniform Semester System fractionalized grading (§13.1) on a 4.0 GPA scale with official percentage bands.",
    keywords: ["hec grading scale", "pakistan gpa scale", "hec fractionalized grading"],
    intro:
      "HEC’s Uniform Semester System policy (§13.1) publishes a grade-point range for each percentage band — for example A is 3.67–4.00 at 85% and above, and B is 2.67–3.00 at 71–74%. A CGPA is given the minimum percentage of its band (3.00 → 71%).",
    notes: [
      "The grade-point column is HEC’s published range, not a single quality point. A calculator that needs one number uses the top of that range as a planning figure.",
      "HEC notified that it stopped converting CGPA into percentage. The ×25 shortcut (CGPA × 25) is not the §13.1 rule. Use the percentage on your transcript for applications.",
      "Different Pakistani universities may map percentages to letter grades slightly differently — always cross-check with your institution’s official academic regulations or results portal.",
    ],
  },
];

export const gradingScaleBySlug = Object.fromEntries(
  gradingScalePages.map((p) => [p.slug, p]),
) as Record<string, GradingScalePageConfig>;
