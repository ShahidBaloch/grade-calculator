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
import { calculateCanvasGrade } from "@/lib/calculators/canvas-grade";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

interface GroupRow {
  name: string;
  score: number;
  weight: number;
}

const defaultGroups: GroupRow[] = [
  { name: "Assignments", score: 92, weight: 30 },
  { name: "Quizzes", score: 88, weight: 20 },
  { name: "Midterm", score: 85, weight: 20 },
  { name: "Final", score: 90, weight: 30 },
];

export function CanvasGradeCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("canvas-grade-calculator", {
    groups: defaultGroups,
  });
  const { groups } = state;
  const examples = calculatorBySlug["canvas-grade-calculator"].examples;

  const result = React.useMemo(
    () => calculateCanvasGrade({ groups }, scaleId),
    [groups, scaleId],
  );

  const updateGroups = (next: GroupRow[]) => setState({ groups: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (!Array.isArray(values.groups)) return;
            updateGroups(
              values.groups.map((row, index) => {
                const group = row as { name?: string; score?: number; current?: number; weight?: number };
                return {
                  name: group.name ?? `Group ${index + 1}`,
                  score: typeof group.score === "number" ? group.score : (group.current ?? 0),
                  weight: typeof group.weight === "number" ? group.weight : 0,
                };
              }),
            );
          }}
        />
      )}
      <ScaleSelector />
      <p className="text-sm text-[var(--color-text-muted)]">
        Enter each Canvas assignment group with its average score and weight percentage.
      </p>
      <DynamicRowList
        items={groups}
        onAdd={() => updateGroups([...groups, { name: "Group", score: 0, weight: 0 }])}
        onRemove={(index) => updateGroups(groups.filter((_, i) => i !== index))}
        addLabel="Add assignment group"
        renderRow={(group, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              aria-label={`Assignment group ${index + 1} name`}
              placeholder="Group name"
              value={group.name}
              onChange={(e) => {
                const next = [...groups];
                next[index] = { ...group, name: e.target.value };
                updateGroups(next);
              }}
            />
            <Input
              aria-label={`Assignment group ${index + 1} score`}
              type="number"
              placeholder="Score %"
              value={group.score}
              onChange={(e) => {
                const next = [...groups];
                next[index] = { ...group, score: Number(e.target.value) };
                updateGroups(next);
              }}
            />
            <Input
              aria-label={`Assignment group ${index + 1} weight`}
              type="number"
              placeholder="Weight %"
              value={group.weight}
              onChange={(e) => {
                const next = [...groups];
                next[index] = { ...group, weight: Number(e.target.value) };
                updateGroups(next);
              }}
            />
          </div>
        )}
      />
      {result.warnings?.map((w) => (
        <p key={w} className="text-sm text-[var(--color-warning)]">{w}</p>
      ))}
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.data && (
        <ResultDisplay
          label="Canvas course grade"
          percent={result.data.courseGrade}
          letterGrade={result.data.letter}
          gpa={result.data.gpa}
        />
      )}
      {getPrimaryFlow("canvas-grade-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("canvas-grade-calculator")!} />
      )}
    </div>
  );
}
