"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateWeightedGpa } from "@/lib/calculators/weighted-gpa";
import type { CourseWeightType } from "@/lib/calculators/schemas/gpa.schema";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

interface CourseRow {
  name: string;
  grade: string;
  credits: number;
  courseType: CourseWeightType;
}

const defaultCourses: CourseRow[] = [
  { name: "AP English", grade: "A", credits: 3, courseType: "ap" },
  { name: "Honors Math", grade: "B+", credits: 3, courseType: "honors" },
  { name: "History", grade: "A-", credits: 3, courseType: "regular" },
];

export function WeightedGpaCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("weighted-gpa-calculator", {
    courses: defaultCourses,
  });
  const { courses } = state;
  const examples = calculatorBySlug["weighted-gpa-calculator"].examples;

  const result = React.useMemo(
    () => calculateWeightedGpa({ courses }, scaleId),
    [courses, scaleId],
  );

  const updateCourses = (next: CourseRow[]) => setState({ courses: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (!Array.isArray(values.courses)) return;
            updateCourses(
              values.courses.map((row, index) => {
                const course = row as Partial<CourseRow>;
                return {
                  name: course.name ?? `Course ${index + 1}`,
                  grade: String(course.grade ?? "B"),
                  credits: typeof course.credits === "number" ? course.credits : 3,
                  courseType: course.courseType ?? "regular",
                };
              }),
            );
          }}
        />
      )}
      <ScaleSelector />
      <p className="text-sm text-[var(--color-text-muted)]">
        Honors courses get +0.5 GPA points; AP/IB courses get +1.0. Check your school&apos;s policy.
      </p>
      <DynamicRowList
        items={courses}
        onAdd={() => updateCourses([...courses, { name: "", grade: "B", credits: 3, courseType: "regular" }])}
        onRemove={(index) => updateCourses(courses.filter((_, i) => i !== index))}
        addLabel="Add course"
        renderRow={(course, index) => (
          <div className="grid gap-2 sm:grid-cols-4">
            <Input
              aria-label={`Course ${index + 1} name`}
              placeholder="Course"
              value={course.name}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, name: e.target.value };
                updateCourses(next);
              }}
            />
            <Input
              aria-label={`Course ${index + 1} grade`}
              placeholder="Grade"
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
              placeholder="Credits"
              value={course.credits}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, credits: Number(e.target.value) || 0 };
                updateCourses(next);
              }}
            />
            <Select
              value={course.courseType}
              onValueChange={(value: CourseWeightType) => {
                const next = [...courses];
                next[index] = { ...course, courseType: value };
                updateCourses(next);
              }}
            >
              <SelectTrigger aria-label={`Course ${index + 1} type`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="honors">Honors (+0.5)</SelectItem>
                <SelectItem value="ap">AP (+1.0)</SelectItem>
                <SelectItem value="ib">IB (+1.0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.warnings?.map((w) => (
        <p key={w} className="text-sm text-[var(--color-warning)]">{w}</p>
      ))}
      <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
        <Label>Weighted GPA</Label>
        <p className="text-5xl font-bold">{result.data ? formatGpa(result.data.gpa) : "—"}</p>
        {result.data && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {result.data.totalCredits} credit hours
          </p>
        )}
      </div>
      {getPrimaryFlow("weighted-gpa-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("weighted-gpa-calculator")!} />
      )}
    </div>
  );
}
