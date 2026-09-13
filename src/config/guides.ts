import type { CalculatorSlug } from "@/types/calculator";
import type { FaqItem } from "@/types/seo";

export interface GuideConfig {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  readTime: string;
  embeddedCalculator?: CalculatorSlug;
  relatedGuides: string[];
  relatedCalculators: CalculatorSlug[];
  sections: Array<{ heading: string; body: string }>;
  faqs: FaqItem[];
}

export const guides: GuideConfig[] = [
  {
    slug: "how-to-calculate-gpa",
    path: "/guides/how-to-calculate-gpa",
    title: "How to Calculate GPA",
    description:
      "Learn how to calculate semester and cumulative GPA step by step, with examples and a free GPA calculator.",
    keywords: ["how to calculate gpa", "gpa formula", "semester gpa", "college gpa"],
    readTime: "5 min read",
    embeddedCalculator: "gpa-calculator",
    relatedGuides: ["how-to-calculate-weighted-grades", "what-grade-do-i-need-on-my-final"],
    relatedCalculators: ["gpa-calculator", "cumulative-gpa-calculator"],
    sections: [
      {
        heading: "What is GPA?",
        body:
          "Grade Point Average (GPA) summarizes your academic performance on a numeric scale. In the US, an A is typically worth 4.0 points, a B is 3.0, and so on. Your semester GPA is the average of all course GPA points weighted by credit hours.",
      },
      {
        heading: "The GPA formula",
        body:
          "GPA = Total Quality Points ÷ Total Credit Hours. Quality points for each course = GPA points for that letter grade × credit hours. For example, an A (4.0) in a 3-credit course contributes 12 quality points.",
      },
      {
        heading: "Step-by-step example",
        body:
          "Suppose you earned an A in English (3 credits), B+ in Math (4 credits), and A- in History (3 credits). Convert each grade to GPA points, multiply by credits, sum the quality points (12 + 13.2 + 11.1 = 36.3), and divide by total credits (10). Your semester GPA is 3.63.",
      },
      {
        heading: "Cumulative vs semester GPA",
        body:
          "Semester GPA covers one term. Cumulative GPA combines all completed semesters. Use our cumulative GPA calculator to add your previous GPA and credits to your current semester results.",
      },
      {
        heading: "Tips for raising your GPA",
        body:
          "Focus on high-credit courses where improvement has the biggest impact. Track assignments with the weighted grade calculator so you know where you stand before finals. Plan your final exam target with the final grade calculator.",
      },
    ],
    faqs: [
      {
        question: "Is a 3.5 GPA good?",
        answer: "A 3.5 GPA is generally considered strong — between a B+ and A- average on the 4.0 scale.",
      },
      {
        question: "What's the difference between weighted and unweighted GPA?",
        answer:
          "Unweighted GPA treats all courses equally. Weighted GPA adds extra points for honors or AP classes.",
      },
    ],
  },
  {
    slug: "what-grade-do-i-need-on-my-final",
    path: "/guides/what-grade-do-i-need-on-my-final",
    title: "What Grade Do I Need on My Final?",
    description:
      "Find out what score you need on your final exam to reach your target course grade, with formula and examples.",
    keywords: [
      "what grade do i need on my final",
      "final exam calculator",
      "what do i need on my final",
    ],
    readTime: "4 min read",
    embeddedCalculator: "final-grade-calculator",
    relatedGuides: ["how-to-calculate-weighted-grades", "how-to-calculate-gpa"],
    relatedCalculators: ["final-grade-calculator", "weighted-grade-calculator"],
    sections: [
      {
        heading: "Why this matters",
        body:
          "Before finals week, students want a clear target: what score do I need to get the grade I want? The answer depends on your current course average and how much the final exam counts toward your total grade.",
      },
      {
        heading: "The formula",
        body:
          "Required Final % = (Target Grade − Current Grade × (1 − Final Weight)) ÷ Final Weight. If the final is worth 40% of your grade, then w = 0.40. Plug in your numbers and solve.",
      },
      {
        heading: "Worked example",
        body:
          "Current grade: 85%. Target: 90%. Final worth 40%. Required = (90 − 85 × 0.60) / 0.40 = (90 − 51) / 0.40 = 97.5%. You need 97.5% on the final to finish with a 90% in the course.",
      },
      {
        heading: "When it's impossible",
        body:
          "If the required score is above 100%, you cannot reach your target through the final alone — even a perfect exam won't get you there. Consider adjusting your goal or speaking with your instructor about extra credit.",
      },
      {
        heading: "Study smarter",
        body:
          "Once you know your target, prioritize study time on high-weight topics. Update your weighted grade calculator as you receive new assignment scores so your current grade stays accurate.",
      },
    ],
    faqs: [
      {
        question: "What if I already met my target?",
        answer:
          "If the calculator shows you've already met your target, you need 0% or less on the final to maintain it — meaning you're in good shape.",
      },
      {
        question: "Does the final weight include homework?",
        answer:
          "Your current grade should already reflect homework, quizzes, and midterms. The final weight is only the portion the final exam counts toward.",
      },
    ],
  },
  {
    slug: "how-to-calculate-weighted-grades",
    path: "/guides/how-to-calculate-weighted-grades",
    title: "How to Calculate Weighted Grades",
    description:
      "Learn how weighted averages work for course grades, with a step-by-step formula and free weighted grade calculator.",
    keywords: [
      "how to calculate weighted grades",
      "weighted grade calculator",
      "weighted average grade",
    ],
    readTime: "5 min read",
    embeddedCalculator: "weighted-grade-calculator",
    relatedGuides: ["what-grade-do-i-need-on-my-final", "how-to-calculate-gpa"],
    relatedCalculators: ["weighted-grade-calculator", "final-grade-calculator"],
    sections: [
      {
        heading: "What is a weighted grade?",
        body:
          "A weighted grade gives different assignments different importance. A final exam might count for 40% while homework counts for 20%. Your course average is a weighted average, not a simple mean.",
      },
      {
        heading: "The formula",
        body:
          "Weighted Average = Σ(Score × Weight) ÷ Σ(Weight). Each category contributes proportionally to its weight. If homework is 20% at 92% and the midterm is 30% at 85%, homework contributes 18.4 points and the midterm contributes 25.5 points to the numerator.",
      },
      {
        heading: "Step-by-step example",
        body:
          "Homework 92% (weight 20), Midterm 85% (weight 30), Final 88% (weight 50). Weighted avg = (92×20 + 85×30 + 88×50) ÷ 100 = (1840 + 2550 + 4400) ÷ 100 = 87.9%.",
      },
      {
        heading: "Weights not totaling 100%",
        body:
          "Some teachers use weights that don't sum to exactly 100%. The formula still works — you're dividing by the total weight used. Our calculator warns you if weights don't add to 100%.",
      },
      {
        heading: "Letter grades in weighted calculations",
        body:
          "If your syllabus uses letter grades, convert each letter to a percentage midpoint (B+ = 88%, A- = 91%) before applying weights. Our calculator handles this automatically.",
      },
    ],
    faqs: [
      {
        question: "Weighted vs unweighted — what's the difference?",
        answer:
          "Unweighted treats every assignment equally. Weighted assigns different percentages to categories like tests, homework, and participation.",
      },
      {
        question: "Can I use points instead of percentages?",
        answer:
          "Yes. If your teacher says the final is worth 200 points and homework 100 points, use point weights in our calculator.",
      },
    ],
  },
];

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<
  string,
  GuideConfig
>;
