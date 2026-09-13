import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CanvasGradeCalculator } from "@/components/calculators/CanvasGradeCalculator";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["canvas-grade-calculator"];

export const metadata = createPageMetadata({
  title: "Canvas Grade Calculator — LMS Course Grade",
  description: config.description,
  path: "/canvas-grade-calculator",
  keywords: calculatorKeywords["canvas-grade-calculator"],
});

export default function CanvasGradeCalculatorPage() {
  return <CalculatorRoute slug="canvas-grade-calculator" calculator={<CanvasGradeCalculator />} />;
}
