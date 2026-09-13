"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { StatusBadge } from "@/components/calculators/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateRaiseGpa } from "@/lib/calculators/raise-gpa";
import { getScaleMaxGpa } from "@/lib/grading-scales";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

const defaultState = {
  currentGpa: 3.2,
  currentCredits: 60,
  targetGpa: 3.4,
  futureCredits: 30,
};

export function RaiseGpaCalculator() {
  const { scaleId } = useGradingScale();
  const maxGpa = getScaleMaxGpa(scaleId);
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "raise-gpa-calculator",
    defaultState,
  );
  const examples = calculatorBySlug["raise-gpa-calculator"].examples;

  const result = React.useMemo(() => calculateRaiseGpa({ ...state, maxGpa }), [state, maxGpa]);
  const data = result.data;

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              currentGpa: typeof values.currentGpa === "number" ? values.currentGpa : state.currentGpa,
              currentCredits:
                typeof values.currentCredits === "number" ? values.currentCredits : state.currentCredits,
              targetGpa: typeof values.targetGpa === "number" ? values.targetGpa : state.targetGpa,
              futureCredits:
                typeof values.futureCredits === "number" ? values.futureCredits : state.futureCredits,
            })
          }
        />
      )}
      <ScaleSelector />
      <p className="text-sm text-[var(--color-text-muted)]">
        Impossible is judged against this scale&apos;s ceiling ({maxGpa.toFixed(1)}).
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="raise-current-gpa">Current GPA</Label>
          <Input
            id="raise-current-gpa"
            type="number"
            step="0.01"
            min={0}
            max={maxGpa}
            value={state.currentGpa}
            onChange={(e) => setState({ ...state, currentGpa: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="raise-current-credits">Credits completed</Label>
          <Input
            id="raise-current-credits"
            type="number"
            min={0}
            value={state.currentCredits}
            onChange={(e) => setState({ ...state, currentCredits: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="raise-target-gpa">Target GPA</Label>
          <Input
            id="raise-target-gpa"
            type="number"
            step="0.01"
            min={0}
            max={maxGpa}
            value={state.targetGpa}
            onChange={(e) => setState({ ...state, targetGpa: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="raise-future-credits">Future credit hours</Label>
          <Input
            id="raise-future-credits"
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
            <p className="text-5xl font-bold">{formatGpa(data.requiredGpa)}</p>
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
