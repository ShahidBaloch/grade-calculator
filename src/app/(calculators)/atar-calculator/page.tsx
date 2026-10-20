import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { AtarCalculator } from "@/components/calculators/AtarCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

const config = calculatorBySlug["atar-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle(config.path, "ATAR Calculator — Estimate Your Australian ATAR"),
  description: pageDescription(config.path, config.description),
  path: config.path,
  keywords: calculatorKeywords["atar-calculator"],
  languages: calculatorHreflangLanguages("atar-calculator"),
});

export default function AtarCalculatorPage() {
  return <CalculatorRoute slug="atar-calculator" calculator={<AtarCalculator />} />;
}
