import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CanvasGradeCalculator } from "@/components/calculators/CanvasGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["canvas-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/canvas-grade-calculator", config.name),
  description: pageDescription("/canvas-grade-calculator", config.description),
  path: "/canvas-grade-calculator",
  keywords: calculatorKeywords["canvas-grade-calculator"],
  languages: calculatorHreflangLanguages("canvas-grade-calculator"),
});
export default function CanvasGradeCalculatorPage() {
  return <CalculatorRoute slug="canvas-grade-calculator" calculator={<CanvasGradeCalculator />} />;
}//test
