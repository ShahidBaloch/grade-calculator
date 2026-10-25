import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CsuGpaCalculator } from "@/components/calculators/CsuGpaCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

const config = calculatorBySlug["csu-gpa-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/csu-gpa-calculator", config.name),
  description: pageDescription("/csu-gpa-calculator", config.description),
  path: "/csu-gpa-calculator",
  keywords: calculatorKeywords["csu-gpa-calculator"],
  languages: calculatorHreflangLanguages("csu-gpa-calculator"),
});

export default function CsuGpaCalculatorPage() {
  return <CalculatorRoute slug="csu-gpa-calculator" calculator={<CsuGpaCalculator />} />;
}
