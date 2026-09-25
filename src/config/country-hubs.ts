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
}

export const countryHubs: CountryHubConfig[] = [
  {
    code: "us",
    path: "/us",
    name: "United States",
    flag: "🇺🇸",
    scaleId: "us-standard",
    description:
      "Free grade and GPA calculators for US students and teachers. US Standard 4.0 grading scale.",
    details: [
      "US high schools often report both unweighted 4.0 GPA and weighted GPA with Honors, AP, or IB bonuses. Colleges usually recast that onto their own scale.",
      "State End-of-Course exams in places such as Florida and Texas can count 20–30% of a course grade — use the EOC calculator for that, not the classroom final tool.",
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
    ],
    gradingScalePath: "/grading-scales/us",
    featuredCalculators: [
      "ez-grader",
      "gpa-calculator",
      "weighted-gpa-calculator",
      "final-grade-calculator",
      "canvas-grade-calculator",
      "eoc-grade-calculator",
    ],
    keywords: ["grade calculator usa", "us gpa calculator", "easy grader"],
    hreflang: "en-US",
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
          "There is no official UK-to-US GPA. Select the UK degree scale in a calculator for a local letter/class band, then treat any 4.0 number as an estimate only.",
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
      "gcse-grade-calculator",
      "weighted-grade-calculator",
      "final-grade-calculator",
      "letter-grade-calculator",
    ],
    keywords: ["uk grade calculator", "degree classification calculator", "uk grading scale"],
    hreflang: "en-GB",
    scaleLockNote:
      "Most featured tools on this hub lock to the UK Degree scale. The GCSE calculator locks to the 9–1 scale. Worldwide default pages keep a scale selector.",
  },
  {
    code: "ca",
    path: "/ca",
    name: "Canada",
    flag: "🇨🇦",
    scaleId: "ca-standard",
    description:
      "Canadian grade and GPA tools with the 4.0 / 4.33 letter scale used by many universities.",
    details: [
      "Canadian institutions mix percentage marks, 4.0 GPA, and 4.33 scales (A+ = 4.33). Ontario high schools also report a 100-point average that is not a GPA.",
      "Always check your faculty calendar. McGill, U of T, and UBC do not share one conversion table.",
    ],
    faqs: [
      {
        question: "Is Canadian GPA the same as US GPA?",
        answer:
          "The 4.0 idea is similar, but A+ may be 4.0 or 4.33 and percentage cutoffs differ by province and university.",
      },
    ],
    gradingScalePath: "/grading-scales/canada",
    featuredCalculators: [
      "gpa-calculator",
      "college-gpa-calculator",
      "weighted-grade-calculator",
      "cumulative-gpa-calculator",
    ],
    keywords: ["canada gpa calculator", "canadian grading scale", "grade calculator canada"],
    hreflang: "en-CA",
  },
  {
    code: "au",
    path: "/au",
    name: "Australia",
    flag: "🇦🇺",
    scaleId: "au-seven-point",
    description:
      "Australian grade tools on the 7.0 GPA scale with HD, D, C, P, and F bands.",
    details: [
      "Most Australian universities report High Distinction, Distinction, Credit, Pass, and Fail, often mapped to a 7-point GPA. ATAR is a separate rank used for school-leaver admissions — it is not a course GPA.",
      "Use the ATAR calculator for a planning estimate from scaled Year 12 scores. After you enrol, switch to the 7-point GPA tools.",
    ],
    faqs: [
      {
        question: "What is a 7.0 GPA in Australia?",
        answer:
          "A 7.0 is typically a High Distinction average. A Distinction is often 6.0. Confirm your university’s table before using the number officially.",
      },
      {
        question: "Where is the ATAR calculator?",
        answer:
          "Use the worldwide default at /atar-calculator, or the Australia page at /au/atar-calculator (Australian scale locked). Enter scaled subject scores. The result is an educational estimate, not an official UAC or QTAC ATAR.",
      },
    ],
    gradingScalePath: "/grading-scales/australia",
    featuredCalculators: [
      "atar-calculator",
      "gpa-calculator",
      "weighted-grade-calculator",
      "letter-grade-calculator",
    ],
    keywords: ["australian gpa calculator", "7 point gpa scale", "grade calculator australia"],
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
      "India grade and CGPA tools on the common 10-point university scale, plus CGPA to percentage converters (CBSE ×9.5 and more).",
    details: [
      "Most Indian universities report a 10-point CGPA (O = 10). CBSE and many UGC colleges convert with Percentage ≈ CGPA × 9.5; Anna University and some IITs/NITs use ×10.",
      "Use the CGPA to Percentage calculator for conversion formulas, then GPA tools with the India 10-point scale locked on this hub.",
    ],
    faqs: [
      {
        question: "How do I convert CGPA to percentage in India?",
        answer:
          "CBSE/UGC commonly uses Percentage = CGPA × 9.5. Some universities use ×10 or (CGPA − 0.75) × 10. Pick your formula in the CGPA to Percentage calculator and confirm your handbook.",
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
  },
  {
    code: "pk",
    path: "/pk",
    name: "Pakistan",
    flag: "🇵🇰",
    scaleId: "pk-hec",
    description:
      "Pakistan grade and GPA tools on the HEC 4.0 scale, with CGPA to percentage (×25) conversion.",
    details: [
      "HEC Absolute grading is commonly A = 85–100 (4.0). Percentage is often estimated as CGPA × 25 on a 4.0 scale.",
      "Always match your university’s published table — campus variants exist for A− / B+ points.",
    ],
    faqs: [
      {
        question: "How do I convert CGPA to percentage in Pakistan?",
        answer:
          "A common HEC-style estimate is Percentage = CGPA × 25 (for a 4.0 maximum). Use the CGPA to Percentage calculator with the Pakistan HEC formula and verify against your transcript.",
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
