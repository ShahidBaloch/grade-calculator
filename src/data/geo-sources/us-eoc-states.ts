import type { DroppedCandidate, OfficialSource } from "./types";

/**
 * How a state sets the End-of-Course exam's share of the course grade.
 * - fixed: the law names one percentage.
 * - minimum: the rule sets a floor; districts may weight the EOC more.
 * - range: the district picks a value inside the range.
 */
export type EocWeightRule =
  | { kind: "fixed"; percent: number }
  | { kind: "minimum"; percent: number }
  | { kind: "range"; min: number; max: number };

export interface UsEocStateRule {
  /** URL segment: /eoc-grade-calculator/{slug} */
  slug: "florida" | "georgia" | "north-carolina" | "tennessee";
  state: string;
  abbreviation: string;
  /** Name of the state test program. */
  examName: string;
  weight: EocWeightRule;
  /** Weight the calculator opens with; always the figure the rule itself names. */
  defaultWeight: number;
  /** Courses the rule names; empty when the rule only says "courses with an EOC". */
  courses: string[];
  /** The rule's own words. */
  quote: string;
  /** Citation as the state writes it. */
  citation: string;
  effective: string;
  /** Other facts from the same source, used in page copy. */
  facts: string[];
  source: OfficialSource;
}

const CHECKED = "2026-10-20";

export const usEocStateRules: UsEocStateRule[] = [
  {
    slug: "florida",
    state: "Florida",
    abbreviation: "FL",
    examName: "Florida statewide, standardized EOC assessments",
    weight: { kind: "fixed", percent: 30 },
    defaultWeight: 30,
    courses: ["Algebra I", "Geometry", "Biology I", "United States History"],
    quote:
      "A student's performance on the statewide, standardized Algebra I end-of-course (EOC) assessment constitutes 30 percent of the student's final course grade.",
    citation: "Section 1003.4282, Florida Statutes",
    effective: "2025 Florida Statutes (current text)",
    facts: [
      "The same 30 percent rule is written separately for Algebra I, Geometry, Biology I and United States History.",
      "Students must pass the Algebra I EOC (or earn a comparative score) to earn a standard high school diploma.",
      "A transfer student whose transcript already shows a final grade and credit in one of these courses keeps that grade without the EOC counting for 30 percent.",
    ],
    source: {
      publisher: "The Florida Senate",
      title: "2025 Florida Statutes § 1003.4282 — Requirements for a standard high school diploma",
      href: "https://www.flsenate.gov/Laws/Statutes/2025/1003.4282",
      checked: CHECKED,
    },
  },
  {
    slug: "georgia",
    state: "Georgia",
    abbreviation: "GA",
    examName: "Georgia Milestones End-of-Course (EOC) assessments",
    weight: { kind: "minimum", percent: 10 },
    defaultWeight: 10,
    courses: [],
    quote:
      "Beginning with the 2023-2024 school year, the numeric score on the Georgia Milestones EOC shall count for at least 10% of the student's final numeric grade in the course assessed by the Georgia Milestones EOC.",
    citation: "Georgia State Board of Education Rule 160-4-2-.13 (Statewide Passing Score)",
    effective: "Adopted July 19, 2023; effective August 9, 2023",
    facts: [
      "The Georgia Milestones EOC shall be used as the final exam in the courses it assesses.",
      "Each local board of education must set 70 as the minimum passing score for courses in grades 4–12.",
      "High schools record numeric grades for every course that earns credit.",
      "Guides written before 2023-24 often say the EOC counts 20%; the rule in force since 2023-24 sets a floor of 10%, and districts may set a higher weight.",
    ],
    source: {
      publisher: "Georgia Department of Education — State Board of Education",
      title: "Rule 160-4-2-.13 Statewide Passing Score",
      href: "https://apps.gadoe.org/sboe/SBOE%20Rules/160-4-2-.13.pdf",
      checked: CHECKED,
      readVia: "apps.gadoe.org refused connections; read from the Internet Archive copy of the same PDF",
    },
  },
  {
    slug: "north-carolina",
    state: "North Carolina",
    abbreviation: "NC",
    examName: "North Carolina End-of-Course (EOC) assessments",
    weight: { kind: "minimum", percent: 20 },
    defaultWeight: 20,
    courses: ["NC Math 1", "NC Math 3", "English II", "Biology"],
    quote:
      "North Carolina State Board of Education Policy Requirements Regarding End-of-Course Assessments (TEST-003) directs schools to use the results from all operational end-of-course (EOC) assessments as at least twenty percent (20%) of the student's final course grade.",
    citation: "North Carolina State Board of Education Policy TEST-003",
    effective: "As stated in NC DPI test specifications published April 2026",
    facts: [
      "Students enrolled for credit in a course with a required EOC must take the assessment at the end of the course.",
      "Twenty percent is a floor — a district can count the EOC for more of the grade.",
      "EOC results are also used for school and district accountability.",
    ],
    source: {
      publisher: "North Carolina Department of Public Instruction",
      title: "EOC NC Math 1 and NC Math 3 Test Specifications (April 2026)",
      href: "https://www.dpi.nc.gov/documents/accountability/testing/eoc/eoc-nc-math-1-and-nc-math-3-test-specifications",
      checked: CHECKED,
    },
  },
  {
    slug: "tennessee",
    state: "Tennessee",
    abbreviation: "TN",
    examName: "Tennessee TCAP End-of-Course examinations",
    weight: { kind: "range", min: 5, max: 15 },
    defaultWeight: 15,
    courses: [
      "English I",
      "English II",
      "Algebra I",
      "Geometry",
      "Algebra II",
      "Integrated Math I",
      "Integrated Math II",
      "Integrated Math III",
      "U.S. History",
      "Biology I",
    ],
    quote:
      "The weight of the examination on the student's final course grade in grades nine (9) through twelve (12) shall be determined by the LEA from a range of not less than five percent (5%) and not more than fifteen percent (15%).",
    citation: "Tenn. Comp. R. & Regs. 0520-01-03-.03(10)(d)",
    effective: "Amendments effective January 14, 2025 (previously 15%–25%)",
    facts: [
      "Each district (LEA) picks one weight between 5% and 15% and sets it in local board policy.",
      "If a district receives EOC scores fewer than five instructional days before the course ends, it may leave the scores out of the final average.",
      "Before January 2025 the range was 15% to 25%, so older guides overstate the EOC's weight.",
    ],
    source: {
      publisher: "Tennessee Secretary of State — Rules of the State Board of Education",
      title: "Chapter 0520-01-03 Academic and Instructional Requirements (January 2025 revision)",
      href: "https://publications.tnsosfiles.com/rules/0520/0520-01/0520-01-03.20250114.pdf",
      checked: CHECKED,
      readVia: "publications.tnsosfiles.com blocks automated requests; read from the Internet Archive copy",
    },
  },
];

