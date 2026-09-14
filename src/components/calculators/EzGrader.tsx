"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { GradeChart } from "@/components/calculators/shared/GradeChart";
import { NumberStepper } from "@/components/calculators/shared/NumberStepper";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { calculateEzGrader } from "@/lib/calculators/ez-grader";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";
import type { CalculatorSlug } from "@/types/calculator";

export function EzGrader({ slug = "ez-grader" }: { slug?: CalculatorSlug }) {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(slug, {
    totalQuestions: 10,
    wrongAnswers: 0,
  });
  const { totalQuestions, wrongAnswers } = state;

  const result = React.useMemo(
    () => calculateEzGrader({ totalQuestions, wrongAnswers }, scaleId),
    [totalQuestions, wrongAnswers, scaleId],
  );

  const flow = getPrimaryFlow(slug);
  const examples = calculatorBySlug[slug].examples;

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberStepper
          label="Total questions"
          value={totalQuestions}
          min={1}
          max={999}
          onChange={(v) =>
            setState({
              ...state,
              totalQuestions: v,
              wrongAnswers: Math.min(wrongAnswers, Math.max(0, v)),
            })
          }
        />
        <NumberStepper
          label="Wrong answers"
          value={wrongAnswers}
          min={0}
          max={Math.max(totalQuestions, wrongAnswers)}
          onChange={(v) => setState({ ...state, wrongAnswers: v })}
          error={
            wrongAnswers > totalQuestions
              ? `Wrong answers can't exceed total questions (${totalQuestions})`
              : null
          }
        />
      </div>
      {result.errors?.[0] && wrongAnswers <= totalQuestions && (
        <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>
      )}
      <ResultDisplay
        label="Score"
        percent={result.data?.scorePercent}
        letterGrade={result.data?.letterGrade}
        gpa={result.data?.gpa}
      />
      <ExampleScenarios
        examples={examples}
        onSelect={(values) => {
          setState({
            totalQuestions:
              typeof values.totalQuestions === "number" ? values.totalQuestions : totalQuestions,
            wrongAnswers:
              typeof values.wrongAnswers === "number" ? values.wrongAnswers : wrongAnswers,
          });
        }}
      />
      <ScaleSelector />
      {result.data?.chart && <GradeChart rows={result.data.chart} highlightWrong={wrongAnswers} />}
      {flow && result.status === "valid" && <NextStepCard flow={flow} />}
    </div>
  );
}
