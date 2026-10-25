"use client";

import { PercentageToLetterCalculator } from "@/components/calculators/PercentageToLetterCalculator";
import { ScoreOutOfCalculator } from "@/components/calculators/ScoreOutOfCalculator";

/** /grade-percentage-calculator: points → grade %, then % → letter on any scale. */
export function GradePercentageCalculator() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="gp-points-heading" className="space-y-3">
        <h2 id="gp-points-heading" className="text-lg font-semibold">Points earned → grade percentage</h2>
        <ScoreOutOfCalculator initialScore={43} initialTotal={50} />
      </section>
      <section aria-labelledby="gp-letter-heading" className="space-y-3">
        <h2 id="gp-letter-heading" className="text-lg font-semibold">Grade percentage → letter grade</h2>
        <PercentageToLetterCalculator />
      </section>
    </div>
  );
}
