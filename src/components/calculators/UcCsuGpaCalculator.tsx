"use client";

import * as React from "react";
import { calculatorBySlug } from "@/config/calculators";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateUcCsuGpa,
  type AgCourseKind,
  type AgYear,
  type UcCsuSystem,
  type UcResidency,
} from "@/lib/calculators/uc-csu-gpa";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

interface CourseRow {
  name: string;
  grade: string;
  year: AgYear;
  kind: AgCourseKind;
}

interface CalculatorState {
  system: UcCsuSystem;
  residency: UcResidency;
  courses: CourseRow[];
}

const selectClass =
  "flex h-11 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]";

const defaultCourses: CourseRow[] = [
  { name: "English", grade: "A", year: "10", kind: "regular" },
  { name: "Honors Chemistry", grade: "A", year: "10", kind: "honors" },
  { name: "AP US History", grade: "B+", year: "11", kind: "ap-ib" },
  { name: "Math", grade: "B", year: "11", kind: "regular" },
];

const emptyCourse: CourseRow = { name: "", grade: "B", year: "11", kind: "regular" };

function formatExact(value: number): string {
  const text = value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return text;
}

export function UcCsuGpaCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence<CalculatorState>(
    "uc-gpa-calculator",
    { system: "uc", residency: "resident", courses: defaultCourses },
  );
  const examples = calculatorBySlug["uc-gpa-calculator"].examples;
  const system = state.system === "csu" ? "csu" : "uc";
  const residency = state.residency === "nonresident" ? "nonresident" : "resident";
  const courses = Array.isArray(state.courses) && state.courses.length > 0 ? state.courses : defaultCourses;

  const result = React.useMemo(
    () => calculateUcCsuGpa({ system, residency, courses }),
    [system, residency, courses],
  );

  const updateCourses = (next: CourseRow[]) => setState({ system, residency, courses: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-sm text-[var(--color-text-muted)]">
        Planning estimate for California a-g GPA. One row is one semester. A year-long class is two
        rows. Pluses and minuses do not change the points. UC and CSU calculate the official GPA on
        the application.
      </p>
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            const nextSystem = values.system === "csu" ? "csu" : "uc";
            const nextResidency = values.residency === "nonresident" ? "nonresident" : "resident";
            const nextCourses = Array.isArray(values.courses)
              ? values.courses.map((row) => {
                  const course = row as Partial<CourseRow>;
                  const year: AgYear = course.year === "12" || course.year === "10" ? course.year : "11";
                  const kind: AgCourseKind =
                    course.kind === "honors" || course.kind === "ap-ib" || course.kind === "college"
                      ? course.kind
                      : "regular";
                  return {
                    name: course.name ?? "",
                    grade: String(course.grade ?? "B"),
                    year,
                    kind,
                  };
                })
              : courses;
            setState({ system: nextSystem, residency: nextResidency, courses: nextCourses });
          }}
        />
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={system === "uc" ? "default" : "outline"}
          onClick={() => setState({ system: "uc", residency, courses })}
        >
          UC GPA
        </Button>
        <Button
          type="button"
          variant={system === "csu" ? "default" : "outline"}
          onClick={() => setState({ system: "csu", residency, courses })}
        >
          CSU GPA
        </Button>
      </div>

      {system === "uc" && (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={residency === "resident" ? "default" : "outline"}
            size="sm"
            onClick={() => setState({ system, residency: "resident", courses })}
          >
            California resident
          </Button>
          <Button
            type="button"
            variant={residency === "nonresident" ? "default" : "outline"}
            size="sm"
            onClick={() => setState({ system, residency: "nonresident", courses })}
          >
            Nonresident
          </Button>
        </div>
      )}

      <p className="text-sm text-[var(--color-text-muted)]">
        {system === "uc"
          ? "UC uses 10th and 11th grade only, including summers after 9th, 10th, and 11th. Up to 8 honors points, and no more than 4 of those from 10th grade. A C- does not get the extra point."
          : "CSU uses grades after 9th grade, including 12th. Up to 8 honors points, and no more than 2 of those from 10th grade. A C- can get the extra point."}
      </p>

      <DynamicRowList
        items={courses}
        addLabel="Add semester"
        onAdd={() => updateCourses([...courses, { ...emptyCourse }])}
        onRemove={(index) => updateCourses(courses.filter((_, i) => i !== index))}
        renderRow={(course, index) => {
          const patch = (next: Partial<CourseRow>) => {
            const rows = courses.map((row, rowIndex) => (rowIndex === index ? { ...row, ...next } : row));
            updateCourses(rows);
          };
          return (
            <div className="grid gap-2 sm:grid-cols-4">
              <Input
                aria-label={`Course ${index + 1} name`}
                placeholder="Course"
                value={course.name}
                onChange={(event) => patch({ name: event.target.value })}
              />
              <div className="space-y-1">
                <Label className="sr-only" htmlFor={`grade-${index}`}>
                  Grade
                </Label>
                <select
                  id={`grade-${index}`}
                  aria-label={`Course ${index + 1} grade`}
                  className={selectClass}
                  value={course.grade}
                  onChange={(event) => patch({ grade: event.target.value })}
                >
                  {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"].map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
              <select
                aria-label={`Course ${index + 1} grade level`}
                className={selectClass}
                value={course.year}
                onChange={(event) => patch({ year: event.target.value as AgYear })}
              >
                <option value="10">10th grade</option>
                <option value="11">11th grade</option>
                <option value="12">12th grade</option>
              </select>
              <select
                aria-label={`Course ${index + 1} type`}
                className={selectClass}
                value={course.kind}
                onChange={(event) => patch({ kind: event.target.value as AgCourseKind })}
              >
                <option value="regular">Regular a-g</option>
                <option value="honors">Approved honors</option>
                <option value="ap-ib">AP or IB</option>
                <option value="college">College course</option>
              </select>
            </div>
          );
        }}
      />

      {result.errors?.[0] && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {result.errors[0]}
        </p>
      )}
      {result.warnings?.map((warning) => (
        <p key={warning} className="text-sm text-[var(--color-warning,#b45309)]" role="status">
          {warning}
        </p>
      ))}

      {result.data && (
        <div
          aria-live="polite"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6"
        >
          <p className="text-sm text-[var(--color-text-muted)]">
            {system === "uc" ? "UC capped GPA" : "CSU a-g GPA"}
          </p>
          <p className="text-5xl font-bold">{formatExact(result.data.gpa)}</p>
          <p className="mt-3 text-sm text-[var(--color-text)]">
            {result.data.gradePoints} grade points + {result.data.honorsPoints} honors points ={" "}
            {result.data.totalPoints} ÷ {result.data.courseCount} semesters
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Without honors points: {formatExact(result.data.unweightedGpa)}. Honors used{" "}
            {result.data.honorsPoints} of {result.data.honorsEligible} eligible semesters (10th-grade
            cap {result.data.grade10Cap}, total cap {result.data.totalCap}).
          </p>
        </div>
      )}
    </div>
  );
}
