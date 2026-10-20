import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { AverageGradeCalculator } from "@/components/calculators/AverageGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["average-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle(config.path, config.name),
  description: pageDescription(config.path, config.description),
  path: config.path,
  keywords: calculatorKeywords["average-grade-calculator"],
  languages: calculatorHreflangLanguages("average-grade-calculator"),
});

export default function AverageGradeCalculatorPage() {
  return <CalculatorRoute slug="average-grade-calculator" calculator={<AverageGradeCalculator />} />;
}
