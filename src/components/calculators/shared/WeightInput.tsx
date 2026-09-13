"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface WeightInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}

export function WeightInput({ label, value, onChange, suffix = "%" }: WeightInputProps) {
  const inputId = React.useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative">
        <Input
          id={inputId}
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="pr-8"
        />        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-muted)]">
          {suffix}
        </span>
      </div>
    </div>
  );
}
