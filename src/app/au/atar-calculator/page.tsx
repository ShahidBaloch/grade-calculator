import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { AtarCalculator } from "@/components/calculators/AtarCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";

const config = calculatorBySlug["atar-calculator"];
const auPath = "/au/atar-calculator";

export const metadata = createPageMetadata({
  title: "ATAR Calculator — Estimate Your Australian ATAR",
  description: config.description,
  path: auPath,
  keywords: calculatorKeywords["atar-calculator"],
  languages: calculatorHreflangLanguages("atar-calculator"),
});

export default function AtarCalculatorPage() {
  return <CalculatorRoute slug="atar-calculator" path={auPath} calculator={<AtarCalculator />} />;
}
