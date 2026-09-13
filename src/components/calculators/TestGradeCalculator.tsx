"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { NumberStepper } from "@/components/calculators/shared/NumberStepper";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { calculateTestGrade } from "@/lib/calculators/test-grade";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useGradingScale } from "@/hooks/useGradingScale";

export function TestGradeCalculator() {
  const { scaleId } = useGradingScale();
  const [inputMode, setInputMode] = React.useState<"correct" | "wrong">("correct");
  const [totalQuestions, setTotalQuestions] = React.useState(20);
  const [count, setCount] = React.useState(15);
  const [bonusPoints, setBonusPoints] = React.useState(0);

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
    <div className="space-y-6">
      <ExampleScenarios
        examples={calculatorBySlug["test-grade-calculator"].examples}
        onSelect={(values) => {
          if (typeof values.totalQuestions === "number") setTotalQuestions(values.totalQuestions);
          if (typeof values.correctAnswers === "number") {
            setInputMode("correct");
            setCount(values.correctAnswers);
          }
          if (typeof values.bonusPoints === "number") setBonusPoints(values.bonusPoints);
        }}
      />
      <ScaleSelector />
      <div className="flex gap-2">
        {(["correct", "wrong"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setInputMode(mode)}
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
        <NumberStepper label="Total questions" value={totalQuestions} min={1} max={999} onChange={setTotalQuestions} />
        <NumberStepper
          label={inputMode === "correct" ? "Correct answers" : "Wrong answers"}
          value={count}
          min={0}
          max={totalQuestions}
          onChange={setCount}
        />
      </div>
      <div className="space-y-2">
        <Label>Bonus points (optional)</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={bonusPoints}
          onChange={(e) => setBonusPoints(Number(e.target.value) || 0)}
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
