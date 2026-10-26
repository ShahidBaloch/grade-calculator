import { AppLink as Link } from "@/components/navigation/AppLink";
import { questionChartPath, questionCharts } from "@/config/question-charts";

/** Links to the "grading scale for N questions" charts (homepage, /grade-chart, test grade calculator). */
export function QuestionChartLinks({ heading = "Grading scale by number of questions" }: { heading?: string }) {
  return (
    <section aria-labelledby="question-chart-links-heading" className="no-print">
      <h2 id="question-chart-links-heading" className="text-lg font-semibold">
        {heading}
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Printable charts with every score, percentage, and letter grade, including half points.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {questionCharts.map((chart) => (
          <li key={chart.total}>
            <Link
              href={questionChartPath(chart.total)}
              prefetch={false}
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-btn-border)] bg-[var(--color-btn-bg)] px-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              {chart.total} questions
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
