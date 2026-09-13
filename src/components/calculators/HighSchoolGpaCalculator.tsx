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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateHighSchoolGpa } from "@/lib/calculators/high-school-gpa";
import type { CourseWeightType } from "@/lib/calculators/schemas/gpa.schema";
import { formatGpa } from "@/lib/utils/format";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

interface CourseRow {
  name: string;
  grade: string;
  credits: number;
  courseType: CourseWeightType;
}

interface PeriodRow {
  name: string;
  courses: CourseRow[];
}

const defaultCourse: CourseRow = { name: "", grade: "B", credits: 1, courseType: "regular" };

const defaultPeriods: PeriodRow[] = [
  {
    name: "Fall Semester",
    courses: [
      { name: "English", grade: "A", credits: 1, courseType: "regular" },
      { name: "Honors Algebra", grade: "B+", credits: 1, courseType: "honors" },
    ],
  },
  {
    name: "Spring Semester",
    courses: [
      { name: "AP Biology", grade: "A-", credits: 1, courseType: "ap" },
      { name: "History", grade: "B", credits: 1, courseType: "regular" },
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
      {weighted && (
        <p className="text-sm text-[var(--color-text-muted)]">
          Set each course to Regular, Honors (+0.5), AP (+1.0), or IB (+1.0). Check your school&apos;s policy.
        </p>
      )}
      {periods.map((period, periodIndex) => (
        <div key={periodIndex} className="rounded-lg border border-[var(--color-border)] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Input
              aria-label={`Period ${periodIndex + 1} name`}
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
                courses: [...period.courses, { ...defaultCourse }],
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
            renderRow={(course, courseIndex) => {
              const updateCourse = (patch: Partial<CourseRow>) => {
                const next = [...periods];
                const courses = [...period.courses];
                courses[courseIndex] = { ...course, courseType: course.courseType ?? "regular", ...patch };
                next[periodIndex] = { ...period, courses };
                updatePeriods(next);
              };

              return (
                <div className={`grid gap-2 ${weighted ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
                  <Input
                    aria-label={`${period.name || "Period"} course ${courseIndex + 1} name`}
                    placeholder="Course"
                    value={course.name}
                    onChange={(e) => updateCourse({ name: e.target.value })}
                  />
                  <Input
                    aria-label={`${period.name || "Period"} course ${courseIndex + 1} grade`}
                    placeholder="Grade"
                    value={course.grade}
                    onChange={(e) => updateCourse({ grade: e.target.value })}
                  />
                  <Input
                    aria-label={`${period.name || "Period"} course ${courseIndex + 1} credits`}
                    type="number"
                    placeholder="Credits"
                    value={course.credits}
                    onChange={(e) => updateCourse({ credits: Number(e.target.value) || 0 })}
                  />
                  {weighted && (
                    <Select
                      value={course.courseType ?? "regular"}
                      onValueChange={(value: CourseWeightType) => updateCourse({ courseType: value })}
                    >
                      <SelectTrigger aria-label={`Course type for ${course.name || `row ${courseIndex + 1}`}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="honors">Honors (+0.5)</SelectItem>
                        <SelectItem value="ap">AP (+1.0)</SelectItem>
                        <SelectItem value="ib">IB (+1.0)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              );
            }}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          updatePeriods([...periods, { name: `Period ${periods.length + 1}`, courses: [{ ...defaultCourse }] }])
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
