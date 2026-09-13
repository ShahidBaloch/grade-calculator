"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateGcseGrade } from "@/lib/calculators/gcse-grade";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

export function GcseGradeCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "gcse-grade-calculator",
    { percent: 72 },
  );
  const examples = calculatorBySlug["gcse-grade-calculator"].examples;

  const result = React.useMemo(() => calculateGcseGrade(state.percent), [state.percent]);
  const data = result.data;

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              percent: typeof values.percent === "number" ? values.percent : state.percent,
            })
          }
        />
      )}
      <p className="text-sm text-[var(--color-text-muted)]">
        Convert a percentage to the England 9–1 GCSE scale. Boundaries are educational defaults, not
        this year&apos;s official paper.
      </p>
      <div className="space-y-2">
        <Label htmlFor="gcse-percent">Percentage</Label>
        <Input
          id="gcse-percent"
          type="number"
          min={0}
          max={100}
          value={state.percent}
          onChange={(e) => setState({ percent: Number(e.target.value) })}
        />
      </div>
      {result.errors?.[0] && <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>}
      {result.warnings?.map((warning) => (
        <p key={warning} className="text-sm text-[var(--color-warning)]">
          {warning}
        </p>
      ))}
      {data && (
        <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
          <Label>GCSE grade (9–1)</Label>
          <p className="text-5xl font-bold">{data.grade}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {data.rangeLabel} · legacy letter about {data.legacyLetter} ·{" "}
            {data.isStandardPass ? "standard pass (grade 4+)" : "below a standard pass"}
          </p>
          <FormulaBreakdown steps={data.formulaSteps} />
        </div>
      )}
      {getPrimaryFlow("gcse-grade-calculator") && data && (
        <NextStepCard flow={getPrimaryFlow("gcse-grade-calculator")!} />
      )}
    </div>
  );
}
