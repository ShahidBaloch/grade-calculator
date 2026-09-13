import type { FaqItem } from "@/types/seo";
import { calculatorContent } from "@/config/calculator-content";
import type { CalculatorSlug } from "@/types/calculator";

const slugs: CalculatorSlug[] = [
  "ez-grader",
  "test-grade-calculator",
  "weighted-grade-calculator",
  "final-grade-calculator",
  "gpa-calculator",
  "cumulative-gpa-calculator",
];

export const siteFaqs: FaqItem[] = [
  {
    question: "Are these grade calculators free?",
    answer:
      "Yes. All calculators on GradeCalculator are 100% free with no sign-up, no ads at launch, and no data stored on our servers.",
  },
  {
    question: "Is my grade data private?",
    answer:
      "Yes. All calculations run in your browser. We do not upload your grades to any server. Optional localStorage saves your last-used calculator locally on your device.",
  },
  {
    question: "What grading scale do you use?",
    answer:
      "We default to the US Standard 4.0 scale. Your location may be detected automatically to use UK, Canadian, Australian, or New Zealand scales. You can change the scale in any calculator.",
  },
  ...slugs.flatMap((slug) => calculatorContent[slug].faqs),
];
