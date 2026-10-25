/**
 * "X out of Y" score pages (/score/15-out-of-20).
 *
 * Curated on purpose: common US test/quiz totals × the scores people actually search
 * (50% and up). Capped well under 500 URLs; do not add every integer pair.
 * These pages own "X out of Y grade" / "what is X out of Y" — the test grade
 * calculator keeps "test grade calculator".
 */
export interface ScorePair {
  score: number;
  total: number;
}

export const SCORE_TOTALS = [10, 12, 15, 20, 25, 30, 40, 50, 100] as const;

/** Extra high-demand pairs on large totals (from Search Console / Semrush US exports). */
const EXTRA_PAIRS: ScorePair[] = [
  ...[100, 108, 112, 116, 118, 120, 123, 125, 130, 135, 140, 144].map((score) => ({ score, total: 150 })),
  ...[140, 150, 160, 170, 176, 180, 190].map((score) => ({ score, total: 200 })),
];

function minScore(total: number) {
  // Below 50% there is little search demand and the pages would only repeat "F".
  return Math.ceil(total * 0.5);
}

export const scorePairs: ScorePair[] = [
  ...SCORE_TOTALS.flatMap((total) => {
    const pairs: ScorePair[] = [];
    for (let score = total; score >= minScore(total); score--) pairs.push({ score, total });
    return pairs;
  }),
  ...EXTRA_PAIRS,
];

export function scoreSlug({ score, total }: ScorePair): string {
  return `${score}-out-of-${total}`;
}

export function scorePath(pair: ScorePair): string {
  return `/score/${scoreSlug(pair)}`;
}

export const scorePairBySlug: Record<string, ScorePair> = Object.fromEntries(
  scorePairs.map((pair) => [scoreSlug(pair), pair]),
);

export const SCORE_HUB_PATH = "/score";

export function isScorePagePath(pathname: string): boolean {
  const path = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  if (path === SCORE_HUB_PATH) return true;
  const match = /^\/score\/([^/]+)$/.exec(path);
  return Boolean(match && scorePairBySlug[match[1]]);
}

/** 80 → "80%", 93.333… → "93.33%". */
export function formatPercent(value: number): string {
  return `${parseFloat(value.toFixed(2))}%`;
}

export function scoreKeywords({ score, total }: ScorePair): string[] {
  return [
    `${score} out of ${total}`,
    `${score}/${total} grade`,
    `what is ${score} out of ${total}`,
    `${score} out of ${total} as a percentage`,
    `${score} out of ${total} grade`,
  ];
}
