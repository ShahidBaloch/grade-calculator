import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { WeightedGpaCalculator } from "@/components/calculators/WeightedGpaCalculator";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["weighted-gpa-calculator"];

export const metadata = createPageMetadata({
  title: "Weighted GPA Calculator — Honors & AP",
  description: config.description,
  path: "/weighted-gpa-calculator",
  keywords: calculatorKeywords["weighted-gpa-calculator"],
});

export default function WeightedGpaCalculatorPage() {
  return <CalculatorRoute slug="weighted-gpa-calculator" calculator={<WeightedGpaCalculator />} />;
}
