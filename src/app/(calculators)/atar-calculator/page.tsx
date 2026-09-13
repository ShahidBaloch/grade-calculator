import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { AtarCalculator } from "@/components/calculators/AtarCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { siteConfig } from "@/config/site";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";

const config = calculatorBySlug["atar-calculator"];

export const metadata = createPageMetadata({
  title: "ATAR Calculator — Estimate Your Australian ATAR",
  description: config.description,
  path: config.path,
  keywords: calculatorKeywords["atar-calculator"],
  languages: {
    "x-default": `${siteConfig.url}${config.path}`,
    en: `${siteConfig.url}${config.path}`,
    "en-AU": `${siteConfig.url}/au/atar-calculator`,
  },
});

export default function AtarCalculatorPage() {
  return <CalculatorRoute slug="atar-calculator" calculator={<AtarCalculator />} />;
}
