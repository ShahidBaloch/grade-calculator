import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { GcseGradeCalculator } from "@/components/calculators/GcseGradeCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { siteConfig } from "@/config/site";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";

const config = calculatorBySlug["gcse-grade-calculator"];

export const metadata = createPageMetadata({
  title: "GCSE Grade Calculator — Percentage to 9–1",
  description: config.description,
  path: config.path,
  keywords: calculatorKeywords["gcse-grade-calculator"],
  languages: {
    "x-default": `${siteConfig.url}${config.path}`,
    en: `${siteConfig.url}${config.path}`,
    "en-GB": `${siteConfig.url}/uk/gcse-grade-calculator`,
  },
});

export default function GcseGradeCalculatorPage() {
  return <CalculatorRoute slug="gcse-grade-calculator" calculator={<GcseGradeCalculator />} />;
}
