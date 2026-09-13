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
  const scale = gradingScales[scaleId];

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
              {scaleOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-[var(--color-text-muted)]">
            US Standard is default. Change only if your school uses a different scale.
          </p>
        </div>
      )}
    </>
  );
}
