"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateHighSchoolGpa } from "@/lib/calculators/high-school-gpa";
import { formatGpa } from "@/lib/utils/format";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

interface CourseRow {
  name: string;
  grade: string;
  credits: number;
}

interface PeriodRow {
  name: string;
  courses: CourseRow[];
}

const defaultPeriods: PeriodRow[] = [
  {
    name: "Fall Semester",
    courses: [
      { name: "English", grade: "A", credits: 1 },
      { name: "Algebra", grade: "B+", credits: 1 },
    ],
  },
  {
    name: "Spring Semester",
    courses: [
      { name: "Biology", grade: "A-", credits: 1 },
      { name: "History", grade: "B", credits: 1 },
    ],
  },
];

export function HighSchoolGpaCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "high-school-gpa-calculator",
    { periods: defaultPeriods, weighted: false },
  );
  const { periods, weighted } = state;

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "high-school-gpa-calculator");
  }, []);

  const result = React.useMemo(
    () =>
      calculateHighSchoolGpa(
        { periods },
        scaleId,
        { useWeightedScale: weighted },
      ),
    [periods, scaleId, weighted],
  );

  const updatePeriods = (next: PeriodRow[]) => setState({ periods: next, weighted });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <ScaleSelector />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={weighted}
          onChange={(e) => setState({ periods, weighted: e.target.checked })}
        />
        Use weighted GPA (Honors/AP)
      </label>
      {periods.map((period, periodIndex) => (
        <div key={periodIndex} className="rounded-lg border border-[var(--color-border)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Input
              value={period.name}
              onChange={(e) => {
                const next = [...periods];
                next[periodIndex] = { ...period, name: e.target.value };
                updatePeriods(next);
              }}
            />
            {periods.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => updatePeriods(periods.filter((_, i) => i !== periodIndex))}
              >
                Remove period
              </Button>
            )}
          </div>
          <DynamicRowList
            items={period.courses}
            onAdd={() => {
              const next = [...periods];
              next[periodIndex] = {
                ...period,
                courses: [...period.courses, { name: "", grade: "B", credits: 1 }],
              };
              updatePeriods(next);
            }}
            onRemove={(courseIndex) => {
              const next = [...periods];
              next[periodIndex] = {
                ...period,
                courses: period.courses.filter((_, i) => i !== courseIndex),
              };
              updatePeriods(next);
            }}
            addLabel="Add course"
            renderRow={(course, courseIndex) => (
              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  placeholder="Course"
                  value={course.name}
                  onChange={(e) => {
                    const next = [...periods];
                    const courses = [...period.courses];
                    courses[courseIndex] = { ...course, name: e.target.value };
                    next[periodIndex] = { ...period, courses };
                    updatePeriods(next);
                  }}
                />
                <Input
                  placeholder="Grade"
                  value={course.grade}
                  onChange={(e) => {
                    const next = [...periods];
                    const courses = [...period.courses];
                    courses[courseIndex] = { ...course, grade: e.target.value };
                    next[periodIndex] = { ...period, courses };
                    updatePeriods(next);
                  }}
                />
                <Input
                  type="number"
                  placeholder="Credits"
                  value={course.credits}
                  onChange={(e) => {
                    const next = [...periods];
                    const courses = [...period.courses];
                    courses[courseIndex] = { ...course, credits: Number(e.target.value) || 0 };
                    next[periodIndex] = { ...period, courses };
                    updatePeriods(next);
                  }}
                />
              </div>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          updatePeriods([...periods, { name: `Period ${periods.length + 1}`, courses: [{ name: "", grade: "B", credits: 1 }] }])
        }
      >
        Add semester / quarter
      </Button>
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.data && (
        <>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
            <Label>Overall GPA</Label>
            <p className="text-5xl font-bold">{formatGpa(result.data.gpa)}</p>
          </div>
          {result.data.periods.length > 1 && (
            <div className="space-y-2">
              <Label>By period</Label>
              {result.data.periods.map((p) => (
                <p key={p.name} className="text-sm text-[var(--color-text-muted)]">
                  {p.name}: {formatGpa(p.gpa)}
                </p>
              ))}
            </div>
          )}
        </>
      )}
      {getPrimaryFlow("high-school-gpa-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("high-school-gpa-calculator")!} />
      )}
    </div>
  );
}
