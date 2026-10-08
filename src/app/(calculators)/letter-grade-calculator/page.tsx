import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { LetterGradeCalculator } from "@/components/calculators/LetterGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["letter-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/letter-grade-calculator", config.name),
  description: pageDescription("/letter-grade-calculator", config.description),
  path: "/letter-grade-calculator",
  keywords: calculatorKeywords["letter-grade-calculator"],
  languages: calculatorHreflangLanguages("letter-grade-calculator"),
});

export default function LetterGradeCalculatorPage() {
  return <CalculatorRoute slug="letter-grade-calculator" calculator={<LetterGradeCalculator />} />;
}
