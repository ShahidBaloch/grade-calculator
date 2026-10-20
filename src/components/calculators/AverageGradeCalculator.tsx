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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateAverageGrade, parseScoreList } from "@/lib/calculators/average-grade";
import type { AverageGradeInput } from "@/lib/calculators/schemas/average-grade.schema";
import { formatPercent } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

type ScoreMode = AverageGradeInput["scoreMode"];

interface AverageRow {
  name: string;
  score: number | string;
  maxPoints?: number;
}

const defaultItems: AverageRow[] = [
  { name: "Test 1", score: 88, maxPoints: 100 },
  { name: "Test 2", score: 76, maxPoints: 100 },
  { name: "Test 3", score: 94, maxPoints: 100 },
  { name: "Test 4", score: 81, maxPoints: 100 },
];

const modeOptions: Array<{ value: ScoreMode; label: string }> = [
  { value: "percentage", label: "Percentage" },
  { value: "points", label: "Points earned" },
  { value: "letter", label: "Letter grade" },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] p-3">
      <dt className="text-xs text-[var(--color-text-muted)]">{label}</dt>
      <dd className="mt-1 text-lg font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

export function AverageGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "average-grade-calculator",
    { scoreMode: "percentage" as ScoreMode, items: defaultItems },
  );
  const { scoreMode, items } = state;
  const [pasted, setPasted] = React.useState("");
  const examples = calculatorBySlug["average-grade-calculator"].examples;

  const result = React.useMemo(
    () => calculateAverageGrade({ scoreMode, items }, scaleId),
    [scoreMode, items, scaleId],
  );

  const updateItems = (next: AverageRow[]) => setState({ ...state, items: next });

  const applyPasted = () => {
    const tokens = parseScoreList(pasted);
    if (!tokens.length) return;
    const fromFraction = tokens.every((t) => t.includes("/"));
    const nextMode: ScoreMode = fromFraction ? "points" : scoreMode === "points" ? "percentage" : scoreMode;
    setState({
      scoreMode: nextMode,
      items: tokens.map((token, index) => {
        if (fromFraction) {
          const [earned, max] = token.split("/").map((v) => Number.parseFloat(v));
          return { name: `Score ${index + 1}`, score: Number.isFinite(earned) ? earned : 0, maxPoints: max };
        }
        const asNumber = Number(token.replace("%", ""));
        return {
          name: `Score ${index + 1}`,
          score: nextMode === "letter" || !Number.isFinite(asNumber) ? token : asNumber,
          maxPoints: 100,
        };
      }),
    });
  };

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (!Array.isArray(values.items)) return;
            setState({
              scoreMode: (values.scoreMode as ScoreMode) ?? "percentage",
              items: values.items.map((row, index) => {
                const item = row as Partial<AverageRow>;
                return {
                  name: item.name ?? `Score ${index + 1}`,
                  score: item.score ?? 0,
                  maxPoints: item.maxPoints ?? 100,
                };
              }),
            });
          }}
        />
      )}
      <ScaleSelector />
      <div className="space-y-2">
        <Label>Score format</Label>
        <div className="flex flex-wrap gap-2">
          {modeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={scoreMode === option.value}
              onClick={() => setState({ ...state, scoreMode: option.value })}
              className={`rounded-md border px-4 py-2 text-sm min-h-11 ${
                scoreMode === option.value
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <DynamicRowList
        items={items}
        addLabel="Add score"
        onAdd={() =>
          updateItems([...items, { name: "", score: scoreMode === "letter" ? "B" : "", maxPoints: 100 }])
        }
        onRemove={(index) => updateItems(items.filter((_, i) => i !== index))}
        renderRow={(item, index) => (
          <div className={`grid gap-2 ${scoreMode === "points" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            <Input
              placeholder="Name (optional)"
              aria-label={`Row ${index + 1} name`}
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, name: e.target.value };
                updateItems(next);
              }}
            />
            <Input
              type={scoreMode === "letter" ? "text" : "number"}
              placeholder={scoreMode === "letter" ? "Grade (A, B+)" : scoreMode === "points" ? "Points earned" : "Score %"}
              aria-label={`Row ${index + 1} score`}
              value={item.score}
              onChange={(e) => {
                const next = [...items];
                const raw = e.target.value;
                next[index] = {
                  ...item,
                  score: scoreMode === "letter" || raw === "" ? raw : Number(raw),
                };
                updateItems(next);
              }}
            />
            {scoreMode === "points" && (
              <Input
                type="number"
                placeholder="Out of"
                aria-label={`Row ${index + 1} max points`}
                value={item.maxPoints ?? 100}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...item, maxPoints: Number(e.target.value) || 0 };
                  updateItems(next);
                }}
              />
            )}
          </div>
        )}
      />

      <div className="space-y-2 rounded-lg border border-[var(--color-border)] p-4">
        <Label htmlFor="paste-scores">Paste a class list of scores</Label>
        <p className="text-sm text-[var(--color-text-muted)]">
          Separate scores with commas, spaces, or new lines — for example a column copied from a spreadsheet.
          Use “18/20” style entries for points.
        </p>
        <textarea
          id="paste-scores"
          rows={3}
          value={pasted}
          onChange={(e) => setPasted(e.target.value)}
          placeholder="85, 92, 78, 64, 99"
          className="flex w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        />
        <Button type="button" variant="outline" onClick={applyPasted} disabled={!pasted.trim()}>
          Use these scores
        </Button>
      </div>

      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.warnings?.map((w) => (
        <p key={w} className="text-sm text-[var(--color-warning)]">{w}</p>
      ))}
      <ResultDisplay
        label="Average grade"
        percent={result.data?.average}
        letterGrade={result.data?.letterGrade}
        gpa={result.data?.gpa}
      />
      {result.data && (
        <>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Scores" value={String(result.data.count)} />
            <Stat label="Median" value={formatPercent(result.data.median)} />
            <Stat label="Highest" value={formatPercent(result.data.highest)} />
            <Stat label="Lowest" value={formatPercent(result.data.lowest)} />
          </dl>
          {result.data.totalPointsAverage != null && (
            <p className="text-sm text-[var(--color-text-muted)]">
              Total-points average (Σ earned ÷ Σ possible):{" "}
              <strong className="text-[var(--color-text)]">{formatPercent(result.data.totalPointsAverage)}</strong>.
              This differs from the average above when scores are out of different totals — bigger tests count
              more. Use whichever method your teacher or gradebook uses.
            </p>
          )}
          <p className="text-sm text-[var(--color-text-muted)]">
            Formula: average = sum of scores ÷ number of scores = {formatPercent(result.data.average)} across{" "}
            {result.data.count} {result.data.count === 1 ? "score" : "scores"}. Every score counts equally — use
            the weighted grade calculator if categories have different weights.
          </p>
        </>
      )}

      {getPrimaryFlow("average-grade-calculator") && result.data && (
        <NextStepCard flow={getPrimaryFlow("average-grade-calculator")!} />
      )}
    </div>
  );
}
