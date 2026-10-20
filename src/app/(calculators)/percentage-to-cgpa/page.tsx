import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { PercentageToCgpaCalculator } from "@/components/calculators/PercentageToCgpaCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";

const config = calculatorBySlug["percentage-to-cgpa"];

export const metadata = createPageMetadata({
  title: pageTitle("/percentage-to-cgpa", "Percentage to CGPA Calculator — India & Pakistan"),
  description: pageDescription("/percentage-to-cgpa", config.description),
  path: "/percentage-to-cgpa",
  keywords: calculatorKeywords["percentage-to-cgpa"],
  languages: calculatorHreflangLanguages("percentage-to-cgpa"),
});

export default function PercentageToCgpaPage() {
  return (
    <CalculatorRoute slug="percentage-to-cgpa" calculator={<PercentageToCgpaCalculator />} />
  );
}
