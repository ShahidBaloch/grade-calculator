"use client";

import * as React from "react";
import { getPrimaryFlow } from "@/config/engagement-flows";
import { calculatorBySlug } from "@/config/calculators";
import { NextStepCard } from "@/components/engagement/NextStepCard";
import { ExampleScenarios } from "@/components/engagement/ExampleScenarios";
import { CalculatorToolbar } from "@/components/calculators/shared/CalculatorToolbar";
import { DynamicRowList } from "@/components/calculators/shared/DynamicRowList";
import { FormulaBreakdown } from "@/components/calculators/shared/FormulaBreakdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateAtar, ATAR_CROSS_SYSTEM_DISCLAIMER } from "@/lib/calculators/atar";
import type { AtarAuthority, AtarSubject } from "@/lib/calculators/atar";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";

const AUTHORITIES = [
  { id: "generic", label: "Any state (generic)", name: "UAC, VTAC, QTAC, TISC, or SATAC" },
  { id: "uac", label: "NSW / ACT (UAC)", name: "UAC" },
  { id: "vtac", label: "Victoria (VTAC)", name: "VTAC" },
  { id: "qtac", label: "Queensland (QTAC)", name: "QTAC" },
  { id: "tisc", label: "Western Australia (TISC)", name: "TISC" },
  { id: "satac", label: "South Australia / NT (SATAC)", name: "SATAC" },
] as const;

const defaultSubjects: AtarSubject[] = [
  { name: "English", scaledScore: 82 },
  { name: "Mathematical Methods", scaledScore: 78 },
  { name: "Chemistry", scaledScore: 74 },
  { name: "Modern History", scaledScore: 80 },
  { name: "Visual Arts", scaledScore: 70 },
];

