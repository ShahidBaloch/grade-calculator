"use client";

import * as React from "react";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertLetterToPercent } from "@/lib/calculators/grade-converter";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

export function LetterGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "letter-grade-calculator",
    { letter: "B+" },
  );

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "letter-grade-calculator");
  }, []);

  const result = React.useMemo(
    () => convertLetterToPercent(state.letter, scaleId),
    [state.letter, scaleId],
  );

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <ScaleSelector />
      <div className="space-y-2">
        <Label>Letter grade</Label>
        <Input
          placeholder="e.g. A-, B+, C"
          value={state.letter}
          onChange={(e) => setState({ letter: e.target.value })}
        />
      </div>
      {result.errors?.[0] && <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>}
      {result.data && (
        <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
          <Label>Equivalent percentage</Label>
          <p className="text-5xl font-bold">{result.data.midpointPercent.toFixed(1)}%</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {result.data.letter} · Range {result.data.rangeLabel} · GPA {result.data.gpa.toFixed(1)}
          </p>
        </div>
      )}
    </div>
  );
}
