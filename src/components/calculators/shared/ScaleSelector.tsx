"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gradingScales } from "@/lib/grading-scales";
import { useGradingScale } from "@/hooks/useGradingScale";
import type { ScaleId } from "@/types/grading-scale";

const scaleOptions = Object.values(gradingScales);

export function ScaleSelector() {
  const { scaleId, setScaleId, isScaleLocked } = useGradingScale();

  if (isScaleLocked) {
    const scale = gradingScales[scaleId];
    return (
      <div className="space-y-1">
        <Label>Grading scale</Label>
        <p className="text-sm text-[var(--color-text-muted)]">{scale.name} (set for this page)</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="grading-scale-select">Grading scale</Label>
      <Select value={scaleId} onValueChange={(value) => setScaleId(value as ScaleId)}>
        <SelectTrigger id="grading-scale-select" aria-label="Grading scale">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {scaleOptions.map((scale) => (
            <SelectItem key={scale.id} value={scale.id}>
              {scale.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-[var(--color-text-muted)]">
        US Standard is default. Change only if your school uses a different scale.
      </p>
    </div>
  );
}
