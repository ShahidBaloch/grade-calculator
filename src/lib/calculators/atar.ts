import type { CalculatorResult } from "./types";

export interface AtarSubject {
  name?: string;
  scaledScore: number;
}

export interface AtarInput {
  subjects: AtarSubject[];
  targetAtar?: number;
}

export interface AtarResult {
  estimatedAtar: number;
  countedAverage: number;
  countedScores: number[];
  requiredAverage: number | null;
  formulaSteps: string[];
  disclaimer: string;
}

/** Educational control points: counted average (0–100) → approximate ATAR. Not official UAC/QTAC. */
const AVERAGE_TO_ATAR: Array<[number, number]> = [
  [0, 0],
  [30, 30],
  [40, 45],
  [50, 58],
  [60, 70],
  [70, 80],
  [75, 85],
  [80, 90],
  [85, 94],
  [90, 97],
  [95, 99.3],
  [98, 99.85],
  [100, 99.95],
];

const DISCLAIMER =
  "This is an educational estimate, not an official ATAR. Real ATARs use state scaling (UAC, VTAC, QTAC, TISC, SATAC) and change each year.";

function interpolate(table: Array<[number, number]>, x: number): number {
  const clamped = Math.min(table[table.length - 1][0], Math.max(table[0][0], x));
  for (let i = 1; i < table.length; i += 1) {
    const [x0, y0] = table[i - 1];
    const [x1, y1] = table[i];
    if (clamped <= x1) {
      const t = (clamped - x0) / (x1 - x0 || 1);
      return y0 + t * (y1 - y0);
    }
  }
  return table[table.length - 1][1];
}

export function estimateAtarFromAverage(average: number): number {
  const atar = interpolate(AVERAGE_TO_ATAR, average);
  return Math.round(atar * 20) / 20;
}

export function requiredAverageForAtar(targetAtar: number): number {
  const inverse = AVERAGE_TO_ATAR.map(([avg, atar]) => [atar, avg] as [number, number]);
  return interpolate(inverse, targetAtar);
}

function countedSet(subjects: AtarSubject[]): { scores: number[]; average: number } {
  const scores = subjects
    .map((s) => s.scaledScore)
    .filter((score) => Number.isFinite(score))
    .sort((a, b) => b - a);

  if (scores.length === 0) return { scores: [], average: 0 };
  if (scores.length <= 4) {
    const average = scores.reduce((sum, n) => sum + n, 0) / scores.length;
    return { scores, average };
  }

  const top4 = scores.slice(0, 4);
  const fifthContribution = scores[4] * 0.1;
  const aggregate = top4.reduce((sum, n) => sum + n, 0) + fifthContribution;
  return { scores: [...top4, fifthContribution], average: aggregate / 4.1 };
}

export function calculateAtar(input: AtarInput): CalculatorResult<AtarResult> {
  const errors: string[] = [];

  if (!input.subjects.length) {
    return { status: "error", errors: ["Add at least one subject"] };
  }

  for (const [index, subject] of input.subjects.entries()) {
    if (Number.isNaN(subject.scaledScore) || subject.scaledScore < 0 || subject.scaledScore > 100) {
      errors.push(`Subject ${index + 1}: scaled score must be between 0 and 100`);
    }
  }

  if (input.targetAtar != null && (input.targetAtar < 0 || input.targetAtar > 99.95)) {
    errors.push("Target ATAR must be between 0 and 99.95");
  }

  if (errors.length) {
    return { status: "error", errors };
  }

  const counted = countedSet(input.subjects);
  const countedAverage = counted.average;
  const countedScores = counted.scores;
  const estimatedAtar = estimateAtarFromAverage(countedAverage);
  const requiredAverage =
    input.targetAtar != null && input.targetAtar > 0 ? requiredAverageForAtar(input.targetAtar) : null;

  const formulaSteps = [
    countedScores.length > 4
      ? "Best four scaled scores count in full; a fifth subject contributes 10% (simplified model)."
      : "Average of the scaled scores you entered.",
    `Counted scores: ${countedScores.map((n) => n.toFixed(1)).join(", ")}`,
    `Counted average: ${countedAverage.toFixed(2)}`,
    `Estimated ATAR (lookup curve): ${estimatedAtar.toFixed(2)}`,
  ];

  if (requiredAverage != null && input.targetAtar != null) {
    formulaSteps.push(
      `To aim for ATAR ${input.targetAtar.toFixed(2)}, this model wants a counted average near ${requiredAverage.toFixed(1)}.`,
    );
  }

  return {
    status: "warning",
    warnings: [DISCLAIMER],
    data: {
      estimatedAtar,
      countedAverage,
      countedScores,
      requiredAverage,
      formulaSteps,
      disclaimer: DISCLAIMER,
    },
  };
}
