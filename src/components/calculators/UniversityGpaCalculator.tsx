"use client";

import * as React from "react";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { caUniversityBySlug, type CaUniversityProfile } from "@/data/geo-sources/ca-universities";
import { OMSAS_UNIVERSITY_SCALES } from "@/data/geo-sources/omsas";
import {
  calculateUniversityGpa,
  omsasScalesForUniversity,
  type UniversityCourseInput,
} from "@/lib/calculators/ca-university-gpa";
import { CA_EXAMPLE_COURSES, OMSAS_DEFAULT_UNIVERSITY } from "@/lib/content/geo-page-copy";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { formatGpa } from "@/lib/utils/format";

const selectClass =
  "flex h-11 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]";

interface UniversityGpaState {
  courses: UniversityCourseInput[];
  university: string;
}

function ResultCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5">
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
      <p className="text-4xl font-bold">{value}</p>
      {detail && <p className="mt-1 text-sm text-[var(--color-text-muted)]">{detail}</p>}
    </div>
  );
}

export function UniversityGpaCalculator({ slug }: { slug: CaUniversityProfile["slug"] }) {
  const profile = caUniversityBySlug[slug];
  const initial = React.useMemo<UniversityGpaState>(
    () => ({ courses: CA_EXAMPLE_COURSES[slug], university: OMSAS_DEFAULT_UNIVERSITY }),
    [slug],
  );
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    `gpa-calculator:${slug}`,
    initial,
  );
  const { courses, university } = state;
  const setCourses = (next: UniversityCourseInput[]) => setState({ ...state, courses: next });

  const omsasScales = slug === "omsas" ? omsasScalesForUniversity(university) ?? profile.omsasScales : undefined;
  const result = React.useMemo(
    () =>
      calculateUniversityGpa(courses, profile, {
        omsasScales,
        omsasUniversity: slug === "omsas" ? university : undefined,
      }),
    [courses, profile, omsasScales, slug, university],
  );
  const data = result.status === "valid" ? result.data : null;
  const gradeHint = profile.gradeInput === "percent" ? "Mark (%)" : "Grade (% or letter)";

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {slug === "omsas" && (
        <div className="space-y-2">
          <Label htmlFor="omsas-university">University on your transcript</Label>
          <select
            id="omsas-university"
            className={selectClass}
            value={university}
            onChange={(event) => setState({ ...state, university: event.target.value })}
          >
            {OMSAS_UNIVERSITY_SCALES.map((row) => (
              <option key={row.name} value={row.name}>
                {row.name} — Scale {row.scales.join(", ")}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="hidden gap-2 text-xs text-[var(--color-text-muted)] sm:grid sm:grid-cols-3">
        <span>Course</span>
        <span>{gradeHint}</span>
        <span>{profile.weightLabel}</span>
      </div>
      <DynamicRowList
        items={courses}
        onAdd={() => setCourses([...courses, { name: "", grade: "", weight: profile.defaultWeight }])}
        onRemove={(index) => setCourses(courses.filter((_, i) => i !== index))}
        addLabel="Add course"
        renderRow={(course, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              aria-label={`Course ${index + 1} name`}
              placeholder="Course"
              value={course.name ?? ""}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, name: e.target.value };
                setCourses(next);
              }}
            />
            <Input
              aria-label={`Course ${index + 1} grade`}
              placeholder={profile.gradeInput === "percent" ? "e.g. 84" : "e.g. 84 or A-"}
              inputMode={profile.gradeInput === "percent" ? "decimal" : "text"}
              value={course.grade}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, grade: e.target.value };
                setCourses(next);
              }}
            />
            <select
              aria-label={`Course ${index + 1} ${profile.weightLabel.toLowerCase()}`}
              className={selectClass}
              value={String(course.weight)}
              onChange={(e) => {
                const next = [...courses];
                next[index] = { ...course, weight: Number(e.target.value) };
                setCourses(next);
              }}
            >
              {profile.weightOptions.map((option) => (
                <option key={option.weight} value={String(option.weight)}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      />
      {result.status === "error" &&
        result.errors.map((error) => (
          <p key={error} className="text-sm text-[var(--color-error)]">
            {error}
          </p>
        ))}
      <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">
        {data?.native.kind === "percent-average" ? (
          <ResultCard
            label={`${profile.shortName} average`}
            value={`${data.native.value.toFixed(2)}%`}
            detail={data.native.letter ? `${data.native.letter} on the ${profile.shortName} letter scale` : `${data.totalWeight} units`}
          />
        ) : profile.slug !== "omsas" ? (
          <ResultCard
            label={`${profile.shortName} GPA (4.0)`}
            value={data ? formatGpa(data.native.value) : "—"}
            detail={data ? `${data.totalWeight} credits` : undefined}
          />
        ) : null}
        {data?.equivalency433 != null && (
          <ResultCard label="UBC Arts 4.33 equivalent" value={formatGpa(data.equivalency433)} detail="Planning figure — evaluators may use their own scale" />
        )}
        <ResultCard
          label="OMSAS GPA (4.0)"
          value={data ? formatGpa(data.omsasGpa) : "—"}
          detail={
            data
              ? `OUAC ${slug === "omsas" ? `Scale ${(omsasScales ?? []).join(", ")}` : `Scale ${profile.omsasScales.join(", ")}`} · weight ${data.omsasTotalWeight}`
              : undefined
          }
        />
      </div>
      {data && <FormulaBreakdown steps={data.formulaSteps} />}
    </div>
  );
}
