"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { StatusBadge } from "@/components/calculators/shared/StatusBadge";
import { WeightInput } from "@/components/calculators/shared/WeightInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateEocGrade } from "@/lib/calculators/eoc-grade";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

export function EocGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("eoc-grade-calculator", {
    currentGrade: 82,
    eocWeight: 25,
    targetGrade: 85,
  });
  const examples = calculatorBySlug["eoc-grade-calculator"].examples;

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
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              currentGrade: typeof values.currentGrade === "number" ? values.currentGrade : state.currentGrade,
              eocWeight: typeof values.eocWeight === "number" ? values.eocWeight : state.eocWeight,
              targetGrade: typeof values.targetGrade === "number" ? values.targetGrade : state.targetGrade,
            })
          }
        />
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="eoc-current-grade">Current course grade (%)</Label>
          <Input
            id="eoc-current-grade"
            type="number"
            min={0}
            max={100}
            value={state.currentGrade}
            onChange={(e) => setState({ ...state, currentGrade: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="eoc-target-grade">Target grade (%)</Label>
          <Input
            id="eoc-target-grade"
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
            percent={data.requiredPercent}
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
