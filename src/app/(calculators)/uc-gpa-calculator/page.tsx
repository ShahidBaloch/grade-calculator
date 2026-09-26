import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { UcCsuGpaCalculator } from "@/components/calculators/UcCsuGpaCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

const config = calculatorBySlug["uc-gpa-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/uc-gpa-calculator", config.name),
  description: pageDescription("/uc-gpa-calculator", config.description),
  path: "/uc-gpa-calculator",
  keywords: calculatorKeywords["uc-gpa-calculator"],
  languages: calculatorHreflangLanguages("uc-gpa-calculator"),
});

export default function UcGpaCalculatorPage() {
  return <CalculatorRoute slug="uc-gpa-calculator" calculator={<UcCsuGpaCalculator />} />;
}
