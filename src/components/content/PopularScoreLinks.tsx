import { AppLink as Link } from "@/components/navigation/AppLink";
import { SCORE_HUB_PATH, scorePairBySlug, scorePath } from "@/config/score-pages";

/** Most-searched "X out of Y" pairs (Semrush US export, Oct 2026). Every slug must exist in score-pages. */
const POPULAR = [
  "15-out-of-20", "12-out-of-20", "17-out-of-20", "16-out-of-20", "18-out-of-20", "13-out-of-20",
  "11-out-of-15", "12-out-of-15", "13-out-of-15", "14-out-of-15", "10-out-of-15",
  "20-out-of-25", "21-out-of-25", "22-out-of-25", "26-out-of-30", "23-out-of-30",
  "8-out-of-10", "7-out-of-10", "45-out-of-50", "40-out-of-50", "35-out-of-40", "118-out-of-150",
];

export const popularScoreSlugs = POPULAR;

export function PopularScoreLinks({ heading = "What is my score out of the total?" }: { heading?: string }) {
  return (
    <section aria-labelledby="popular-score-links-heading" className="no-print">
      <h2 id="popular-score-links-heading" className="text-lg font-semibold">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Popular scores with their percentage and letter grade. <Link href={SCORE_HUB_PATH} className="underline">See every score</Link>.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {POPULAR.map((slug) => {
          const pair = scorePairBySlug[slug];
          return (
            <li key={slug}>
              <Link
                href={scorePath(pair)}
                prefetch={false}
                className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
              >
                {pair.score} out of {pair.total}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
