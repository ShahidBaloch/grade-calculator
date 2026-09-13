"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";
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

const defaultCourses: CourseRow[] = [
  { name: "Intro to Psychology", grade: "A", credits: 3 },
  { name: "Calculus I", grade: "B+", credits: 4 },
  { name: "English Composition", grade: "A-", credits: 3 },
];

export function CollegeGpaCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("college-gpa-calculator", {
    courses: defaultCourses,
  });
  const { courses } = state;

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "college-gpa-calculator");
  }, []);

  const result = React.useMemo(
    () => calculateSemesterGpa({ courses }, scaleId),
    [courses, scaleId],
  );

  const updateCourses = (next: CourseRow[]) => setState({ courses: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <ScaleSelector />
      <p className="text-sm text-[var(--color-text-muted)]">
        Enter each college course with letter grade and credit hours (typically 1–5 per class).
      </p>
      <DynamicRowList
        items={courses}
        onAdd={() => updateCourses([...courses, { name: "", grade: "B", credits: 3 }])}
        onRemove={(index) => updateCourses(courses.filter((_, i) => i !== index))}
        addLabel="Add course"
        renderRow={(course, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              placeholder="Course name"
              value={course.name}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, name: e.target.value };
                updateCourses(next);
              }}
            />
            <Input
              placeholder="Grade (A, B+, 92)"
              value={course.grade}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, grade: e.target.value };
                updateCourses(next);
              }}
            />
            <Input
              type="number"
              step="0.5"
              placeholder="Credit hours"
              value={course.credits}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, credits: Number(e.target.value) || 0 };
                updateCourses(next);
              }}
            />
          </div>
        )}
      />
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
        <Label>Semester GPA</Label>
        <p className="text-5xl font-bold">{result.data ? formatGpa(result.data.gpa) : "—"}</p>
        {result.data && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {result.data.totalCredits} credit hours · {result.data.totalQualityPoints.toFixed(1)} quality points
          </p>
        )}
      </div>
      {getPrimaryFlow("college-gpa-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("college-gpa-calculator")!} />
      )}
    </div>
  );
}
