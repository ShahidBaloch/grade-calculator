import { getScale } from "@/lib/grading-scales";
import type { CalculatorResult } from "./types";

const LEGACY_LETTER: Record<string, string> = {
  "9": "A*",
  "8": "A*",
  "7": "A",
  "6": "B",
  "5": "C / strong pass",
  "4": "C / standard pass",
  "3": "D",
  "2": "E",
  "1": "F / G",
};

export interface GcseGradeResult {
  grade: string;
  legacyLetter: string;
  isStandardPass: boolean;
  rangeLabel: string;
  formulaSteps: string[];
}

export function calculateGcseGrade(percent: number): CalculatorResult<GcseGradeResult> {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    return { status: "error", errors: ["Percentage must be between 0 and 100"] };
  }

  const scale = getScale("uk-gcse");
  const band =
    scale.bands.find((item) => percent >= item.min && percent <= item.max) ??
    scale.bands[scale.bands.length - 1];
  const grade = band.letter;
  const isStandardPass = Number(grade) >= 4;

  return {
    status: "warning",
    warnings: [
      "Official GCSE grade boundaries change by subject and exam series. This uses a simplified 9–1 percentage map for planning only.",
    ],
    data: {
      grade,
      legacyLetter: LEGACY_LETTER[grade] ?? "—",
      isStandardPass,
      rangeLabel: `${band.min}–${band.max}%`,
      formulaSteps: [
        `Look up ${percent.toFixed(1)}% on the educational UK GCSE 9–1 table.`,
        `Band ${band.min}–${band.max}% → grade ${grade}.`,
        isStandardPass
          ? "Grade 4 or above is commonly treated as a standard pass."
          : "Below grade 4 is commonly treated as not a standard pass.",
      ],
    },
  };
}
