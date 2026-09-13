"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { NumberStepper } from "@/components/calculators/shared/NumberStepper";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { calculateTestGrade } from "@/lib/calculators/test-grade";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

const defaultState = {
  inputMode: "correct" as "correct" | "wrong",
  totalQuestions: 20,
  count: 15,
  bonusPoints: 0,
};

export function TestGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "test-grade-calculator",
    defaultState,
  );
  const { inputMode, totalQuestions, count, bonusPoints } = state;

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "test-grade-calculator");
  }, []);

  const result = React.useMemo(
    () =>
      calculateTestGrade(
        {
          inputMode,
          totalQuestions,
          correctAnswers: inputMode === "correct" ? count : undefined,
          wrongAnswers: inputMode === "wrong" ? count : undefined,
          bonusPoints,
        },
        scaleId,
      ),
    [inputMode, totalQuestions, count, bonusPoints, scaleId],
  );

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <ExampleScenarios
        examples={calculatorBySlug["test-grade-calculator"].examples}
        onSelect={(values) => {
          setState({
            ...state,
            totalQuestions: typeof values.totalQuestions === "number" ? values.totalQuestions : totalQuestions,
            inputMode: typeof values.correctAnswers === "number" ? "correct" : inputMode,
            count: typeof values.correctAnswers === "number" ? values.correctAnswers : count,
            bonusPoints: typeof values.bonusPoints === "number" ? values.bonusPoints : bonusPoints,
          });
        }}
      />
      <ScaleSelector />
      <div className="flex gap-2">
        {(["correct", "wrong"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={inputMode === mode}
            onClick={() => setState({ ...state, inputMode: mode })}
            className={`rounded-md border px-4 py-2 text-sm min-h-11 ${
              inputMode === mode
                ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                : "border-[var(--color-border)]"
            }`}
          >
            {mode === "correct" ? "Correct answers" : "Wrong answers"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberStepper
          label="Total questions"
          value={totalQuestions}
          min={1}
          max={999}
          onChange={(value) => setState({ ...state, totalQuestions: value })}
        />
        <NumberStepper
          label={inputMode === "correct" ? "Correct answers" : "Wrong answers"}
          value={count}
          min={0}
          max={totalQuestions}
          onChange={(value) => setState({ ...state, count: value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bonus-points">Bonus points (optional)</Label>
        <Input
          id="bonus-points"
          type="number"
          min={0}
          max={100}
          value={bonusPoints}
          onChange={(e) => setState({ ...state, bonusPoints: Number(e.target.value) || 0 })}
        />
      </div>
      {result.errors?.[0] && <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>}
      {result.warnings?.[0] && <p className="text-sm text-[var(--color-warning)]">{result.warnings[0]}</p>}
      <ResultDisplay
        label="Test score"
        percent={result.data?.finalPercent}
        letterGrade={result.data?.letterGrade}
        gpa={result.data?.gpa}
      />
      {getPrimaryFlow("test-grade-calculator") && result.status !== "error" && (
        <NextStepCard flow={getPrimaryFlow("test-grade-calculator")!} />
      )}
    </div>
  );
}
