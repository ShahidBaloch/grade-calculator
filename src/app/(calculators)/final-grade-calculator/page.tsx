import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { FinalGradeCalculator } from "@/components/calculators/FinalGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["final-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/final-grade-calculator", config.name),
  description: pageDescription("/final-grade-calculator", config.description),
  path: "/final-grade-calculator",
  keywords: calculatorKeywords["final-grade-calculator"],
  languages: calculatorHreflangLanguages("final-grade-calculator"),
});

export default function FinalGradeCalculatorPage() {
  return <CalculatorRoute slug="final-grade-calculator" calculator={<FinalGradeCalculator />} />;
}
