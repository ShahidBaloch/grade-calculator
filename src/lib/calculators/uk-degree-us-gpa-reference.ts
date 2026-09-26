import type { UkClassification } from "./degree-classification";
import type { CalculatorResult } from "./types";

/** Planning-only values sometimes cited in WES-style charts — not for self-reporting on applications. */
export const ILLUSTRATIVE_US_GPA_BY_CLASSIFICATION: Record<
  UkClassification,
  { midpoint: number; rangeNote: string }
> = {
  "First (1st)": { midpoint: 4.0, rangeNote: "Often cited near 3.9–4.0 in informal comparison tables" },
  "Upper Second (2:1)": { midpoint: 3.7, rangeNote: "Often cited near 3.6–3.7 — not a reporting rule" },
  "Lower Second (2:2)": { midpoint: 3.3, rangeNote: "Often cited near 3.2–3.3 in planning examples" },
  Third: { midpoint: 3.0, rangeNote: "Sometimes cited near 2.7–3.0 depending on the evaluator" },
  Fail: { midpoint: 0.0, rangeNote: "Fail classifications are not mapped to competitive US GPAs" },
};

export const UK_DEGREE_US_GPA_REFERENCE_DISCLAIMER =
  "Do not self-convert your GPA unless the receiving institution specifically asks you to. Report grades in your transcript's original format when the application instructs you to do so. Harvard GSAS tells applicants to report grades in the same format as the transcript; Stanford Graduate Admissions says to enter GPA exactly as it appears and not convert to a 4.0 scale. Credential evaluators (e.g. WES) use their own methodologies — this page is an approximate reference only.";

export interface UkDegreeUsGpaReferenceResult {
  classification: UkClassification;
  illustrativeUsGpa: number;
  rangeNote: string;
  message: string;
}

export function lookupUkDegreeUsGpaReference(
  classification: UkClassification,
): CalculatorResult<UkDegreeUsGpaReferenceResult> {
  const row = ILLUSTRATIVE_US_GPA_BY_CLASSIFICATION[classification];
  return {
    status: "valid",
    data: {
      classification,
      illustrativeUsGpa: row.midpoint,
      rangeNote: row.rangeNote,
      message: `${classification} → about ${row.midpoint.toFixed(1)} on a US 4.0 scale in some informal comparison charts only — do not enter this on applications that ask for transcript format (Stanford: enter GPA exactly as on the transcript)`,
    },
  };
}

export function ukDegreeUsGpaReferenceFromPercent(
  percent: number,
): CalculatorResult<UkDegreeUsGpaReferenceResult> {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    return { status: "error", errors: ["Enter a UK module or average mark between 0 and 100"] };
  }

  let classification: UkClassification;
  if (percent >= 70) classification = "First (1st)";
  else if (percent >= 60) classification = "Upper Second (2:1)";
  else if (percent >= 50) classification = "Lower Second (2:2)";
  else if (percent >= 40) classification = "Third";
  else classification = "Fail";

  return lookupUkDegreeUsGpaReference(classification);
}
