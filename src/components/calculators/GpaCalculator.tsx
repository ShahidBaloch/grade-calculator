"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";
import { formatGpa } from "@/lib/utils/format";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useGradingScale } from "@/hooks/useGradingScale";

export function GpaCalculator() {
  const { scaleId } = useGradingScale();
  const [courses, setCourses] = React.useState([
    { name: "English", grade: "A", credits: 3 },
    { name: "Math", grade: "B+", credits: 3 },
    { name: "History", grade: "A-", credits: 3 },
  ]);

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "gpa-calculator");
  }, []);

  const result = React.useMemo(
    () => calculateSemesterGpa({ courses }, scaleId),
    [courses, scaleId],
  );

  return (
    <div className="space-y-6">
      <ScaleSelector />
      <DynamicRowList
        items={courses}
        onAdd={() => setCourses([...courses, { name: "", grade: "B", credits: 3 }])}
        onRemove={(index) => setCourses(courses.filter((_, i) => i !== index))}
        addLabel="Add course"
        renderRow={(course, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              placeholder="Course"
              value={course.name}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, name: e.target.value };
                setCourses(next);
              }}
            />
            <Input
              placeholder="Grade (A, B+, 92)"
              value={course.grade}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, grade: e.target.value };
                setCourses(next);
              }}
            />
            <Input
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
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
        <p className="text-sm text-[var(--color-text-muted)]">Semester GPA</p>
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
