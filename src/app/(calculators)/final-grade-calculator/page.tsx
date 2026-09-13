import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { FinalGradeCalculator } from "@/components/calculators/FinalGradeCalculator";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["final-grade-calculator"];

export const metadata = createPageMetadata({
  title: "Final Grade Calculator — What Do I Need on My Final?",
  description: config.description,
  path: "/final-grade-calculator",
  keywords: calculatorKeywords["final-grade-calculator"],
});

export default function FinalGradeCalculatorPage() {
  return <CalculatorRoute slug="final-grade-calculator" calculator={<FinalGradeCalculator />} />;
}
