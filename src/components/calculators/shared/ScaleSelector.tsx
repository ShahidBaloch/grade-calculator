"use client";

import { usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { gradingScales } from "@/lib/grading-scales";
import { AU_INSTITUTION_SCALE_IDS } from "@/lib/grading-scales/au-presets";
import { useGradingScale } from "@/hooks/useGradingScale";
import type { ScaleId } from "@/types/grading-scale";

const scaleOptions = Object.values(gradingScales);

function scaleOptionsForPath(pathname: string | null) {
  if (pathname?.startsWith("/au")) {
    return scaleOptions.filter((option) => AU_INSTITUTION_SCALE_IDS.includes(option.id));
  }
  return scaleOptions;
}

export function ScaleSelector() {
  const pathname = usePathname();
  const { scaleId, setScaleId, isScaleLocked, geoScaleId } = useGradingScale();
  const scale = gradingScales[scaleId];
  const options = scaleOptionsForPath(pathname);
  const onAustralianHub = Boolean(pathname?.startsWith("/au"));

  return (
    <>
      <p className="hidden print:block text-sm">
        <span className="font-medium">Grading scale:</span> {scale.name}
        {isScaleLocked ? " (locked for this page)" : ""}
      </p>
      {isScaleLocked ? (
        <div className="no-print space-y-1">
          <Label>Grading scale</Label>
          <p className="text-sm text-[var(--color-text-muted)]">{scale.name} (set for this page)</p>
        </div>
      ) : (
        <div className="no-print space-y-2">
          <Label htmlFor="grading-scale-select">Grading scale</Label>
          {/* Native select: same styling as the Radix trigger, ~65 KB less client JS, better mobile picker. */}
          <div className="relative">
            <select
              id="grading-scale-select"
              aria-label="Grading scale"
              value={scaleId}
              onChange={(event) => setScaleId(event.target.value as ScaleId)}
              className="flex h-11 w-full appearance-none items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 pr-9 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
            />
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">
            {onAustralianHub
              ? "Pick your university. Grade points are not the same at every Australian campus."
              : geoScaleId === scaleId
                ? "Matched to your location. Change it if your school uses a different scale."
                : "Change this if your school uses a different scale."}
          </p>
        </div>
      )}
    </>
  );
}
