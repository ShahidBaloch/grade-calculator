"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { StatusBadge } from "@/components/calculators/shared/StatusBadge";
import { WeightInput } from "@/components/calculators/shared/WeightInput";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateFinalGradeRequired, type FinalGradeResult } from "@/lib/calculators/final-grade";
import type { FinalGradeReverseResult } from "@/lib/calculators/final-grade-modes";
import {
  calculateFinalGradeDroppedLowest,
  calculateFinalGradePoints,
  calculateFinalGradeReverse,
} from "@/lib/calculators/final-grade-modes";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";
import type { FinalGradeMode } from "@/types/calculator";

const defaultState = {
  mode: "required" as FinalGradeMode,
  currentGrade: 85,
  desiredGrade: 90,
  finalWeight: 40,
  finalScore: 88,
  currentPoints: 340,
  currentMaxPoints: 400,
  finalPoints: 85,
  finalMaxPoints: 100,
  testScores: [82, 90, 78],
  dropLowest: true,
};

export function FinalGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "final-grade-calculator",
    defaultState,
  );

  const requiredResult = React.useMemo(
    () =>
      calculateFinalGradeRequired(
        {
          currentGrade: state.currentGrade,
          desiredGrade: state.desiredGrade,
          finalWeight: state.finalWeight,
        },
        scaleId,
      ),
    [state.currentGrade, state.desiredGrade, state.finalWeight, scaleId],
  );

  const alternateResult = React.useMemo(() => {
    switch (state.mode) {
      case "reverse":
        return calculateFinalGradeReverse(
          {
            currentGrade: state.currentGrade,
            finalScore: state.finalScore,
            finalWeight: state.finalWeight,
          },
          scaleId,
        );
      case "points":
        return calculateFinalGradePoints({
          currentPoints: state.currentPoints,
          currentMaxPoints: state.currentMaxPoints,
          finalPoints: state.finalPoints,
          finalMaxPoints: state.finalMaxPoints,
          finalWeight: state.finalWeight,
        });
      case "dropped-lowest":
        return calculateFinalGradeDroppedLowest({
          testScores: state.testScores,
          finalScore: state.finalScore,
          finalWeight: state.finalWeight,
          dropLowest: state.dropLowest,
        });
      default:
        return null;
    }
  }, [state, scaleId]);

  const requiredData: FinalGradeResult | undefined =
    state.mode === "required" ? requiredResult.data : undefined;
  const alternateData: FinalGradeReverseResult | undefined = alternateResult?.data;
  const result = state.mode === "required" ? requiredResult : alternateResult ?? requiredResult;

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <ExampleScenarios
        examples={calculatorBySlug["final-grade-calculator"].examples}
        onSelect={(values) => {
          setState({
            ...state,
            mode: "required",
            ...(typeof values.currentGrade === "number" ? { currentGrade: values.currentGrade } : {}),
            ...(typeof values.desiredGrade === "number" ? { desiredGrade: values.desiredGrade } : {}),
            ...(typeof values.finalWeight === "number" ? { finalWeight: values.finalWeight } : {}),
          });
        }}
      />
      <div className="space-y-2">
        <Label htmlFor="final-grade-mode">Calculation mode</Label>
        <Select
          value={state.mode}
          onValueChange={(value: FinalGradeMode) => setState({ ...state, mode: value })}
        >
          <SelectTrigger id="final-grade-mode" aria-label="Calculation mode">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">What do I need on my final?</SelectItem>
            <SelectItem value="reverse">What&apos;s my overall grade?</SelectItem>
            <SelectItem value="points">Point-based grading</SelectItem>
            <SelectItem value="dropped-lowest">Dropped lowest test</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {state.mode === "required" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="current-grade">Current grade (%)</Label>
            <Input
              id="current-grade"
              type="number"
              min={0}
              max={100}
              value={state.currentGrade}
              onChange={(e) => setState({ ...state, currentGrade: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-grade">Target grade (%)</Label>
            <Input
              id="target-grade"
              type="number"
              min={0}
              max={100}
              value={state.desiredGrade}
              onChange={(e) => setState({ ...state, desiredGrade: Number(e.target.value) })}
            />
          </div>
        </div>
      )}

      {(state.mode === "reverse" || state.mode === "dropped-lowest") && (
        <div className="grid gap-4 sm:grid-cols-2">
          {state.mode === "reverse" && (
            <div className="space-y-2">
              <Label htmlFor="final-reverse-current">Current grade (%)</Label>
              <Input
                id="final-reverse-current"
                type="number"
                min={0}
                max={100}
                value={state.currentGrade}
                onChange={(e) => setState({ ...state, currentGrade: Number(e.target.value) })}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="final-exam-score">Final exam score (%)</Label>
            <Input
              id="final-exam-score"
              type="number"
              min={0}
              max={100}
              value={state.finalScore}
              onChange={(e) => setState({ ...state, finalScore: Number(e.target.value) })}
            />
          </div>
        </div>
      )}

      {state.mode === "points" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="final-current-points">Current points earned</Label>
            <Input
              id="final-current-points"
              type="number"
              value={state.currentPoints}
              onChange={(e) => setState({ ...state, currentPoints: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="final-current-max">Current points possible</Label>
            <Input
              id="final-current-max"
              type="number"
              value={state.currentMaxPoints}
              onChange={(e) => setState({ ...state, currentMaxPoints: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="final-points-earned">Final points earned</Label>
            <Input
              id="final-points-earned"
              type="number"
              value={state.finalPoints}
              onChange={(e) => setState({ ...state, finalPoints: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="final-points-possible">Final points possible</Label>
            <Input
              id="final-points-possible"
              type="number"
              value={state.finalMaxPoints}
              onChange={(e) => setState({ ...state, finalMaxPoints: Number(e.target.value) })}
            />
          </div>
        </div>
      )}

      {state.mode === "dropped-lowest" && (
        <>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={state.dropLowest}
              onChange={(e) => setState({ ...state, dropLowest: e.target.checked })}
            />
            Drop lowest test score
          </label>
          <DynamicRowList
            items={state.testScores}
            onAdd={() => setState({ ...state, testScores: [...state.testScores, 80] })}
            onRemove={(index) =>
              setState({ ...state, testScores: state.testScores.filter((_, i) => i !== index) })
            }
            addLabel="Add test"
            renderRow={(score, index) => (
              <Input
                aria-label={`Test ${index + 1} score`}
                type="number"
                min={0}
                max={100}
                value={score}
                onChange={(e) => {
                  const next = [...state.testScores];
                  next[index] = Number(e.target.value);
                  setState({ ...state, testScores: next });
                }}
              />
            )}
          />
        </>
      )}

      {state.mode !== "dropped-lowest" && (
        <WeightInput
          label="Final exam weight"
          value={state.finalWeight}
          onChange={(v) => setState({ ...state, finalWeight: v })}
        />
      )}

      {state.mode === "dropped-lowest" && (
        <WeightInput
          label="Final exam weight"
          value={state.finalWeight}
          onChange={(v) => setState({ ...state, finalWeight: v })}
        />
      )}

      {result.errors?.[0] && <p className="text-sm text-[var(--color-error)]">{result.errors[0]}</p>}

      {requiredData && state.mode === "required" && (
        <>
          {requiredData.status !== "achievable" && <StatusBadge status={requiredData.status} />}
          <ResultDisplay
            label={requiredData.status === "achievable" ? "Required on final" : "Result"}
            percent={requiredData.status === "achievable" ? requiredData.requiredPercent : requiredData.targetPercent}
            placeholder="—"
          />
          <p className="text-sm text-[var(--color-text-muted)]">{requiredData.message}</p>
          <FormulaBreakdown steps={requiredData.formulaSteps} />
        </>
      )}

      {alternateData && state.mode !== "required" && "overallGrade" in alternateData && (
        <>
          <ResultDisplay label="Overall course grade" percent={alternateData.overallGrade} placeholder="—" />
          <p className="text-sm text-[var(--color-text-muted)]">{alternateData.message}</p>
          <FormulaBreakdown steps={alternateData.formulaSteps} />
        </>
      )}

      {getPrimaryFlow("final-grade-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("final-grade-calculator")!} />
      )}
    </div>
  );
}
