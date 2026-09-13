import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { TestGradeCalculator } from "@/components/calculators/TestGradeCalculator";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["test-grade-calculator"];

export const metadata = createPageMetadata({
  title: "Test Grade Calculator",
  description: config.description,
  path: "/test-grade-calculator",
  keywords: calculatorKeywords["test-grade-calculator"],
});

export default function TestGradeCalculatorPage() {
  return <CalculatorRoute slug="test-grade-calculator" calculator={<TestGradeCalculator />} />;
}
