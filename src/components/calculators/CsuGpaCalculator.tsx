"use client";

import { UcCsuGpaCalculator } from "@/components/calculators/UcCsuGpaCalculator";

/** /csu-gpa-calculator: same A–G engine as the UC page, opened on the Cal State rules. */
export function CsuGpaCalculator() {
  return <UcCsuGpaCalculator slug="csu-gpa-calculator" defaultSystem="csu" />;
}
