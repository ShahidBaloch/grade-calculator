"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateRemainingWorkRequired,
  calculateWeightedGrade,
} from "@/lib/calculators/weighted-grade";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";
import type { WeightedGradeInput } from "@/lib/calculators/schemas/weighted-grade.schema";
import { StatusBadge } from "@/components/calculators/shared/StatusBadge";
import { WeightInput } from "@/components/calculators/shared/WeightInput";

type ScoreMode = WeightedGradeInput["globalMode"];
type WeightMode = WeightedGradeInput["weightMode"];

interface WeightedRow {
  name: string;
  score: number | string;
  weight: number;
  maxPoints?: number;
}

const defaultItems: WeightedRow[] = [
  { name: "Homework", score: 92, weight: 20, maxPoints: 100 },
  { name: "Midterm", score: 85, weight: 30, maxPoints: 100 },
  { name: "Final", score: 88, weight: 50, maxPoints: 100 },
];

function ModeButtons<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-md border px-4 py-2 text-sm min-h-11 ${
              value === option.value
                ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                : "border-[var(--color-border)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function WeightedGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "weighted-grade-calculator",
    {
      globalMode: "percentage" as ScoreMode,
      weightMode: "percent" as WeightMode,
      items: defaultItems,
      desiredOverall: 90,
      remainingWeight: 0,
    },
  );
  const { globalMode, weightMode, items, desiredOverall, remainingWeight } = state;
  const examples = calculatorBySlug["weighted-grade-calculator"].examples;

  const result = React.useMemo(
    () => calculateWeightedGrade({ globalMode, weightMode, items }, scaleId),
    [globalMode, weightMode, items, scaleId],
  );

  const remainingResult = React.useMemo(() => {
    if (!result.data || remainingWeight <= 0) return null;
    return calculateRemainingWorkRequired(
      result.data.rows.map((row) => ({ percent: row.normalizedPercent, weight: row.weight })),
      remainingWeight,
      desiredOverall,
    );
  }, [result.data, remainingWeight, desiredOverall]);

  const updateItems = (next: WeightedRow[]) => setState({ ...state, items: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (!Array.isArray(values.items)) return;
            setState({
              ...state,
              items: values.items.map((row, index) => {
                const item = row as { name?: string; score?: number | string; weight?: number; maxPoints?: number };
                return {
                  name: item.name ?? `Item ${index + 1}`,
                  score: item.score ?? 0,
                  weight: typeof item.weight === "number" ? item.weight : 0,
                  maxPoints: item.maxPoints ?? 100,
                };
              }),
            });
          }}
        />
      )}
      <ScaleSelector />
      <div className="grid gap-4 sm:grid-cols-2">
        <ModeButtons
          label="Score format"
          value={globalMode}
          onChange={(value) => setState({ ...state, globalMode: value })}
          options={[
            { value: "percentage", label: "Percentage" },
            { value: "letter", label: "Letter grade" },
            { value: "points", label: "Points earned" },
          ]}
        />
        <ModeButtons
          label="Weight format"
          value={weightMode}
          onChange={(value) => setState({ ...state, weightMode: value })}
          options={[
            { value: "percent", label: "Percent weights" },
            { value: "points", label: "Point weights" },
          ]}
        />
      </div>
      <DynamicRowList
        items={items}
        onAdd={() =>
          updateItems([...items, { name: "", score: globalMode === "letter" ? "B" : 0, weight: 0, maxPoints: 100 }])
        }
        onRemove={(index) => updateItems(items.filter((_, i) => i !== index))}
        renderRow={(item, index) => (
          <div className={`grid gap-2 ${globalMode === "points" ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
            <Input
              placeholder="Name"
              aria-label={`Assignment ${index + 1} name`}
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, name: e.target.value };
                updateItems(next);
              }}
            />
            <Input
              type={globalMode === "letter" ? "text" : "number"}
              placeholder={globalMode === "letter" ? "Grade (A, B+)" : "Score"}
              aria-label={`Assignment ${index + 1} score`}
              value={item.score}
              onChange={(e) => {
                const next = [...items];
                next[index] = {
                  ...item,
                  score: globalMode === "letter" ? e.target.value : Number(e.target.value) || 0,
                };
                updateItems(next);
              }}
            />
            {globalMode === "points" && (
              <Input
                type="number"
                placeholder="Max points"
                aria-label={`Assignment ${index + 1} max points`}
                value={item.maxPoints ?? 100}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...item, maxPoints: Number(e.target.value) || 0 };
                  updateItems(next);
                }}
              />
            )}
            <Input
              type="number"
              placeholder={weightMode === "percent" ? "Weight %" : "Weight points"}
              aria-label={`Assignment ${index + 1} weight`}
              value={item.weight}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, weight: Number(e.target.value) || 0 };
                updateItems(next);
              }}
            />
          </div>
        )}
      />
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.warnings?.map((w) => (
        <p key={w} className="text-sm text-[var(--color-warning)]">{w}</p>
      ))}
      <ResultDisplay
        label="Weighted average"
        percent={result.data?.weightedAverage}
        letterGrade={result.data?.letterGrade}
        gpa={result.data?.gpa}
      />
      {result.data && (
        <p className="text-sm text-[var(--color-text-muted)]">
          Formula: Σ(score × weight) ÷ Σ(weight) = Σ(score × weight) ÷ {result.data.totalWeight}
          {weightMode === "percent" ? "%" : ""}. We normalize by the weights you enter; percent mode does
          not have to total 100% unless your syllabus requires it.
        </p>
      )}

      <div className="space-y-4 rounded-lg border border-[var(--color-border)] p-4">
        <div>
          <h3 className="text-sm font-semibold">What do I need on remaining work?</h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Enter unfinished course weight and your target overall. Rows above are treated as completed.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="desired-overall">Desired overall (%)</Label>
            <Input
              id="desired-overall"
              type="number"
              min={0}
              max={100}
              value={desiredOverall}
              onChange={(e) => setState({ ...state, desiredOverall: Number(e.target.value) })}
            />
          </div>
          <WeightInput
            label="Remaining weight"
            value={remainingWeight}
            onChange={(v) => setState({ ...state, remainingWeight: v })}
          />
        </div>
        {remainingResult?.errors?.[0] && (
          <p className="text-sm text-[var(--color-error)]">{remainingResult.errors[0]}</p>
        )}
        {remainingResult?.data && (
          <>
            {remainingResult.data.status !== "achievable" && (
              <StatusBadge status={remainingResult.data.status} />
            )}
            <ResultDisplay
              label={
                remainingResult.data.status === "impossible"
                  ? "Need on remaining (over 100%)"
                  : "Need on remaining work"
              }
              percent={remainingResult.data.requiredPercent}
            />
            <p className="text-sm text-[var(--color-text-muted)]">{remainingResult.data.message}</p>
          </>
        )}
      </div>

      {getPrimaryFlow("weighted-grade-calculator") && result.data && (
        <NextStepCard flow={getPrimaryFlow("weighted-grade-calculator")!} />
      )}
    </div>
  );
}
