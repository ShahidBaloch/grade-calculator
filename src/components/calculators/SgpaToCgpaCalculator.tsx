"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { Input } from "@/components/ui/input";
import { calculateSgpaToCgpa } from "@/lib/calculators/sgpa-to-cgpa";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

const defaultTerms = [
  { label: "Semester 1", sgpa: 8.2, credits: 22 },
  { label: "Semester 2", sgpa: 7.8, credits: 24 },
  { label: "Semester 3", sgpa: 8.5, credits: 23 },
];

export function SgpaToCgpaCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "sgpa-to-cgpa",
    { terms: defaultTerms },
  );
  const { terms } = state;
  const setTerms = (next: typeof defaultTerms) => setState({ terms: next });
  const examples = calculatorBySlug["sgpa-to-cgpa"].examples;

  const result = React.useMemo(() => calculateSgpaToCgpa(terms), [terms]);

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            if (Array.isArray(values.terms)) {
              setTerms(
                values.terms.map((row, index) => {
                  const term = row as { label?: string; sgpa?: number; credits?: number };
                  return {
                    label: term.label ?? `Semester ${index + 1}`,
                    sgpa: typeof term.sgpa === "number" ? term.sgpa : 0,
                    credits: typeof term.credits === "number" ? term.credits : 0,
                  };
                }),
              );
            }
          }}
        />
      )}

      <div className="hidden gap-2 text-xs text-[var(--color-text-muted)] sm:grid sm:grid-cols-3">
        <span>Semester</span>
        <span>SGPA</span>
        <span>Credits</span>
      </div>
      <DynamicRowList
        items={terms}
        onAdd={() =>
          setTerms([...terms, { label: `Semester ${terms.length + 1}`, sgpa: 0, credits: 20 }])
        }
        onRemove={(index) => setTerms(terms.filter((_, i) => i !== index))}
        addLabel="Add semester"
        renderRow={(term, index) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              aria-label={`Semester ${index + 1} name`}
              placeholder="Semester"
              value={term.label}
              onChange={(e) => {
                const next = [...terms];
                next[index] = { ...term, label: e.target.value };
                setTerms(next);
              }}
            />
            <Input
              aria-label={`Semester ${index + 1} SGPA`}
              type="number"
              min={0}
              max={10}
              step="0.01"
              placeholder="SGPA"
              value={term.sgpa}
              onChange={(e) => {
                const next = [...terms];
                next[index] = { ...term, sgpa: Number(e.target.value) || 0 };
                setTerms(next);
              }}
            />
            <Input
              aria-label={`Semester ${index + 1} credits`}
              type="number"
              min={0}
              step="1"
              placeholder="Credits"
              value={term.credits}
              onChange={(e) => {
                const next = [...terms];
                next[index] = { ...term, credits: Number(e.target.value) || 0 };
                setTerms(next);
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
        <p className="text-sm text-[var(--color-text-muted)]">Overall CGPA</p>
        <p className="text-5xl font-bold">{result.data ? formatGpa(result.data.cgpa) : "—"}</p>
        {result.data && (
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {result.data.termsUsed} semesters · {result.data.totalCredits} total credits
          </p>
        )}
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          Formula: CGPA = Σ(SGPA × credits) ÷ Σ(credits). Confirm credit totals on your marksheet.
        </p>
      </div>

      {getPrimaryFlow("sgpa-to-cgpa") && result.status === "valid" && (
        <NextStepCard flow={getPrimaryFlow("sgpa-to-cgpa")!} />
      )}
    </div>
  );
}
