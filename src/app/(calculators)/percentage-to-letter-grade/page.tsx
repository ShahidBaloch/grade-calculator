import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { PercentageToLetterCalculator } from "@/components/calculators/PercentageToLetterCalculator";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["percentage-to-letter-grade"];

export const metadata = createPageMetadata({
  title: "Percentage to Letter Grade Converter",
  description: config.description,
  path: "/percentage-to-letter-grade",
  keywords: calculatorKeywords["percentage-to-letter-grade"],
});

export default function PercentageToLetterGradePage() {
  return (
    <CalculatorRoute slug="percentage-to-letter-grade" calculator={<PercentageToLetterCalculator />} />
  );
}
