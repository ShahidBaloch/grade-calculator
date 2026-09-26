"use client";

import { usePathname } from "next/navigation";
import { useGradingScale } from "@/hooks/useGradingScale";
import { isAustralianScaleId } from "@/lib/grading-scales/au-presets";

export function AustralianGpaNotice() {
  const pathname = usePathname();
  const { scaleId } = useGradingScale();
  const onAu = pathname?.startsWith("/au") || isAustralianScaleId(scaleId);
  if (!onAu) return null;

  return (
    <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-sm text-[var(--color-text-muted)]">
      Australian universities use different GPA or WAM systems — grade points are{" "}
      <strong className="font-medium text-[var(--color-text)]">not</strong> universal. Monash uses a{" "}
      <strong className="font-medium text-[var(--color-text)]">4.0</strong> GPA scale; UQ publishes a{" "}
      <strong className="font-medium text-[var(--color-text)]">7-point</strong> scale. Pick the matching
      preset above. There is no reliable linear Australian → US GPA formula (for example GPA ÷ 7 × 4);
      do not treat results as WES-equivalent credential conversions.
    </p>
  );
}
