/**
 * "Grading scale for N questions" pages (/grade-chart/20-questions).
 *
 * Curated on purpose: each total has real "X out of N" search demand (Semrush US
 * export, Oct 2026). Add a total only when there is demand for it — do not
 * generate one page per number.
 */
export interface QuestionChartConfig {
  total: number;
  /** Scores people search for most on this total ("16 out of 20"), most-searched first. */
  popularScores: number[];
}

export const questionCharts: QuestionChartConfig[] = [
  { total: 10, popularScores: [8, 7, 6, 9] },
  { total: 12, popularScores: [10, 8, 9, 7, 11] },
  { total: 13, popularScores: [10, 11, 8, 9, 7] },
  { total: 15, popularScores: [11, 13, 12, 10, 9, 14] },
  { total: 16, popularScores: [13, 14, 12, 10, 11] },
  { total: 18, popularScores: [15, 14, 16, 13, 12] },
  { total: 20, popularScores: [16, 15, 17, 18, 13, 14] },
  { total: 25, popularScores: [20, 21, 18, 15, 23, 22] },
  { total: 30, popularScores: [23, 26, 21, 20, 25.5, 22] },
  { total: 40, popularScores: [32, 35, 37, 34, 33] },
  { total: 50, popularScores: [45, 35, 38, 43, 42.5, 40] },
  { total: 100, popularScores: [90, 86, 88, 75, 65] },
];

export function questionChartSlug(total: number): string {
  return `${total}-questions`;
}

export function questionChartPath(total: number): string {
  return `/grade-chart/${questionChartSlug(total)}`;
}

export const questionChartBySlug: Record<string, QuestionChartConfig> = Object.fromEntries(
  questionCharts.map((chart) => [questionChartSlug(chart.total), chart]),
);