export const usEocStateBySlug = Object.fromEntries(
  usEocStateRules.map((rule) => [rule.slug, rule]),
) as Record<UsEocStateRule["slug"], UsEocStateRule>;

/** Researched and not published: no verifiable statewide weight in force. */
export const droppedUsEocCandidates: DroppedCandidate[] = [
  {
    name: "Texas",
    reason:
      "Texas has no statewide rule that sets a STAAR EOC share of the course grade; weights are local.",
    checkedSources: [
      { label: "TEA STAAR resources", href: "https://tea.texas.gov/student-assessment/testing/staar/staar-resources" },
    ],
  },
  {
    name: "Virginia",
    reason:
      "Code of Virginia § 22.1-253.13:3 F 4 c (score counts at least 10%) has a contingent effective date: it starts the second full school year after the new-assessment pilot, on a date VDOE must certify (Acts 2026, ch. 102, cl. 2). The current regulation 8VAC20-132-40 E only says schools may consider the score.",
    checkedSources: [
      { label: "§ 22.1-253.13:3", href: "https://law.lis.virginia.gov/vacode/title22.1/chapter13.2/section22.1-253.13:3/" },
      { label: "Acts 2026, ch. 102 (HB 299)", href: "https://lis.virginia.gov/bill-details/20261/HB299/text/CHAP0102" },
      { label: "8VAC20-132-40", href: "https://law.lis.virginia.gov/admincode/title8/agency20/chapter132/section40/" },
    ],
  },
  {
    name: "Mississippi",
    reason:
      "The adopted graduation rule (7 Miss. Admin. Code Pt. 3, R. 36.4) and the 2025 Accountability Standards give no percentage weight; the 25% figure appears only in a proposed rule and news coverage.",
    checkedSources: [
      { label: "7 Miss. Admin. Code Pt. 3, R. 36.4", href: "https://www.law.cornell.edu/regulations/mississippi/7-Miss-Code-R-SS-3-36-4" },
      { label: "Mississippi Public School Accountability Standards, 2025", href: "https://mdek12.org/wp-content/uploads/sites/5/2026/01/Mississippi-Public-School-Accountability-Standards-2025.pdf" },
    ],
  },
  {
    name: "South Carolina",
    reason:
      "Regulation 43-262.4 (End-of-Course Tests), the usual source for the 20% figure, has been repealed; no current primary text was found.",
    checkedSources: [
      { label: "S.C. Code of Regulations, Chapter 43", href: "https://www.scstatehouse.gov/coderegs/Chapter%2043.pdf" },
    ],
  },
];
