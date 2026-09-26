import type { CalculatorResult } from "./types";

export interface AtarSubject {
  name?: string;
  scaledScore: number;
}

export interface AtarInput {
  subjects: AtarSubject[];
  targetAtar?: number;
  /** Planning model — states use different aggregation rules. */
  authority?: AtarAuthority;
}

export type AtarAuthority = "generic" | "uac" | "vtac" | "qtac" | "tisc" | "satac";

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
  "This is an educational estimate, not an official ATAR. Real ATARs use state scaling (UAC, VTAC, QTAC, TISC, SATAC) and change each year. One formula cannot model every state.";

function authorityLabel(authority: AtarAuthority): string {
  switch (authority) {
    case "uac":
      return "NSW/ACT (UAC-style planning average)";
    case "qtac":
      return "Queensland (QTAC-style best-five average)";
    case "vtac":
      return "Victoria (VTAC-style aggregate estimate)";
    case "tisc":
      return "Western Australia (TISC-style planning estimate)";
    case "satac":
      return "SA/NT (SATAC-style planning estimate)";
    default:
      return "Generic multi-state planning estimate";
  }
}

function countedSet(
  subjects: AtarSubject[],
  authority: AtarAuthority,
): { scores: number[]; average: number; methodNote: string } {
  const scores = subjects
    .map((s) => s.scaledScore)
    .filter((score) => Number.isFinite(score))
    .sort((a, b) => b - a);

  if (scores.length === 0) {
    return { scores: [], average: 0, methodNote: "No scaled scores entered." };
  }

  if (authority === "qtac") {
    const top = scores.slice(0, 5);
    const average = top.reduce((sum, n) => sum + n, 0) / top.length;
    return {
      scores: top,
      average,
      methodNote:
        "Queensland/QTAC commonly builds an aggregate from the best five eligible scaled inputs — modeled here as the average of your five highest scores.",
    };
  }

  if (authority === "uac") {
    const top = scores.slice(0, 5);
    const average = top.reduce((sum, n) => sum + n, 0) / top.length;
    return {
      scores: top,
      average,
      methodNote:
        "NSW/ACT (UAC) uses English plus other scaled units in a specific ruleset we cannot reproduce. This planning view averages your five highest scaled scores and ignores compulsory English rules.",
    };
  }

  if (scores.length <= 4) {
    const average = scores.reduce((sum, n) => sum + n, 0) / scores.length;
    return {
      scores,
      average,
      methodNote: "Average of the scaled scores you entered.",
    };
  }

  const top4 = scores.slice(0, 4);
  const fifthContribution = scores[4] * 0.1;
  const aggregate = top4.reduce((sum, n) => sum + n, 0) + fifthContribution;
  const methodNote =
    authority === "vtac"
      ? "Victoria/VTAC is closer to a primary-four structure with additional increments — modeled here as best four in full plus 10% of a fifth score."
      : authority === "generic"
        ? "Several states (including Victoria) use variants of a primary-four aggregate. This generic view uses best four in full plus 10% of a fifth score — not a national rule."
        : "Planning estimate: best four scaled scores in full plus 10% of a fifth score.";

  return { scores: [...top4, fifthContribution], average: aggregate / 4.1, methodNote };
}

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

  const authority: AtarAuthority = input.authority ?? "generic";
  const counted = countedSet(input.subjects, authority);
  const countedAverage = counted.average;
  const countedScores = counted.scores;
  const estimatedAtar = estimateAtarFromAverage(countedAverage);
  const requiredAverage =
    input.targetAtar != null && input.targetAtar > 0 ? requiredAverageForAtar(input.targetAtar) : null;

  const formulaSteps = [
    authorityLabel(authority),
    counted.methodNote,
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
