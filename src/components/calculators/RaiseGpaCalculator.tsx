"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { StatusBadge } from "@/components/calculators/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateRaiseGpa } from "@/lib/calculators/raise-gpa";
import { formatGpa } from "@/lib/utils/format";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

export function RaiseGpaCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("raise-gpa-calculator", {
    currentGpa: 3.2,
    currentCredits: 60,
    targetGpa: 3.5,
    futureCredits: 15,
  });

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "raise-gpa-calculator");
  }, []);

  const result = React.useMemo(() => calculateRaiseGpa(state), [state]);
  const data = result.data;

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Current GPA</Label>
          <Input
            type="number"
            step="0.01"
            min={0}
            max={5}
            value={state.currentGpa}
            onChange={(e) => setState({ ...state, currentGpa: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Credits completed</Label>
          <Input
            type="number"
            min={0}
            value={state.currentCredits}
            onChange={(e) => setState({ ...state, currentCredits: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Target GPA</Label>
          <Input
            type="number"
            step="0.01"
            min={0}
            max={5}
            value={state.targetGpa}
            onChange={(e) => setState({ ...state, targetGpa: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Future credit hours</Label>
          <Input
            type="number"
            min={1}
            value={state.futureCredits}
            onChange={(e) => setState({ ...state, futureCredits: Number(e.target.value) })}
          />
        </div>
      </div>
      {result.errors?.[0] && <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>}
      {data && (
        <>
          {data.status !== "achievable" && <StatusBadge status={data.status} />}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
            <Label>Required GPA</Label>
            <p className="text-5xl font-bold">
              {data.status === "achievable" ? formatGpa(data.requiredGpa) : "—"}
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{data.message}</p>
          </div>
          <FormulaBreakdown steps={data.formulaSteps} />
        </>
      )}
      {getPrimaryFlow("raise-gpa-calculator") && data && (
        <NextStepCard flow={getPrimaryFlow("raise-gpa-calculator")!} />
      )}
    </div>
  );
}
