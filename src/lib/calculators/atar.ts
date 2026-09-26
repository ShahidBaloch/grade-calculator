import type { CalculatorResult } from "./types";

export interface AtarSubject {
  name?: string;
  scaledScore: number;
  /** QCE category for QTAC planning (defaults to General). */
  qceType?: "general" | "applied" | "vet";
  /** HSC English study for UAC (best two English units). */
  hscEnglish?: boolean;
  /** QCE English row for QTAC eligibility (satisfactory completion, minimum C). */
  qceEnglish?: boolean;
  /** When false, English does not meet QTAC's minimum C eligibility. */
  qceEnglishEligible?: boolean;
  /** WACE bonus category for TISC (Methods / Specialist / LOTE). */
  waceBonus?: "none" | "lote" | "maths-methods" | "maths-specialist";
}

export interface AtarInput {
  subjects: AtarSubject[];
  targetAtar?: number;
  /** Planning model — states use different aggregation rules. */
  authority?: AtarAuthority;
}

export type AtarAuthority = "generic" | "uac" | "vtac" | "qtac" | "tisc" | "satac";

export interface AtarResult {
  /** Internal curve output — prefer planningAtarRounded for display. */
  estimatedAtar: number;
  /** Whole-number planning ATAR; omitted when the authority discourages ATAR prediction (SATAC). */
  planningAtarRounded: number | null;
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

/** ATAR is a cohort rank — never a valid input to US GPA, university GPA, or UK degree class formulas. */
export const ATAR_CROSS_SYSTEM_DISCLAIMER =
  "Do not convert ATAR to US GPA (for example (ATAR ÷ 99.95) × 4), to an Australian university GPA, or to a UK degree classification. ATAR measures Year 12 cohort rank for tertiary entry; GPA and UK classes measure different things. There is no valid direct equivalency.";

function authorityLabel(authority: AtarAuthority): string {
  switch (authority) {
    case "uac":
      return "NSW HSC (UAC-style: best 2 English + best 8 others)";
    case "qtac":
      return "Queensland QCE (QTAC-style best-five eligible aggregate)";
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

  switch (authority) {
    case "qtac":
      return qtacCountedSet(subjects);
    case "uac":
      return uacCountedSet(subjects);
    case "vtac":
      return vtacCountedSet(scores);
    case "satac":
      return satacCountedSet(scores);
    case "tisc":
      return tiscCountedSet(subjects);
    default:
      return genericPrimaryFourCountedSet(scores);
  }
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, n) => sum + n, 0) / values.length;
}

function qtacCountedSet(subjects: AtarSubject[]): {
  scores: number[];
  average: number;
  methodNote: string;
} {
  const general = subjects
    .filter((s) => (s.qceType ?? "general") === "general")
    .map((s) => s.scaledScore)
    .sort((a, b) => b - a);
  const applied = subjects
    .filter((s) => s.qceType === "applied")
    .map((s) => s.scaledScore)
    .sort((a, b) => b - a);
  const vet = subjects
    .filter((s) => s.qceType === "vet")
    .map((s) => s.scaledScore)
    .sort((a, b) => b - a);

  const candidates: number[][] = [];
  if (general.length >= 5) candidates.push(general.slice(0, 5));
  if (general.length >= 4 && applied.length >= 1) {
    candidates.push([...general.slice(0, 4), applied[0]]);
  }
  if (general.length >= 4 && vet.length >= 1) {
    candidates.push([...general.slice(0, 4), vet[0]]);
  }

  const picked =
    candidates.length > 0
      ? candidates.reduce((best, curr) => (mean(curr) > mean(best) ? curr : best))
      : subjects
          .map((s) => s.scaledScore)
          .sort((a, b) => b - a)
          .slice(0, 5);

  return {
    scores: picked,
    average: mean(picked),
    methodNote:
      "Queensland (QTAC/QCE): eligible ATAR aggregates use the best five scaled inputs from five General subjects, four General plus one Applied, or four General plus a Certificate III+ VET qualification — not General-only subjects with Applied excluded entirely.",
  };
}

function isHscEnglishSubject(subject: AtarSubject): boolean {
  if (subject.hscEnglish) return true;
  return /english/i.test(subject.name ?? "");
}

