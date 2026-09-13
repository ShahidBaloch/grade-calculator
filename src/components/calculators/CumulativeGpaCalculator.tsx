"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { ScaleSelector } from "@/components/calculators/shared/ScaleSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateCumulativeGpa } from "@/lib/calculators/cumulative-gpa";
import { formatGpa } from "@/lib/utils/format";
import { STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils/storage";
import { useGradingScale } from "@/hooks/useGradingScale";

export function CumulativeGpaCalculator() {
  const { scaleId } = useGradingScale();
  const [previousGpa, setPreviousGpa] = React.useState<number | "">(3.5);
  const [previousCredits, setPreviousCredits] = React.useState<number | "">(30);
  const [courses, setCourses] = React.useState([
    { name: "Biology", grade: "A", credits: 4 },
    { name: "Chemistry", grade: "B+", credits: 4 },
    { name: "Psychology", grade: "A-", credits: 3 },
  ]);

  React.useEffect(() => {
    setStorageItem(STORAGE_KEYS.recentCalculator, "cumulative-gpa-calculator");
  }, []);

  const result = React.useMemo(
    () =>
      calculateCumulativeGpa(
        {
          previousGpa: previousGpa === "" ? 0 : previousGpa,
          previousCredits: previousCredits === "" ? 0 : previousCredits,
          courses,
        },
        scaleId,
      ),
    [previousGpa, previousCredits, courses, scaleId],
  );

  return (
    <div className="space-y-6">
      <ScaleSelector />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Previous cumulative GPA (optional)</Label>
          <Input
            type="number"
            step="0.01"
            min={0}
            max={5}
            value={previousGpa}
            onChange={(e) => setPreviousGpa(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Previous credits (optional)</Label>
          <Input
            type="number"
            min={0}
            value={previousCredits}
            onChange={(e) => setPreviousCredits(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      </div>
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
              placeholder="Grade"
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
        <p className="text-sm text-[var(--color-text-muted)]">Cumulative GPA</p>
        <p className="text-5xl font-bold">{result.data ? formatGpa(result.data.cumulativeGpa) : "—"}</p>
        {result.data && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            This semester: {formatGpa(result.data.semesterGpa)} · {result.data.totalCredits} total credits
          </p>
        )}
      </div>
      {getPrimaryFlow("cumulative-gpa-calculator") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("cumulative-gpa-calculator")!} />
      )}
    </div>
  );
}
