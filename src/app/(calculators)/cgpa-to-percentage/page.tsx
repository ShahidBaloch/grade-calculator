import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CgpaToPercentageCalculator } from "@/components/calculators/CgpaToPercentageCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["cgpa-to-percentage"];

export const metadata = createPageMetadata({
  title: pageTitle("/cgpa-to-percentage", "CGPA to Percentage Calculator — India & Pakistan"),
  description: pageDescription("/cgpa-to-percentage", config.description),
  path: "/cgpa-to-percentage",
  keywords: calculatorKeywords["cgpa-to-percentage"],
  languages: calculatorHreflangLanguages("cgpa-to-percentage"),
});

export default function CgpaToPercentagePage() {
  return (
    <CalculatorRoute slug="cgpa-to-percentage" calculator={<CgpaToPercentageCalculator />} />
  );
}