function isQceEnglishSubject(subject: AtarSubject): boolean {
  if (subject.qceEnglish) return true;
  return /english/i.test(subject.name ?? "");
}

function qtacEnglishEligibilityWarnings(subjects: AtarSubject[]): string[] {
  const englishRows = subjects.filter(isQceEnglishSubject);
  if (englishRows.length === 0) {
    return [
      "Queensland (QTAC): ATAR eligibility requires satisfactory completion of an eligible English subject (minimum C). Tag an English row or include “English” in the subject name, then confirm eligibility.",
    ];
  }
  const ineligible = englishRows.filter((row) => row.qceEnglishEligible === false);
  if (ineligible.length > 0) {
    return [
      "Queensland (QTAC): one or more English subjects are marked below the minimum C eligibility requirement — you may be ATAR-ineligible even if scaled scores look strong.",
    ];
  }
  return [];
}

function uacCountedSet(subjects: AtarSubject[]): {
  scores: number[];
  average: number;
  methodNote: string;
} {
  const english = subjects
    .filter(isHscEnglishSubject)
    .map((s) => s.scaledScore)
    .sort((a, b) => b - a);
  const other = subjects
    .filter((s) => !isHscEnglishSubject(s))
    .map((s) => s.scaledScore)
    .sort((a, b) => b - a);

  const countedEnglish = english.slice(0, 2);
  const countedOther = other.slice(0, 8);
  const counted = [...countedEnglish, ...countedOther];

  if (counted.length === 0) {
    return { scores: [], average: 0, methodNote: "No scaled scores entered." };
  }

  return {
    scores: counted,
    average: mean(counted),
    methodNote:
      "NSW HSC (UAC): best two units of English plus best eight units from remaining courses — not a simple average of your five highest scores. Tag English rows or include “English” in the subject name for this planning view.",
  };
}

function satacCountedSet(scores: number[]): { scores: number[]; average: number; methodNote: string } {
  if (scores.length <= 3) {
    return {
      scores,
      average: mean(scores),
      methodNote:
        "SA/NT (SATAC): fewer than three TAS-scale scores entered — using a simple average until a 60+30 credit structure is available.",
    };
  }

  const top3 = scores.slice(0, 3);
  const fourth = scores[3] ?? 0;
  const fifth = scores[4] ?? fourth;
  const flex30 = (fourth + fifth) * 0.75;
  const aggregate = top3.reduce((sum, n) => sum + n, 0) + flex30;
  const countedScores = [...top3, flex30];

  return {
    scores: countedScores,
    average: aggregate / 4.5,
    methodNote:
      "SA/NT (SATAC): best 90 credits modeled as three 20-credit TAS results (60 credits) plus the best flexible 30 credits (here: 75% weight on the 4th and 5th scores) — not “100 credits then drop the lowest 10”.",
  };
}

function tiscCountedSet(subjects: AtarSubject[]): {
  scores: number[];
  average: number;
  methodNote: string;
} {
  const scaled = subjects
    .map((s) => s.scaledScore)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => b - a);

  const loteScores = subjects
    .filter((s) => s.waceBonus === "lote")
    .map((s) => s.scaledScore);
  const methodsScores = subjects
    .filter((s) => s.waceBonus === "maths-methods")
    .map((s) => s.scaledScore);
  const specialistScores = subjects
    .filter((s) => s.waceBonus === "maths-specialist")
    .map((s) => s.scaledScore);

  const primary = subjects
    .filter((s) => !s.waceBonus || s.waceBonus === "none")
    .map((s) => s.scaledScore)
    .sort((a, b) => b - a);

  const top4 = (primary.length >= 4 ? primary : scaled).slice(0, 4);
  const loteBonus = loteScores.length ? Math.max(...loteScores) * 0.1 : 0;
  const methodsBonus = methodsScores.length ? Math.max(...methodsScores) * 0.1 : 0;
  const specialistBonus = specialistScores.length ? Math.max(...specialistScores) * 0.1 : 0;
  const bonusCount =
    (loteBonus > 0 ? 1 : 0) + (methodsBonus > 0 ? 1 : 0) + (specialistBonus > 0 ? 1 : 0);
  const aggregate =
    top4.reduce((sum, n) => sum + n, 0) + loteBonus + methodsBonus + specialistBonus;
  const divisor = 4 + bonusCount * 0.1;

  return {
    scores: [
      ...top4,
      ...(loteBonus ? [loteBonus] : []),
      ...(methodsBonus ? [methodsBonus] : []),
      ...(specialistBonus ? [specialistBonus] : []),
    ],
    average: aggregate / divisor,
    methodNote:
      "Western Australia (TISC/WACE): best four scaled scores plus 10% LOTE, 10% Mathematics Methods, and 10% Mathematics Specialist where applicable — not best four plus LOTE only.",
  };
}

