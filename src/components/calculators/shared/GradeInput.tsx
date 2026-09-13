"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGradingScale } from "@/hooks/useGradingScale";
import type { GradeInputMode } from "@/types/calculator";

interface GradeInputProps {
  label: string;
  mode: GradeInputMode;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
}

export function GradeInput({ label, mode, value, onChange, error }: GradeInputProps) {
  const { scale } = useGradingScale();
  const errorId = error ? `${label}-error` : undefined;

  if (mode === "letter") {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Select value={String(value)} onValueChange={onChange}>
          <SelectTrigger aria-describedby={errorId}>
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent>
            {scale.bands.map((band) => (
              <SelectItem key={band.letter} value={band.letter}>
                {band.letter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p id={errorId} className="text-sm text-[var(--color-error)]">{error}</p>}
      </div>
    );
  }

  if (mode === "points") {
    const [earned = "", max = ""] = String(value).split("/");
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={earned}
            onChange={(e) => onChange(`${e.target.value}/${max}`)}
            aria-label={`${label} earned`}
            aria-describedby={errorId}
          />
          <span>/</span>
          <Input
            type="number"
            value={max}
            onChange={(e) => onChange(`${earned}/${e.target.value}`)}
            aria-label={`${label} total`}
          />
        </div>
        {error && <p id={errorId} className="text-sm text-[var(--color-error)]">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={errorId}
      />
      {error && <p id={errorId} className="text-sm text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
