import type { CalculatorResult } from "./types";

export type UkClassification = "First (1st)" | "Upper Second (2:1)" | "Lower Second (2:2)" | "Third" | "Fail";

export interface DegreeModule {
  name?: string;
  mark: number;
  credits: number;
  year: 2 | 3;
}

export interface DegreeClassificationInput {
  modules: DegreeModule[];
  year2Weight: number;
  year3Weight: number;
}

export interface DegreeClassificationResult {
  average: number;
  classification: UkClassification;
  nextClassification: UkClassification | null;
  marksToNext: number | null;
  borderline: boolean;
  year2Average: number | null;
  year3Average: number | null;
  usedYearWeighting: boolean;
  formulaSteps: string[];
}

const BANDS: Array<{ name: UkClassification; min: number }> = [
  { name: "First (1st)", min: 70 },
  { name: "Upper Second (2:1)", min: 60 },
  { name: "Lower Second (2:2)", min: 50 },
  { name: "Third", min: 40 },
  { name: "Fail", min: 0 },
];

const BORDERLINE_WINDOW = 2;

export function classifyUkMark(mark: number): UkClassification {
  for (const band of BANDS) {
    if (mark >= band.min) return band.name;
  }
  return "Fail";
}

function creditAverage(modules: DegreeModule[]): number | null {
  let weighted = 0;
  let credits = 0;
  for (const courseModule of modules) {
    if (courseModule.credits <= 0) continue;
    weighted += courseModule.mark * courseModule.credits;
    credits += courseModule.credits;
  }
  if (credits <= 0) return null;
  return weighted / credits;
}

export function calculateDegreeClassification(
  input: DegreeClassificationInput,
): CalculatorResult<DegreeClassificationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!input.modules.length) {
    return { status: "error", errors: ["Add at least one module"] };
  }

  for (const [index, courseModule] of input.modules.entries()) {
    if (Number.isNaN(courseModule.mark) || courseModule.mark < 0 || courseModule.mark > 100) {
      errors.push(`Module ${index + 1}: mark must be between 0 and 100`);
    }
    if (courseModule.credits < 0) {
      errors.push(`Module ${index + 1}: credits cannot be negative`);
    }
  }

  if (input.year2Weight < 0 || input.year3Weight < 0) {
    errors.push("Year weights cannot be negative");
  }

  if (errors.length) {
    return { status: "error", errors };
  }

  const year2 = input.modules.filter((m) => m.year === 2);
  const year3 = input.modules.filter((m) => m.year === 3);
  const year2Average = creditAverage(year2);
  const year3Average = creditAverage(year3);
  const usedYearWeighting = year2Average != null && year3Average != null;

  let average: number;
  const formulaSteps: string[] = [];

  if (usedYearWeighting) {
    const totalWeight = input.year2Weight + input.year3Weight;
    if (totalWeight <= 0) {
      return { status: "error", errors: ["Year 2 and Year 3 weights must add to more than 0"] };
    }
    if (Math.abs(totalWeight - 100) > 0.01) {
      warnings.push(`Year weights total ${totalWeight}%, not 100%`);
    }
    const y2w = input.year2Weight / totalWeight;
    const y3w = input.year3Weight / totalWeight;
    average = year2Average * y2w + year3Average * y3w;
    formulaSteps.push(
      `Year 2 credit-weighted average: ${year2Average.toFixed(2)}%`,
      `Year 3 credit-weighted average: ${year3Average.toFixed(2)}%`,
      `Overall = ${year2Average.toFixed(2)} × ${input.year2Weight}% + ${year3Average.toFixed(2)} × ${input.year3Weight}% = ${average.toFixed(2)}%`,
    );
  } else {
    const overall = creditAverage(input.modules);
    if (overall == null) {
      return { status: "error", errors: ["Enter credits greater than 0"] };
    }
    average = overall;
    formulaSteps.push(
      `Credit-weighted average = Σ(mark × credits) ÷ Σ(credits) = ${average.toFixed(2)}%`,
    );
  }

  const classification = classifyUkMark(average);
  const currentIndex = BANDS.findIndex((b) => b.name === classification);
  const nextBand = currentIndex > 0 ? BANDS[currentIndex - 1] : null;
  const marksToNext = nextBand ? nextBand.min - average : null;
  const borderline = marksToNext != null && marksToNext > 0 && marksToNext <= BORDERLINE_WINDOW;

  if (borderline && nextBand) {
    warnings.push(
      `Within ${BORDERLINE_WINDOW} marks of a ${nextBand.name}. Borderline rules are university- and programme-specific (for example UCL 69.50/68.50 policies) — this calculator does not apply them unless you configure your own scheme.`,
    );
  }

  return {
    status: warnings.length ? "warning" : "valid",
    warnings: warnings.length ? warnings : undefined,
    data: {
      average,
      classification,
      nextClassification: nextBand?.name ?? null,
      marksToNext,
      borderline,
      year2Average,
      year3Average,
      usedYearWeighting,
      formulaSteps,
    },
  };
}
