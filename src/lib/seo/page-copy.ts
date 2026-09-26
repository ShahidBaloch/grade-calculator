/** Visible copy that makes each indexable URL a different search intent. */
export const DISTINCT_PAGE_COPY: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Grade Calculator & Easy Grader",
    description:
      "Free grade calculator and easy grader for quizzes and tests. Score by questions wrong, then open weighted course grades, finals, and GPA tools. Grading scale follows your location.",
  },
  "/weighted-grade-calculator": {
    title: "Weighted Grade Calculator — Course & Class Average",
    description:
      "Free weighted grade calculator for class, course, and gradebook averages. Change a score to see what your grade would be.",
  },
  "/test-grade-calculator": {
    title: "Test & Exam Grade Calculator",
    description:
      "Calculate test or exam grades from correct answers, wrong answers, or bonus points. See your percentage and letter grade instantly.",
  },
  "/gpa-calculator": {
    title: "GPA Calculator — Semester & Term GPA",
    description:
      "Free GPA calculator for semester and term GPA. Add courses with letter grades or percentages and credit hours on your grading scale.",
  },
  "/final-grade-calculator": {
    title: "Final Grade Calculator — Exam Score Needed",
    description:
      "Find the score you need on a final or midterm. Enter your current grade, how much the exam is worth, and the grade you want.",
  },
  "/uc-gpa-calculator": {
    title: "UC & CSU GPA Calculator — Capped A–G Average",
    description:
      "Estimate a UC or Cal State a-g GPA. UC uses 10th–11th grade with up to 8 honors points. CSU includes 12th grade and allows only 2 honors points from 10th. Not the official application GPA.",
  },
  "/middle-school-gpa-calculator": {
    title: "Middle School GPA Calculator — Junior High",
    description:
      "Free middle school and junior high GPA calculator. Enter each class letter grade. Every class counts the same — no credit hours and no Honors or AP bonus.",
  },
  "/au/gpa-calculator": {
    title: "Australia GPA Calculator — UQ 7-Point and Monash 4-Point",
    description:
      "Work out an Australian university GPA. UQ uses numeric grades 1–7. Monash uses a 4-point scale, with a fail at 0.3. This is not a US 4.0 calculator.",
  },
  "/au/cumulative-gpa-calculator": {
    title: "Australia Cumulative GPA Calculator",
    description:
      "Combine more than one term on an Australian GPA scale. Choose the UQ 7-point or Monash 4-point preset. Do not mix those points with a US 4.0.",
  },
  "/au/atar-calculator": {
    title: "ATAR Calculator — Australian Year 12 Planning Estimate",
    description:
      "Estimate an ATAR from scaled subject scores for your state. This is a planning model, not an official UAC, VTAC, QTAC, SATAC, or TISC result.",
  },
  "/ca/gpa-calculator": {
    title: "Canada GPA Calculator — University Preset",
    description:
      "Calculate a Canadian semester GPA on an illustrative 4.0-cap preset. Universities publish their own tables. McMaster’s 12-point scale uses a separate lookup.",
  },
  "/ca/college-gpa-calculator": {
    title: "Canada College GPA Calculator",
    description:
      "Average Canadian university courses by letter grade and credit weight on the Canada preset. Confirm the cut-offs in your faculty calendar.",
  },
  "/ca/cumulative-gpa-calculator": {
    title: "Canada Cumulative GPA Calculator",
    description:
      "Combine Canadian terms into one GPA. Keep the same institution’s scale for every term. Do not divide a McMaster 12-point GPA by 3.",
  },
  "/ca/letter-grade-calculator": {
    title: "Canada Letter Grade Calculator",
    description:
      "See the percentage band for a Canadian letter grade on the illustrative preset. Your university’s calendar overrides this chart.",
  },
  "/nz/gpa-calculator": {
    title: "New Zealand GPA Calculator — 9-Point Scale",
    description:
      "Calculate a New Zealand university GPA on the 9-point scale, where A+ is 9. NCEA achieved, merit, and excellence are a different system.",
  },
  "/nz/cumulative-gpa-calculator": {
    title: "New Zealand Cumulative GPA Calculator",
    description:
      "Combine New Zealand university terms on the 9-point GPA scale. Use the same grade-point table for every term.",
  },
  "/nz/letter-grade-calculator": {
    title: "New Zealand Letter Grade Calculator",
    description:
      "Look up a New Zealand university letter grade on the 9-point scale. This is not an NCEA result.",
  },
  "/uk/degree-classification-calculator": {
    title: "UK Degree Classification Calculator — First, 2:1, 2:2",
    description:
      "Turn UK module marks into a degree class: First, 2:1, 2:2, or Third. UK results are not a US 4.0 GPA.",
  },
  "/in/gpa-calculator": {
    title: "India GPA Calculator — 10-Point CGPA",
    description:
      "Average Indian course grades on a 10-point CGPA scale. For a percentage, use the CGPA-to-percentage calculator and your board’s formula.",
  },
  "/pk/gpa-calculator": {
    title: "Pakistan GPA Calculator — HEC Scale",
    description:
      "Calculate a semester GPA on the Pakistan HEC-style scale. Confirm the grade-point table in your university prospectus.",
  },
};

export function pageTitle(path: string, fallback: string): string {
  return DISTINCT_PAGE_COPY[path]?.title ?? fallback;
}

export function pageDescription(path: string, fallback: string): string {
  return DISTINCT_PAGE_COPY[path]?.description ?? fallback;
}
