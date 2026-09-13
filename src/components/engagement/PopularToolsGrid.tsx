import { mvpCalculators } from "@/config/calculators";
import { CalculatorCard } from "@/components/calculators/shared/CalculatorCard";

export function PopularToolsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {mvpCalculators.map((calculator) => (
        <CalculatorCard key={calculator.slug} calculator={calculator} variant="mini" />
      ))}
    </div>
  );
}
