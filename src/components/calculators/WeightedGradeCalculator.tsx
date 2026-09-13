"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { ResultDisplay } from "@/components/calculators/shared/ResultDisplay";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateWeightedGrade } from "@/lib/calculators/weighted-grade";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useGradingScale } from "@/hooks/useGradingScale";
import type { WeightedGradeInput } from "@/lib/calculators/schemas/weighted-grade.schema";

const defaultRow = { name: "", score: 0, weight: 0 };

export function WeightedGradeCalculator() {
  const { scaleId } = useGradingScale();
  const [globalMode, setGlobalMode] = React.useState<WeightedGradeInput["globalMode"]>("percentage");
  const [weightMode, setWeightMode] = React.useState<WeightedGradeInput["weightMode"]>("percent");
  const [items, setItems] = React.useState<
    Array<{ name: string; score: number | string; weight: number }>
  >([
    { name: "Homework", score: 92, weight: 20 },
    { name: "Midterm", score: 85, weight: 30 },
    { name: "Final", score: 88, weight: 50 },
  ]);

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "weighted-grade-calculator");
  }, []);

  const result = React.useMemo(
    () => calculateWeightedGrade({ globalMode, weightMode, items }, scaleId),
    [globalMode, weightMode, items, scaleId],
  );

  return (
    <div className="space-y-6">
      <ScaleSelector />
      <DynamicRowList
        items={items}
        onAdd={() => setItems([...items, { ...defaultRow }])}
        onRemove={(index) => setItems(items.filter((_, i) => i !== index))}
        renderRow={(item, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              placeholder="Name"
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, name: e.target.value };
                setItems(next);
              }}
            />
            <Input
              type={globalMode === "letter" ? "text" : "number"}
              placeholder="Score"
              value={item.score}
              onChange={(e) => {
                const next = [...items];
                next[index] = {
                  ...item,
                  score: globalMode === "letter" ? e.target.value : Number(e.target.value) || 0,
                };
                setItems(next);
              }}
            />
            <Input
              type="number"
              placeholder="Weight"
              value={item.weight}
              onChange={(e) => {
                const next = [...items];
                next[index] = { ...item, weight: Number(e.target.value) || 0 };
                setItems(next);
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
      {getPrimaryFlow("weighted-grade-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("weighted-grade-calculator")!} />
      )}
    </div>
  );
}
