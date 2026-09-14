"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberStepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  /** Shown when value is outside min/max (e.g. after typing past the limit). */
  error?: string | null;
}

export function NumberStepper({
  label,
  value,
  min = 0,
  max = 999,
  onChange,
  error,
}: NumberStepperProps) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  const inputId = React.useId();
  const outOfRange = value < min || value > max;
  const rangeError =
    error ??
    (outOfRange
      ? value > max
        ? `${label} can't exceed ${max}`
        : `${label} can't be below ${min}`
      : null);

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="no-print"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(clamp(value - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          id={inputId}
          type="number"
          className="w-16 text-center"
          value={Number.isFinite(value) ? value : min}
          min={min}
          max={max}
          aria-invalid={Boolean(rangeError)}
          aria-describedby={rangeError ? `${inputId}-error` : undefined}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange(min);
              return;
            }
            const next = Number(raw);
            if (!Number.isFinite(next)) {
              onChange(min);
              return;
            }
            // Allow typing past max/min so validation can surface; buttons still clamp.
            onChange(next);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="no-print"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(clamp(value + 1))}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {rangeError && (
        <p id={`${inputId}-error`} className="text-sm text-[var(--color-error)]" role="alert">
          {rangeError}
        </p>
      )}
    </div>
  );
}
