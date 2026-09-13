import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { LetterGradeCalculator } from "@/components/calculators/LetterGradeCalculator";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["letter-grade-calculator"];

export const metadata = createPageMetadata({
  title: "Letter Grade Calculator — Letter to Percentage",
  description: config.description,
  path: "/letter-grade-calculator",
  keywords: calculatorKeywords["letter-grade-calculator"],
});

export default function LetterGradeCalculatorPage() {
  return <CalculatorRoute slug="letter-grade-calculator" calculator={<LetterGradeCalculator />} />;
}
