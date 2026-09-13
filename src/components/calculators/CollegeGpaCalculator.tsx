"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";
import { getScaleMaxGpa } from "@/lib/grading-scales";
import { formatGpa } from "@/lib/utils/format";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

interface CourseRow {
  name: string;
  grade: string;
  credits: number;
  countsTowardGpa: boolean;
}

const defaultCourses: CourseRow[] = [
  { name: "Intro to Psychology", grade: "A", credits: 3, countsTowardGpa: true },
  { name: "Calculus I", grade: "B+", credits: 4, countsTowardGpa: true },
  { name: "English Composition", grade: "A-", credits: 3, countsTowardGpa: true },
];

export function CollegeGpaCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("college-gpa-calculator", {
    courses: defaultCourses,
  });
  const { courses } = state;
  const examples = calculatorBySlug["college-gpa-calculator"].examples;

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "college-gpa-calculator");
  }, []);

  const maxGpa = getScaleMaxGpa(scaleId);
  const excludedCount = courses.filter((course) => course.countsTowardGpa === false).length;

  const result = React.useMemo(
    () =>
      calculateSemesterGpa(
        { courses: courses.filter((course) => course.countsTowardGpa !== false) },
        scaleId,
      ),
    [courses, scaleId],
  );

  const standing = result.data
    ? result.data.gpa / maxGpa >= 0.875
      ? "Typical dean's-list range on this scale (about 3.5+ on 4.0)."
      : result.data.gpa / maxGpa >= 0.5
        ? "Typical good academic standing (about 2.0+ on 4.0). Confirm your catalog."
        : "Below a common good-standing cutoff. Check probation rules with your college."
    : null;

  const updateCourses = (next: CourseRow[]) => setState({ courses: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (Array.isArray(values.courses)) {
              updateCourses(
                values.courses.map((row, index) => {
                  const course = row as Partial<CourseRow>;
                  return {
                    name: course.name ?? `Course ${index + 1}`,
                    grade: String(course.grade ?? "B"),
                    credits: typeof course.credits === "number" ? course.credits : 3,
                    countsTowardGpa: course.countsTowardGpa !== false,
                  };
                }),
              );
            }
          }}
        />
      )}
      <ScaleSelector />
      <p className="text-sm text-[var(--color-text-muted)]">
        Credit hours usually range from 1–5. Uncheck pass/fail, audits, and other courses your registrar
        excludes from GPA.
      </p>
      <div className="hidden gap-2 text-xs text-[var(--color-text-muted)] sm:grid sm:grid-cols-[1fr_1fr_6rem_auto]">
        <span>Course</span>
        <span>Grade</span>
        <span>Credits</span>
        <span>In GPA</span>
      </div>
      <DynamicRowList
        items={courses}
        onAdd={() =>
          updateCourses([...courses, { name: "", grade: "B", credits: 3, countsTowardGpa: true }])
        }
        onRemove={(index) => updateCourses(courses.filter((_, i) => i !== index))}
        addLabel="Add course"
        renderRow={(course, index) => (
          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_6rem_auto] sm:items-center">
            <Input
              aria-label={`Course ${index + 1} name`}
              placeholder="Course name"
              value={course.name}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, name: e.target.value };
                updateCourses(next);
              }}
            />
            <Input
              aria-label={`Course ${index + 1} grade`}
              placeholder="Grade (A, B+, 92)"
              value={course.grade}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, grade: e.target.value };
                updateCourses(next);
              }}
            />
            <Input
              aria-label={`Course ${index + 1} credits`}
              type="number"
              step="0.5"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, credits: Number(e.target.value) || 0 };
                updateCourses(next);
              }}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={course.countsTowardGpa !== false}
                onChange={(e) => {
                  const next = [...courses];
                  next[index] = { ...course, countsTowardGpa: e.target.checked };
                  updateCourses(next);
                }}
              />
              In GPA
            </label>
          </div>
        )}
      />
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
        <Label>College term GPA</Label>
        <p className="text-5xl font-bold">{result.data ? formatGpa(result.data.gpa) : "—"}</p>
        {result.data && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {result.data.totalCredits} letter-graded credit hours · {result.data.totalQualityPoints.toFixed(1)}{" "}
            quality points
            {excludedCount > 0 ? ` · ${excludedCount} excluded` : ""}
          </p>
        )}
        {standing && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{standing}</p>}
      </div>
      {getPrimaryFlow("college-gpa-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("college-gpa-calculator")!} />
      )}
    </div>
  );
}
