import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { TestGradeCalculator } from "@/components/calculators/TestGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["test-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/test-grade-calculator", config.name),
  description: pageDescription("/test-grade-calculator", config.description),
  path: "/test-grade-calculator",
  keywords: calculatorKeywords["test-grade-calculator"],
  languages: calculatorHreflangLanguages("test-grade-calculator"),
});

export default function TestGradeCalculatorPage() {
  return <CalculatorRoute slug="test-grade-calculator" calculator={<TestGradeCalculator />} />;
}
