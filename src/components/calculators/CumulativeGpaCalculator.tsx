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
import { calculateCumulativeGpa } from "@/lib/calculators/cumulative-gpa";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { useGradingScale } from "@/hooks/useGradingScale";

const defaultCourses = [
  { name: "Biology", grade: "A", credits: 4 },
  { name: "Chemistry", grade: "B+", credits: 4 },
  { name: "Psychology", grade: "A-", credits: 3 },
];

export function CumulativeGpaCalculator() {
  const { scaleId } = useGradingScale();
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "cumulative-gpa-calculator",
    {
      previousGpa: 3.5 as number | "",
      previousCredits: 30 as number | "",
      courses: defaultCourses,
    },
  );
  const { previousGpa, previousCredits, courses } = state;
  const examples = calculatorBySlug["cumulative-gpa-calculator"].examples;

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
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              ...state,
              previousGpa: typeof values.previousGpa === "number" ? values.previousGpa : state.previousGpa,
              previousCredits:
                typeof values.previousCredits === "number" ? values.previousCredits : state.previousCredits,
            })
          }
        />
      )}
      <ScaleSelector />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="previous-gpa">Previous cumulative GPA (optional)</Label>
          <Input
            id="previous-gpa"
            type="number"
            step="0.01"
            min={0}
            max={5}
            value={previousGpa}
            onChange={(e) =>
              setState({ ...state, previousGpa: e.target.value === "" ? "" : Number(e.target.value) })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="previous-credits">Previous credits (optional)</Label>
          <Input
            id="previous-credits"
            type="number"
            min={0}
            value={previousCredits}
            onChange={(e) =>
              setState({
                ...state,
                previousCredits: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
          />
        </div>
      </div>
      <DynamicRowList
        items={courses}
        onAdd={() => setState({ ...state, courses: [...courses, { name: "", grade: "B", credits: 3 }] })}
        onRemove={(index) => setState({ ...state, courses: courses.filter((_, i) => i !== index) })}
        addLabel="Add course"
        renderRow={(course, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              placeholder="Course"
              value={course.name}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, name: e.target.value };
                setState({ ...state, courses: next });
              }}
            />
            <Input
              placeholder="Grade"
              value={course.grade}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, grade: e.target.value };
                setState({ ...state, courses: next });
              }}
            />
            <Input
              type="number"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, credits: Number(e.target.value) || 0 };
                setState({ ...state, courses: next });
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
