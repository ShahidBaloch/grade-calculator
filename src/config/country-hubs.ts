import type { CalculatorSlug } from "@/types/calculator";
import type { FaqItem } from "@/types/seo";
import type { ScaleId } from "@/types/grading-scale";

export interface CountryHubConfig {
  code: string;
  path: string;
  name: string;
  flag: string;
  scaleId: ScaleId;
  description: string;
  details?: string[];
  faqs?: FaqItem[];
  gradingScalePath: string;
  featuredCalculators: CalculatorSlug[];
  keywords: string[];
  hreflang: string;
  /** Overrides the default “tools lock to this hub’s scale” banner. */
  scaleLockNote?: string;
  /** Optional guides linked from the country hub page. */
  relatedGuides?: Array<{ path: string; title: string }>;
}

export const countryHubs: CountryHubConfig[] = [
  {
    code: "us",
    path: "/us",
    name: "United States",
    flag: "🇺🇸",
    scaleId: "us-standard",
    description:
      "Free grade and GPA calculators for US students and teachers. Common US 4.0 GPA scale preset.",
    details: [
      "US high schools often report both unweighted 4.0 GPA and weighted GPA with Honors, AP, or IB bonuses. Colleges usually recast that onto their own scale.",
      "Florida law can require End-of-Course (EOC) exams to count up to 30% of the course grade for specified courses. Texas uses statewide EOC assessments, but course-weight rules vary by district — check your district policy before using the EOC calculator.",
    ],
    faqs: [
      {
        question: "What GPA scale do US colleges use?",
        answer:
          "Most US colleges use an unweighted 4.0 scale. High school weighted GPAs on a 5.0 scale are often recalculated during admissions.",
      },
      {
        question: "Is Canvas the same as a weighted grade?",
        answer:
          "Canvas uses assignment groups with weights. The Canvas calculator matches that LMS layout; the weighted grade calculator is better for a simple syllabus table.",
      },
      {
        question: "How do I estimate grades in Blackboard or Moodle?",
        answer:
          "Both use weighted categories like a syllabus table. Model your category averages and weights in the weighted grade calculator, or read our LMS course grades guide for Canvas, Blackboard, Moodle, and Google Classroom.",
      },
      {
        question: "Does Google Classroom have a built-in weighted gradebook?",
        answer:
          "Classroom scoring is often per assignment without full LMS-style group weights. Total your points or use category weights from your teacher’s rubric in the weighted grade calculator.",
      },
    ],
    gradingScalePath: "/grading-scales/us",
    featuredCalculators: [
      "gpa-calculator",
      "weighted-gpa-calculator",
      "final-grade-calculator",
      "canvas-grade-calculator",
      "eoc-grade-calculator",
    ],
    relatedGuides: [
      {
        path: "/guides/lms-course-grades-explained",
        title: "LMS course grades — Canvas, Blackboard, Moodle & Google Classroom",
      },
    ],
    keywords: [
      "grade calculator usa",
      "us gpa calculator",
      "easy grader",
      "canvas grade calculator",
      "blackboard grade calculator",
    ],
    hreflang: "en-US",
  },
  {
    code: "ca",
    path: "/ca",
    name: "Canada",
    flag: "🇨🇦",
    scaleId: "ca-standard",
    description:
      "Canadian grade and GPA tools with illustrative presets — each university publishes its own tables.",
    details: [
      "Canadian institutions mix percentage marks, 4.0 GPA, 4.33 scales (A+ = 4.33), and specialty scales such as McMaster's 12-point GPA. There is no one “standard Canadian conversion” shared by UBC, Waterloo, and Guelph.",
      "This hub defaults GPA tools to an illustrative 4.0-cap preset for planning. For McMaster 12-point transcripts, use the dedicated McMaster→US lookup. Always check your faculty calendar before official submissions.",
    ],
    faqs: [
      {
        question: "Is Canadian GPA the same as US GPA?",
        answer:
          "The 4.0 idea is similar, but A+ may be 4.0 or 4.33 and percentage cutoffs differ by province and university.",
      },
      {
        question: "Which Canadian scale should I use?",
        answer:
          "This hub defaults to an illustrative Canadian 4.0-cap preset (A+ = 4.0). If your transcript uses A+ = 4.33, open /grading-scales/canada-433. McMaster 12-point GPA needs the McMaster lookup tool — not this preset.",
      },
      {
        question: "Can I use this chart for UBC or Waterloo admissions conversions?",
        answer:
          "Only as informal planning. UBC advises using the evaluating body's scale when converting percentage grades for admissions. Follow each university's published table or the receiving program's instructions.",
      },
      {
        question: "How do I convert McMaster's 12-point GPA to US 4.0?",
        answer:
          "Do not divide by 3. McMaster publishes a lookup table (for example 11 → 3.9, 10 → 3.7). Use the McMaster 12-point to US 4.0 calculator on this hub.",
      },
    ],
    gradingScalePath: "/grading-scales/canada",
    featuredCalculators: [
      "gpa-calculator",
      "mcmaster-gpa-to-us-gpa",
      "college-gpa-calculator",
      "weighted-grade-calculator",
      "cumulative-gpa-calculator",
      "final-grade-calculator",
      "letter-grade-calculator",
    ],
    keywords: ["canada gpa calculator", "canadian grading scale", "grade calculator canada"],
    hreflang: "en-CA",
    scaleLockNote:
      "GPA tools on this hub default to an illustrative Canadian 4.0-cap preset — not a national standard. Use /mcmaster-gpa-to-us-gpa for McMaster 12-point GPA and /grading-scales/canada-433 when A+ = 4.33 on your transcript.",
  },
  {
    code: "uk",
    path: "/uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    scaleId: "uk-degree",
    description:
      "UK degree classification reference and grade tools for university and GCSE-style percentage bands.",
    details: [
      "UK undergraduate results are usually First (70%+), Upper Second / 2:1 (60–69%), Lower Second / 2:2 (50–59%), and Third (40–49%). That is a classification, not a US 4.0 GPA.",
      "Use the UK degree classification calculator for First / 2:1 / 2:2 / Third, and the GCSE calculator for 9–1 percentage bands.",
    ],
    faqs: [
      {
        question: "How do I convert a UK mark to GPA?",
        answer:
          "UK degrees use classifications (First, 2:1, 2:2, Third), not an official US 4.0 GPA. Use /uk-degree-to-us-gpa-reference only for an illustrative comparison — do not self-report converted GPAs unless the receiving institution requires it.",
      },
      {
        question: "Should I put 3.7 on a US application for a 2:1?",
        answer:
          "Usually no. Report your degree class and marks as shown on your transcript unless the form explicitly asks for a US-style GPA. Harvard GSAS and Stanford Graduate Admissions both instruct applicants not to invent a 4.0 GPA when the transcript does not include one.",
      },
      {
        question: "Where is the US-style GPA calculator on this UK hub?",
        answer:
          "UK undergraduate results use degree classifications, not US 4.0 GPA. Use the degree classification calculator for First / 2:1 / 2:2 / Third. For an illustrative US comparison only, open UK Degree Class to US GPA — Approximate Reference (not for self-reporting). Site navigation from /uk keeps you on UK tools instead of the worldwide US GPA calculator.",
      },
      {
        question: "Where is the degree classification calculator?",
        answer:
          "Use the worldwide default at /degree-classification-calculator, or the UK page at /uk/degree-classification-calculator (UK scale locked). Enter module marks, credits, and Year 2 / Year 3 weights from your handbook.",
      },
    ],
    gradingScalePath: "/grading-scales/uk",
    featuredCalculators: [
      "degree-classification-calculator",
      "uk-degree-to-us-gpa-reference",
      "gcse-grade-calculator",
      "weighted-grade-calculator",
      "final-grade-calculator",
      "letter-grade-calculator",
    ],
    keywords: ["uk grade calculator", "degree classification calculator", "uk grading scale"],
    hreflang: "en-GB",
    scaleLockNote:
      "Tools on this hub lock to UK degree classification bands (not US GPA). For an illustrative US 4.0 comparison only, open /uk-degree-to-us-gpa-reference — not for self-reporting on applications.",
  },
  {
    code: "au",
    path: "/au",
    name: "Australia",
    flag: "🇦🇺",
    scaleId: "au-uq-seven-point",
    description:
      "Australian grade tools with institution-specific GPA presets — not one national scale.",
    details: [
      "Australian universities use different GPA methodologies. UQ publishes a 7-point scale; Monash uses a 4-point GPA (maximum 4.0). UNSW and others may report WAM (Weighted Average Mark) instead of GPA. Grade points are not universal across institutions.",
      "Pick your university preset in the GPA calculators on this hub, or use the generic 7-point example for illustration only. ATAR is a separate school-leaver rank — it is not a course GPA.",
      "There is no official linear Australian-to-US GPA conversion (for example AU GPA × 4/7). Use each institution's handbook or the receiving admissions office.",
    ],
    faqs: [
      {
        question: "What is a 7.0 GPA in Australia?",
        answer:
          "On UQ's 7-point scale, 7.0 is typically High Distinction. Monash uses a 4-point GPA where HD is 4.0. Always confirm your university's table — do not assume every campus uses 7-point grade points.",
      },
      {
        question: "Does Monash use the same 7-point scale as UQ?",
        answer:
          "No. Monash calculates GPA on a 4-point scale (4.0 maximum). Select the Monash preset in the GPA calculator, or read Monash's official GPA policy.",
      },
      {
        question: "Where is the ATAR calculator?",
        answer:
          "Use the worldwide default at /atar-calculator, or the Australia page at /au/atar-calculator. Enter scaled subject scores. The result is an educational estimate, not an official UAC or QTAC ATAR — and it is not a GPA or UK classification.",
      },
      {
        question: "Can I turn my ATAR into a US or university GPA on this site?",
        answer:
          "No. We do not provide ATAR → US GPA, ATAR → university GPA, or ATAR → UK degree class conversions because there is no valid direct equivalency.",
      },
    ],
    gradingScalePath: "/grading-scales/australia-uq",
    scaleLockNote:
      "GPA tools on this hub let you choose an Australian preset (generic example, UQ 7-point, or Monash 4-point). ATAR uses scaled scores, not GPA points.",
    featuredCalculators: [
      "atar-calculator",
      "gpa-calculator",
      "cumulative-gpa-calculator",
      "weighted-grade-calculator",
      "letter-grade-calculator",
    ],
    keywords: ["australian gpa calculator", "uq gpa scale", "monash gpa", "grade calculator australia"],
    hreflang: "en-AU",
  },
  {
    code: "nz",
    path: "/nz",
    name: "New Zealand",
    flag: "🇳🇿",
    scaleId: "nz-nine-point",
    description:
      "New Zealand grade tools with the 9-point GPA scale used by several universities.",
    details: [
      "NZ universities often use A+ through C- letter bands on a 9-point GPA (A+ = 9). NCEA is the secondary qualification and uses Achieved / Merit / Excellence, which is not the same as university GPA.",
      "Select the New Zealand scale inside a calculator to map percentages to local letters.",
    ],
    faqs: [
      {
        question: "Is NCEA the same as university GPA?",
        answer:
          "No. NCEA credits and endorsements are for secondary school. University GPA on this hub uses letter grades and a 9-point scale.",
      },
    ],
    gradingScalePath: "/grading-scales/new-zealand",
    featuredCalculators: [
      "gpa-calculator",
      "weighted-grade-calculator",
      "letter-grade-calculator",
      "cumulative-gpa-calculator",
    ],
    keywords: ["nz gpa calculator", "new zealand grading scale", "grade calculator nz"],
    hreflang: "en-NZ",
  },
  {
    code: "in",
    path: "/in",
    name: "India",
    flag: "🇮🇳",
    scaleId: "in-ten-point",
    description:
      "India CGPA and grade tools with an illustrative 10-point university preset — boards and campuses publish their own tables.",
    details: [
      "Many universities use a 10-point CGPA (O = 10), but letter cutoffs and quality points differ by IIT, NIT, state university, and affiliated college.",
      "CBSE board marks and university CGPA are separate systems. CBSE/UGC often uses Percentage ≈ CGPA × 9.5; Anna University and some campuses use ×10 or (CGPA − 0.75) × 10.",
      "Pick your conversion in the CGPA to Percentage calculator, then use GPA tools on this hub with the India 10-point preset locked for planning.",
    ],
    faqs: [
      {
        question: "How do I convert CGPA to percentage in India?",
        answer:
          "CBSE/UGC commonly uses Percentage = CGPA × 9.5. Some universities use ×10 or (CGPA − 0.75) × 10. Pick your formula in the CGPA to Percentage calculator and confirm your handbook.",
      },
      {
        question: "Is this the official CBSE or university table?",
        answer:
          "No. This hub uses an illustrative 10-point letter preset for calculators. Your marksheet, board circular, or university ordinance is the source of truth.",
      },
      {
        question: "Is India CGPA the same as US GPA?",
        answer:
          "No. India often uses a 10-point CGPA. US applications usually need a 4.0 GPA estimate — convert carefully and follow each university’s evaluation service.",
      },
    ],
    gradingScalePath: "/grading-scales/india",
    featuredCalculators: [
      "cgpa-to-percentage",
      "cgpa-calculator",
      "sgpa-to-cgpa",
      "percentage-to-cgpa",
      "cgpa-to-gpa",
      "gpa-calculator",
    ],
    keywords: [
      "cgpa calculator india",
      "cgpa to percentage",
      "india grade calculator",
      "10 point cgpa",
      "cbse cgpa to percentage",
      "sgpa to cgpa",
    ],
    hreflang: "en-IN",
    scaleLockNote:
      "GPA tools on this hub use an illustrative India 10-point preset (O–F). Board percentages and your campus transcript may differ — check the grading scale reference and your handbook before official use.",
  },
  {
    code: "pk",
    path: "/pk",
    name: "Pakistan",
    flag: "🇵🇰",
    scaleId: "pk-hec",
    description:
      "Pakistan grade and GPA tools on the common HEC 4.0 letter scale, with CGPA-to-percentage converters and planning estimates.",
    details: [
      "HEC’s Uniform Semester System policy (§13.1) maps fractional GPA/CGPA bands to percentage ranges — for example B = 2.67–3.00 and 71–74%, with D+ at 54–57% and D at 50–53% as the usual pass floor.",
      "For CGPA-to-percentage planning, HEC assigns the minimum percentage of the band your CGPA falls into (3.00 CGPA → 71%, not a flat ×25).",
      "Some students still use Percentage ≈ CGPA × 25 on a 4.0 scale as a quick estimate. Treat that as a shortcut unless your handbook says otherwise.",
      "Campus marks-to-grade cutoffs within these bands can differ — match your transcript legend.",
    ],
    faqs: [
      {
        question: "How do I convert CGPA to percentage in Pakistan?",
        answer:
          "Start with your university’s published equivalence table. HEC recommends fractional GPA-to-percentage bands in its semester-system guidelines. A linear ×25 estimate on a 4.0 scale is only a shortcut — use our CGPA to Percentage tool and confirm against your marksheet.",
      },
      {
        question: "Is Pakistan GPA the same as US GPA?",
        answer:
          "Both often use a 4.0 idea, but percentage cutoffs and letter bands differ. Prefer your university’s official conversion for applications abroad.",
      },
    ],
    gradingScalePath: "/grading-scales/pakistan",
    featuredCalculators: [
      "cgpa-to-percentage",
      "cgpa-calculator",
      "sgpa-to-cgpa",
      "percentage-to-cgpa",
      "gpa-calculator",
      "cumulative-gpa-calculator",
    ],
    keywords: [
      "cgpa calculator pakistan",
      "hec cgpa to percentage",
      "pakistan gpa calculator",
      "grade calculator pakistan",
    ],
    hreflang: "en-PK",
  },
];

export const countryHubByPath = Object.fromEntries(
  countryHubs.map((hub) => [hub.path, hub]),
) as Record<string, CountryHubConfig>;

export const countryCalculatorPaths = countryHubs.flatMap((hub) =>
  hub.featuredCalculators.map((slug) => `${hub.path}/${slug}`),
);
