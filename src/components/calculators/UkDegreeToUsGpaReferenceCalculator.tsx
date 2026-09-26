"use client";

import * as React from "react";
import { calculatorBySlug } from "@/config/calculators";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UkClassification } from "@/lib/calculators/degree-classification";
import {
  UK_DEGREE_US_GPA_REFERENCE_DISCLAIMER,
  lookupUkDegreeUsGpaReference,
  ukDegreeUsGpaReferenceFromPercent,
} from "@/lib/calculators/uk-degree-us-gpa-reference";
import { formatGpa } from "@/lib/utils/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

const CLASSIFICATIONS: UkClassification[] = [
  "First (1st)",
  "Upper Second (2:1)",
  "Lower Second (2:2)",
  "Third",
  "Fail",
];

type InputMode = "classification" | "percent";

export function UkDegreeToUsGpaReferenceCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence(
    "uk-degree-to-us-gpa-reference",
    { mode: "classification" as InputMode, classification: "Upper Second (2:1)" as UkClassification, percent: 65 },
  );
  const examples = calculatorBySlug["uk-degree-to-us-gpa-reference"].examples;

  const result = React.useMemo(() => {
    if (state.mode === "percent") {
      return ukDegreeUsGpaReferenceFromPercent(state.percent);
    }
    return lookupUkDegreeUsGpaReference(state.classification);
  }, [state.mode, state.classification, state.percent]);

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-sm text-[var(--color-text-muted)]">
        {UK_DEGREE_US_GPA_REFERENCE_DISCLAIMER}
      </p>
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) =>
            setState({
              ...state,
              mode: values.mode === "percent" ? "percent" : "classification",
              classification:
                typeof values.classification === "string"
                  ? (values.classification as UkClassification)
                  : state.classification,
              percent: typeof values.percent === "number" ? values.percent : state.percent,
            })
          }
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="uk-us-input-mode">Input</Label>
        <Select
          value={state.mode}
          onValueChange={(mode) => setState({ ...state, mode: mode as InputMode })}
        >
          <SelectTrigger id="uk-us-input-mode" aria-label="Input mode">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="classification">Degree class (First, 2:1, …)</SelectItem>
            <SelectItem value="percent">UK percentage mark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {state.mode === "classification" ? (
        <div className="space-y-2">
          <Label htmlFor="uk-classification">UK degree classification</Label>
          <Select
            value={state.classification}
            onValueChange={(value) =>
              setState({ ...state, classification: value as UkClassification })
            }
          >
            <SelectTrigger id="uk-classification" aria-label="UK degree classification">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CLASSIFICATIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="uk-percent">UK percentage (0–100)</Label>
          <Input
            id="uk-percent"
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={state.percent}
            onChange={(e) => setState({ ...state, percent: Number(e.target.value) })}
          />
        </div>
      )}

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
          <p className="text-sm text-[var(--color-text-muted)]">Illustrative US 4.0 comparison (not for self-report)</p>
          <p className="text-5xl font-bold">{formatGpa(result.data.illustrativeUsGpa)}</p>
          <p className="mt-2 text-sm font-medium text-[var(--color-text)]">{result.data.classification}</p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{result.data.message}</p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">{result.data.rangeNote}</p>
        </div>
      )}
    </div>
  );
}