export function AtarCalculator() {
  const { state, setState, resetState, shareUrl, copied } = useCalculatorPersistence("atar-calculator", {
    subjects: defaultSubjects,
    targetAtar: 90 as number | "",
    authority: "generic",
  });
  const { subjects, targetAtar } = state;
  const authority = (
    AUTHORITIES.some((item) => item.id === state.authority) ? state.authority : "generic"
  ) as AtarAuthority;
  const authorityMeta = AUTHORITIES.find((item) => item.id === authority) ?? AUTHORITIES[0];
  const examples = calculatorBySlug["atar-calculator"].examples;

  const result = React.useMemo(
    () =>
      calculateAtar({
        subjects,
        targetAtar: targetAtar === "" ? undefined : targetAtar,
        authority,
      }),
    [subjects, targetAtar, authority],
  );

  const updateSubjects = (next: AtarSubject[]) => setState({ ...state, subjects: next });

  return (
    <div className="calculator-print-area space-y-6">
      <CalculatorToolbar onShare={shareUrl} onReset={resetState} copied={copied} />
      {examples.length > 0 && (
        <ExampleScenarios
          examples={examples}
          onSelect={(values) => {
            const nextSubjects = Array.isArray(values.subjects)
              ? values.subjects.map((row, index) => {
                  const subject = row as Partial<AtarSubject>;
                  return {
                    name: subject.name ?? `Subject ${index + 1}`,
                    scaledScore: typeof subject.scaledScore === "number" ? subject.scaledScore : 70,
                  };
                })
              : subjects;
            setState({
              ...state,
              subjects: nextSubjects,
              targetAtar: typeof values.targetAtar === "number" ? values.targetAtar : targetAtar,
            });
          }}
        />
      )}
      <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-sm text-[var(--color-text-muted)]">
        Use <strong className="font-medium text-[var(--color-text)]">scaled</strong> subject scores
        (after state scaling), not raw school marks. Raw marks will overestimate or underestimate ATAR.
      </p>
      <p className="text-sm text-[var(--color-text-muted)]">
        Select your state admission centre, then enter <strong className="font-medium text-[var(--color-text)]">scaled</strong>{" "}
        subject scores (0–100). Each authority uses different aggregation rules — we apply a simplified
        planning model for the option you choose, not an official {authorityMeta.name} calculation.
        {authority === "vtac" && (
          <>
            {" "}
            For VCE, VTAC uses a primary four plus up to two 10% increments (fifth/sixth study), not 10% of
            every extra score.
          </>
        )}
        {authority === "qtac" && (
          <>
            {" "}
            For QCE, mark Applied or VET subjects — QTAC eligible aggregates can be five General subjects,
            four General plus one Applied, or four General plus Certificate III+ VET.
          </>
        )}
        {authority === "uac" && (
          <>
            {" "}
            For HSC, tick English rows (or include “English” in the name) so we model UAC’s best two English
            units plus best eight remaining.
          </>
        )}
        {authority === "tisc" && (
          <>
            {" "}
            For WACE, tag LOTE, Mathematics Methods, and Mathematics Specialist rows for TISC 10% bonuses.
          </>
        )}
        {authority === "satac" && (
          <>
            {" "}
            For SACE/SATAC, enter at least five scaled scores so we can model 60 credits from your top three
            TAS results plus a flexible 30-credit block.
          </>
        )}
      </p>
      <div className="space-y-2">
        <Label htmlFor="atar-authority">State admission centre (changes the planning formula)</Label>
        <Select
          value={authority}
          onValueChange={(value) => setState({ ...state, authority: value })}
        >
          <SelectTrigger id="atar-authority" aria-label="State authority">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AUTHORITIES.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="target-atar">Target ATAR (optional)</Label>
        <Input
          id="target-atar"
          type="number"
          min={0}
          max={99.95}
          step={0.05}
          value={targetAtar}
          onChange={(e) =>
            setState({ ...state, targetAtar: e.target.value === "" ? "" : Number(e.target.value) })
          }
        />
      </div>
      <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-3 text-sm text-[var(--color-text-muted)]">
        {ATAR_CROSS_SYSTEM_DISCLAIMER}
      </p>
      <DynamicRowList
        items={subjects}
        addLabel="Add subject"
        onAdd={() => updateSubjects([...subjects, { name: "", scaledScore: 70 }])}
        onRemove={(index) => updateSubjects(subjects.filter((_, i) => i !== index))}
        renderRow={(subject, index) => (
          <div className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                placeholder="Subject"
                aria-label={`Subject ${index + 1} name`}
                value={subject.name ?? ""}
                onChange={(e) => {
                  const next = [...subjects];
                  next[index] = { ...subject, name: e.target.value };
                  updateSubjects(next);
                }}
              />
              <Input
                type="number"
                placeholder="Scaled score"
                aria-label={`Subject ${index + 1} scaled score`}
                min={0}
                max={100}
                value={subject.scaledScore}
                onChange={(e) => {
                  const next = [...subjects];
                  next[index] = { ...subject, scaledScore: Number(e.target.value) || 0 };
                  updateSubjects(next);
                }}
              />
            </div>
            {authority === "qtac" && (
              <div className="space-y-1">
                <Label className="text-xs text-[var(--color-text-muted)]">QCE subject type</Label>
                <Select
                  value={subject.qceType ?? "general"}
                  onValueChange={(value) => {
                    const next = [...subjects];
                    next[index] = {
                      ...subject,
                      qceType: value as AtarSubject["qceType"],
                    };
                    updateSubjects(next);
                  }}
                >
                  <SelectTrigger aria-label={`Subject ${index + 1} QCE type`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General (Senior)</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="vet">VET (Cert III+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {authority === "uac" && (
              <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <input
                  type="checkbox"
                  checked={subject.hscEnglish ?? /english/i.test(subject.name ?? "")}
                  onChange={(e) => {
                    const next = [...subjects];
                    next[index] = { ...subject, hscEnglish: e.target.checked };
                    updateSubjects(next);
                  }}
                />
                Count as English (HSC / UAC)
              </label>
            )}
            {authority === "tisc" && (
              <div className="space-y-1">
                <Label className="text-xs text-[var(--color-text-muted)]">WACE bonus (optional)</Label>
                <Select
                  value={subject.waceBonus ?? "none"}
                  onValueChange={(value) => {
                    const next = [...subjects];
                    next[index] = {
                      ...subject,
                      waceBonus: value as AtarSubject["waceBonus"],
                    };
                    updateSubjects(next);
                  }}
                >
                  <SelectTrigger aria-label={`Subject ${index + 1} WACE bonus`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (primary four candidate)</SelectItem>
                    <SelectItem value="lote">LOTE (10% bonus)</SelectItem>
                    <SelectItem value="maths-methods">Mathematics Methods (10%)</SelectItem>
                    <SelectItem value="maths-specialist">Mathematics Specialist (10%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      />
      {result.errors?.map((e) => (
        <p key={e} className="text-sm text-[var(--color-error)]">{e}</p>
      ))}
      {result.warnings?.map((w) => (
        <p key={w} className="text-sm text-[var(--color-warning)]">{w}</p>
      ))}
      {result.data && (
        <div aria-live="polite" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6">
          <Label>Estimated ATAR</Label>
          <p className="text-5xl font-bold">{result.data.estimatedAtar.toFixed(2)}</p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Counted average {result.data.countedAverage.toFixed(2)}
            {result.data.requiredAverage != null &&
              ` · Need about ${result.data.requiredAverage.toFixed(1)} average for your target`}
          </p>
          <FormulaBreakdown steps={result.data.formulaSteps} />
        </div>
      )}
      {getPrimaryFlow("atar-calculator") && result.data && (
        <NextStepCard flow={getPrimaryFlow("atar-calculator")!} />
      )}
    </div>
  );
}
