"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberStepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function NumberStepper({ label, value, min = 0, max = 999, onChange }: NumberStepperProps) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));
  const inputId = React.useId();

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
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
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
    </div>
  );
}
