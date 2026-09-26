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
import { calculateSemesterGpa } from "@/lib/calculators/gpa";
import {
  defaultCoursesForScale,
  defaultGradeForScale,
  gradePlaceholderForScale,
  semesterResultLabel,
} from "@/lib/calculators/gpa-defaults";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

export function GpaCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied, hydrated } = useCalculatorPersistence("gpa-calculator", {
    courses: defaultCoursesForScale(scaleId),
  });
  const { courses } = state;
  const setCourses = (next: typeof courses) => setState({ courses: next });
  const examples = calculatorBySlug["gpa-calculator"].examples;

  React.useEffect(() => {
    if (!hydrated) return;
    const check = calculateSemesterGpa({ courses }, scaleId);
    if (check.errors?.some((e) => e.toLowerCase().includes("invalid"))) {
      setCourses(defaultCoursesForScale(scaleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, scaleId]);

  const result = React.useMemo(
    () => calculateSemesterGpa({ courses }, scaleId),
    [courses, scaleId],
  );

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (Array.isArray(values.courses)) {
              setCourses(
                values.courses.map((row, index) => {
                  const course = row as { name?: string; grade?: string | number; credits?: number };
                  return {
                    name: course.name ?? `Course ${index + 1}`,
                    grade: String(course.grade ?? "B"),
                    credits: typeof course.credits === "number" ? course.credits : 3,
                  };
                }),
              );
            }
          }}
        />
      )}
      <ScaleSelector />
      <div className="hidden gap-2 text-xs text-[var(--color-text-muted)] sm:grid sm:grid-cols-3">
        <span>Course</span>
        <span>Grade</span>
        <span>Credits</span>
      </div>
      <DynamicRowList
        items={courses}
        onAdd={() => setCourses([...courses, { name: "", grade: defaultGradeForScale(scaleId), credits: 3 }])}
        onRemove={(index) => setCourses(courses.filter((_, i) => i !== index))}
        addLabel="Add course"
        renderRow={(course, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              aria-label={`Course ${index + 1} name`}
              placeholder="Course"
              value={course.name}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, name: e.target.value };
                setCourses(next);
              }}
            />
            <Input
              aria-label={`Course ${index + 1} grade`}
              placeholder={gradePlaceholderForScale(scaleId)}
              value={course.grade}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, grade: e.target.value };
                setCourses(next);
              }}
            />
            <Input
              aria-label={`Course ${index + 1} credits`}
              type="number"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, credits: Number(e.target.value) || 0 };
                setCourses(next);
              }}
            />
          </div>
        )}
      />
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">
          {e}
        </p>
      ))}
      <div
        aria-live="polite"
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
      >
        <p className="text-sm text-[var(--color-text-muted)]">{semesterResultLabel(scaleId)}</p>
        <p className="text-5xl font-bold">{result.data ? formatGpa(result.data.gpa) : "—"}</p>
        {result.data && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {result.data.totalCredits} credit hours
          </p>
        )}
      </div>
      {getPrimaryFlow("gpa-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("gpa-calculator")!} />
      )}
    </div>
  );
}
