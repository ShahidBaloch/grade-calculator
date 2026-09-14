"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertPercentToLetter } from "@/lib/calculators/grade-converter";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

export function PercentageToLetterCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "percentage-to-letter-grade",
    { percent: 85 },
  );
  const examples = calculatorBySlug["percentage-to-letter-grade"].examples;

  const result = React.useMemo(
    () => convertPercentToLetter(state.percent, scaleId),
    [state.percent, scaleId],
  );

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
      <ScaleSelector />
      <div className="space-y-2">
        <Label htmlFor="percent-to-letter">Percentage</Label>
        <Input
          id="percent-to-letter"
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
            primaryLetter
          />
          <p className="text-sm text-[var(--color-text-muted)]">
            Range on this scale: {result.data.rangeLabel}
          </p>
          {getPrimaryFlow("percentage-to-letter-grade") && (
            <NextStepCard flow={getPrimaryFlow("percentage-to-letter-grade")!} />
          )}
        </>
      )}
    </div>
  );
}
