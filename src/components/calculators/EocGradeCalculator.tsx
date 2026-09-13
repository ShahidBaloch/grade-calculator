"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { StatusBadge } from "@/components/calculators/shared/StatusBadge";
import { WeightInput } from "@/components/calculators/shared/WeightInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateEocGrade } from "@/lib/calculators/eoc-grade";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

export function EocGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("eoc-grade-calculator", {
    currentGrade: 82,
    eocWeight: 25,
    targetGrade: 85,
  });

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "eoc-grade-calculator");
  }, []);

  const result = React.useMemo(
    () =>
      calculateEocGrade(
        {
          currentGrade: state.currentGrade,
          eocWeight: state.eocWeight,
          targetGrade: state.targetGrade,
        },
        scaleId,
      ),
    [state, scaleId],
  );

  const data = result.data;

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Current course grade (%)</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={state.currentGrade}
            onChange={(e) => setState({ ...state, currentGrade: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Target grade (%)</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={state.targetGrade}
            onChange={(e) => setState({ ...state, targetGrade: Number(e.target.value) })}
          />
        </div>
      </div>
      <WeightInput
        label="EOC exam weight"
        value={state.eocWeight}
        onChange={(v) => setState({ ...state, eocWeight: v })}
      />
      {result.errors?.[0] && <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>}
      {data && (
        <>
          {data.status !== "achievable" && <StatusBadge status={data.status} />}
          <ResultDisplay
            label={data.status === "achievable" ? "Required on EOC" : "Result"}
            percent={data.status === "achievable" ? data.requiredPercent : data.targetPercent}
            placeholder="—"
          />
          <p className="text-sm text-[var(--color-text-muted)]">{data.message}</p>
          <FormulaBreakdown steps={data.formulaSteps} />
        </>
      )}
      {getPrimaryFlow("eoc-grade-calculator") && data && (
        <NextStepCard flow={getPrimaryFlow("eoc-grade-calculator")!} />
      )}
    </div>
  );
}
