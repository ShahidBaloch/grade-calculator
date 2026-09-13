"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateDegreeClassification } from "@/lib/calculators/degree-classification";
import type { DegreeModule } from "@/lib/calculators/degree-classification";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

const defaultModules: DegreeModule[] = [
  { name: "Public Law", mark: 68, credits: 30, year: 2 },
  { name: "Contract", mark: 64, credits: 30, year: 2 },
  { name: "Dissertation", mark: 72, credits: 40, year: 3 },
  { name: "Equity", mark: 66, credits: 20, year: 3 },
];

export function DegreeClassificationCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "degree-classification-calculator",
    { modules: defaultModules, year2Weight: 40, year3Weight: 60 },
  );
  const { modules, year2Weight, year3Weight } = state;

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "degree-classification-calculator");
  }, []);

  const result = React.useMemo(
    () => calculateDegreeClassification({ modules, year2Weight, year3Weight }),
    [modules, year2Weight, year3Weight],
  );

  const updateModules = (next: DegreeModule[]) => setState({ ...state, modules: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <p className="text-sm text-[var(--color-text-muted)]">
        Enter module marks and credits. If you include both Year 2 and Year 3, we apply your year
        weights (common pattern: 40% / 60%).
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="year2-weight">Year 2 weight (%)</Label>
          <Input
            id="year2-weight"
            type="number"
            min={0}
            max={100}
            value={year2Weight}
            onChange={(e) => setState({ ...state, year2Weight: Number(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year3-weight">Year 3 weight (%)</Label>
          <Input
            id="year3-weight"
            type="number"
            min={0}
            max={100}
            value={year3Weight}
            onChange={(e) => setState({ ...state, year3Weight: Number(e.target.value) || 0 })}
          />
        </div>
      </div>
      <DynamicRowList
        items={modules}
        addLabel="Add module"
        onAdd={() => updateModules([...modules, { name: "", mark: 60, credits: 20, year: 3 }])}
        onRemove={(index) => updateModules(modules.filter((_, i) => i !== index))}
        renderRow={(module, index) => {
          const update = (patch: Partial<DegreeModule>) => {
            const next = [...modules];
            next[index] = { ...module, ...patch };
            updateModules(next);
          };
          return (
            <div className="grid gap-2 sm:grid-cols-4">
              <Input
                placeholder="Module"
                aria-label={`Module ${index + 1} name`}
                value={module.name ?? ""}
                onChange={(e) => update({ name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Mark %"
                aria-label={`Module ${index + 1} mark`}
                value={module.mark}
                onChange={(e) => update({ mark: Number(e.target.value) || 0 })}
              />
              <Input
                type="number"
                placeholder="Credits"
                aria-label={`Module ${index + 1} credits`}
                value={module.credits}
                onChange={(e) => update({ credits: Number(e.target.value) || 0 })}
              />
              <Select
                value={String(module.year)}
                onValueChange={(value) => update({ year: Number(value) as 2 | 3 })}
              >
                <SelectTrigger aria-label={`Module ${index + 1} year`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }}
      />
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.warnings?.map((w) => (
        <p key={w} className="text-sm text-[var(--color-warning)]">{w}</p>
      ))}
      {result.data && (
        <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
          <Label>Predicted classification</Label>
          <p className="text-3xl font-bold sm:text-4xl">{result.data.classification}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Overall mark {result.data.average.toFixed(2)}%
            {result.data.usedYearWeighting &&
              ` · Y2 ${result.data.year2Average?.toFixed(1)}% · Y3 ${result.data.year3Average?.toFixed(1)}%`}
          </p>
          {result.data.marksToNext != null && result.data.nextClassification && (
            <p className="mt-2 text-sm">
              {result.data.marksToNext.toFixed(1)} marks to a {result.data.nextClassification}
            </p>
          )}
          <FormulaBreakdown steps={result.data.formulaSteps} />
        </div>
      )}
      {getPrimaryFlow("degree-classification-calculator") && result.status !== "error" && (
        <NextStepCard flow={getPrimaryFlow("degree-classification-calculator")!} />
      )}
    </div>
  );
}
