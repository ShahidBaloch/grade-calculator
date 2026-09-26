"use client";

import { usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
          <Select value={scaleId} onValueChange={(value) => setScaleId(value as ScaleId)}>
            <SelectTrigger id="grading-scale-select" aria-label="Grading scale">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