function genericPrimaryFourCountedSet(scores: number[]): {
  scores: number[];
  average: number;
  methodNote: string;
} {
  if (scores.length <= 4) {
    return {
      scores,
      average: mean(scores),
      methodNote: "Average of the scaled scores you entered.",
    };
  }

  const top4 = scores.slice(0, 4);
  const fifthContribution = scores[4] * 0.1;
  const aggregate = top4.reduce((sum, n) => sum + n, 0) + fifthContribution;

  return {
    scores: [...top4, fifthContribution],
    average: aggregate / 4.1,
    methodNote:
      "Generic planning estimate: best four scaled scores in full plus 10% of a fifth — pick your state authority for rules that differ from this shortcut.",
  };
}

/** VTAC/VCE: primary four at full value + up to two 10% study increments (5th/6th), not unlimited extras. */
function vtacCountedSet(scores: number[]): {
  scores: number[];
  average: number;
  methodNote: string;
} {
  if (scores.length <= 4) {
    const average = scores.reduce((sum, n) => sum + n, 0) / scores.length;
    return {
      scores,
      average,
      methodNote:
        "Victoria (VTAC/VCE): fewer than four scaled scores entered — using a simple average until a full primary-four set is available.",
    };
  }

  const top4 = scores.slice(0, 4);
  const fifthIncrement = scores[4] * 0.1;
  const sixthIncrement = scores.length >= 6 ? scores[5] * 0.1 : 0;
  const incrementCount = (scores.length >= 5 ? 1 : 0) + (scores.length >= 6 ? 1 : 0);
  const aggregate =
    top4.reduce((sum, n) => sum + n, 0) + fifthIncrement + sixthIncrement;
  const divisor = 4 + incrementCount * 0.1;
  const countedScores = [
    ...top4,
    ...(scores.length >= 5 ? [fifthIncrement] : []),
    ...(scores.length >= 6 ? [sixthIncrement] : []),
  ];

  return {
    scores: countedScores,
    average: aggregate / divisor,
    methodNote:
      "Victoria (VTAC/VCE): primary four scaled scores at full value, plus up to two permitted 10% increments (typically from fifth and/or sixth permissible study). Additional subjects beyond the sixth do not add further increments in this simplified model.",
  };
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

  const planningAtarRounded = authority === "satac" ? null : Math.round(estimatedAtar);

  const formulaSteps = [
    authorityLabel(authority),
    counted.methodNote,
    `Counted scores: ${countedScores.map((n) => n.toFixed(1)).join(", ")}`,
    `Counted average: ${countedAverage.toFixed(2)}`,
    planningAtarRounded != null
      ? `Planning ATAR (rounded to nearest whole number, not official): about ${planningAtarRounded}`
      : "SATAC does not recommend predicting ATAR from simplified inputs — use the counted average only.",
  ];

  if (requiredAverage != null && input.targetAtar != null) {
    formulaSteps.push(
      `To aim for ATAR ${input.targetAtar.toFixed(2)}, this model wants a counted average near ${requiredAverage.toFixed(1)}.`,
    );
  }

  const warnings = [DISCLAIMER, ATAR_CROSS_SYSTEM_DISCLAIMER];
  if (authority === "qtac") {
    warnings.push(...qtacEnglishEligibilityWarnings(input.subjects));
  }

  return {
    status: "warning",
    warnings,
    data: {
      estimatedAtar,
      planningAtarRounded,
      countedAverage,
      countedScores,
      requiredAverage,
      formulaSteps,
      disclaimer: DISCLAIMER,
    },
  };
}
