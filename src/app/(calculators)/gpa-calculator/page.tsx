import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { GpaCalculator } from "@/components/calculators/GpaCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["gpa-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/gpa-calculator", config.name),
  description: pageDescription("/gpa-calculator", config.description),
  path: "/gpa-calculator",
  keywords: calculatorKeywords["gpa-calculator"],
  languages: calculatorHreflangLanguages("gpa-calculator"),
});

export default function GpaCalculatorPage() {
  return <CalculatorRoute slug="gpa-calculator" calculator={<GpaCalculator />} />;
}
