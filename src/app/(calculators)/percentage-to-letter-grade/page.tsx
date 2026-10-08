import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { PercentageToLetterCalculator } from "@/components/calculators/PercentageToLetterCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["percentage-to-letter-grade"];

export const metadata = createPageMetadata({
  title: pageTitle("/percentage-to-letter-grade", config.name),
  description: pageDescription("/percentage-to-letter-grade", config.description),
  path: "/percentage-to-letter-grade",
  keywords: calculatorKeywords["percentage-to-letter-grade"],
  languages: calculatorHreflangLanguages("percentage-to-letter-grade"),
});

export default function PercentageToLetterGradePage() {
  return (
    <CalculatorRoute slug="percentage-to-letter-grade" calculator={<PercentageToLetterCalculator />} />
  );
}
