"use client";

import * as React from "react";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertPercentToLetter } from "@/lib/calculators/grade-converter";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

export function PercentageToLetterCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "percentage-to-letter-grade",
    { percent: 85 },
  );

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "percentage-to-letter-grade");
  }, []);

  const result = React.useMemo(
    () => convertPercentToLetter(state.percent, scaleId),
    [state.percent, scaleId],
  );

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <ScaleSelector />
      <div className="space-y-2">
        <Label>Percentage</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={state.percent}
          onChange={(e) => setState({ percent: Number(e.target.value) })}
        />
      </div>
      {result.errors?.[0] && <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>}
      {result.data && (
        <>
          <ResultDisplay
            label="Letter grade"
            percent={result.data.percent}
            letterGrade={result.data.letter}
            gpa={result.data.gpa}
          />
          <p className="text-sm text-[var(--color-text-muted)]">
            Range on this scale: {result.data.rangeLabel}
          </p>
        </>
      )}
    </div>
  );
}
