import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { WeightedGradeCalculator } from "@/components/calculators/WeightedGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["weighted-grade-calculator"];

export const metadata = createPageMetadata({
  title: "Weighted Grade Calculator",
  description: config.description,
  path: "/weighted-grade-calculator",
  keywords: calculatorKeywords["weighted-grade-calculator"],
  languages: calculatorHreflangLanguages("weighted-grade-calculator"),
});

export default function WeightedGradeCalculatorPage() {
  return (
    <CalculatorRoute slug="weighted-grade-calculator" calculator={<WeightedGradeCalculator />} />
  );
}
