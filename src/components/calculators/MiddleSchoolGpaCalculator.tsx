"use client";

import * as React from "react";
import { calculatorBySlug } from "@/config/calculators";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { Input } from "@/components/ui/input";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

interface ClassRow {
  name: string;
  grade: string;
}

const defaultClasses: ClassRow[] = [
  { name: "English", grade: "A" },
  { name: "Math", grade: "B" },
  { name: "Science", grade: "A-" },
  { name: "History", grade: "B+" },
];

export function MiddleSchoolGpaCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence<{
    classes: ClassRow[];
  }>("middle-school-gpa-calculator", { classes: defaultClasses });
  const examples = calculatorBySlug["middle-school-gpa-calculator"].examples;
  const classes = Array.isArray(state.classes) && state.classes.length > 0 ? state.classes : defaultClasses;

  const result = React.useMemo(
    () =>
      calculateSemesterGpa(
        {
          courses: classes
            .filter((row) => row.grade.trim() !== "")
            .map((row) => ({ name: row.name, grade: row.grade, credits: 1 })),
        },
        "us-standard",
      ),
    [classes],
  );

  const update = (next: ClassRow[]) => setState({ classes: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-sm text-[var(--color-text-muted)]">
        Every class counts the same. There are no credit hours and no Honors or AP bonus. If your
        school ignores plus and minus, enter A, B, C, D, or F.
      </p>
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (!Array.isArray(values.classes)) return;
            update(
              values.classes.map((row) => {
                const item = row as Partial<ClassRow>;
                return { name: item.name ?? "", grade: String(item.grade ?? "B") };
              }),
            );
          }}
        />
      )}
      <DynamicRowList
        items={classes}
        addLabel="Add class"
        onAdd={() => update([...classes, { name: "", grade: "B" }])}
        onRemove={(index) => update(classes.filter((_, i) => i !== index))}
        renderRow={(row, index) => (
          <div className="grid gap-2 sm:grid-cols-2">
            <Input
              aria-label={`Class ${index + 1} name`}
              placeholder="Class"
              value={row.name}
              onChange={(event) => {
                const next = classes.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, name: event.target.value } : item,
                );
                update(next);
              }}
            />
            <Input
              aria-label={`Class ${index + 1} grade`}
              placeholder="A, B+, C"
              value={row.grade}
              onChange={(event) => {
                const next = classes.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, grade: event.target.value } : item,
                );
                update(next);
              }}
            />
          </div>
        )}
      />
      {result.errors?.[0] && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {result.errors[0]}
        </p>
      )}
      {result.data && (
        <div
          aria-live="polite"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
        >
          <p className="text-sm text-[var(--color-text-muted)]">Middle school GPA</p>
          <p className="text-5xl font-bold">{formatGpa(result.data.gpa)}</p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            {result.data.totalQualityPoints.toFixed(1)} grade points ÷ {result.data.totalCredits} classes.
            Each class has equal weight on the US 4.0 scale.
          </p>
        </div>
      )}
    </div>
  );
}
