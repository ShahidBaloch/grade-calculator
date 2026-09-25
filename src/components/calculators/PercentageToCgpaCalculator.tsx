"use client";

import { CgpaToPercentageCalculator } from "@/components/calculators/CgpaToPercentageCalculator";

/** SEO landing for “percentage to CGPA” with that mode as the default. */
export function PercentageToCgpaCalculator() {
  return (
    <CgpaToPercentageCalculator storageKey="percentage-to-cgpa" defaultMode="percent-to-cgpa" />
  );
}
