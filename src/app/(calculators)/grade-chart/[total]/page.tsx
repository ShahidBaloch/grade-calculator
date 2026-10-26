import { AppLink as Link } from "@/components/navigation/AppLink";
import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  questionChartBySlug,
  questionChartPath,
  questionCharts,
  questionChartSlug,
} from "@/config/question-charts";
import { calculateGradeChart } from "@/lib/calculators/grade-chart";
import { scorePairBySlug, scorePath } from "@/config/score-pages";
import { questionChartScenario } from "@/lib/content/question-chart-copy";
import { percentToLetter } from "@/lib/grading-scales";
import { createPageMetadata } from "@/lib/seo/metadata";
import { webPageJsonLd } from "@/lib/seo/jsonld";

interface PageProps {
  params: Promise<{ total: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

const SCALE_ID = "us-standard" as const;

export function generateStaticParams() {
  return questionCharts.map((chart) => ({ total: questionChartSlug(chart.total) }));
}

/** 80 → "80%", 93.333… → "93.33%", 82.5 → "82.5%". */
function pct(value: number) {
  return `${parseFloat(value.toFixed(2))}%`;
}

function copyFor(total: number) {
  const perQuestion = 100 / total;
  return {
    title: `Grading Scale for ${total} Questions — Percent Chart`,
    description: `Free ${total}-question grading chart: every score from ${total} to 0 with wrong answers, percentage, letter grade, and half points. Each question is worth ${pct(perQuestion)}.`,
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { total: slug } = await params;
  const chart = questionChartBySlug[slug];
  if (!chart) return {};
  const { title, description } = copyFor(chart.total);
  return createPageMetadata({
    title,
    description,
    path: questionChartPath(chart.total),
    keywords: [
      `grading scale for ${chart.total} questions`,
      `out of ${chart.total} grade`,
      `${chart.total} question test grade`,
    ],
  });
}

export default async function QuestionChartPage({ params }: PageProps) {
  const { total: slug } = await params;
  const chart = questionChartBySlug[slug];
  if (!chart) notFound();

  const { total, popularScores } = chart;
  const path = questionChartPath(total);
  const { title, description } = copyFor(total);
  const result = calculateGradeChart(total, SCALE_ID);
  if (!result.data) notFound();
  const { rows, bands } = result.data;

  const perQuestion = 100 / total;
  const toPass = Math.ceil((60 / 100) * total);
  const forA = Math.ceil((90 / 100) * total);
  const neighbors = questionCharts.filter((c) => c.total !== total);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Grade Chart", href: "/grade-chart" },
    { name: `${total} Questions`, href: path },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <JsonLd data={webPageJsonLd({ name: title, description, path })} />
      <ContentPageLayout title={`Grading Scale for ${total} Questions`} description={description} breadcrumbs={breadcrumbs}>
        <p>
          On a {total}-question test where every question counts the same, each question is worth{" "}
          <strong>{pct(perQuestion)}</strong>. One wrong answer gives {pct(((total - 1) / total) * 100)}, a passing
          60% needs <strong>{toPass} correct</strong>, and an A (90% or higher) needs <strong>{forA} correct</strong>.
          Letter grades below use the common US plus/minus scale; your teacher&apos;s syllabus sets the real cutoffs.
        </p>

        <h2>What a {total}-question test looks like in practice</h2>
        <p>{questionChartScenario(total, rows, bands, SCALE_ID)}</p>

        <h2>Popular scores out of {total}</h2>
        <ul>
          {popularScores.map((score) => {
            const percent = (score / total) * 100;
            const wrong = total - score;
            return (
              <li key={score}>
                <strong>
                  {scorePairBySlug[`${score}-out-of-${total}`] ? (
                    <Link href={scorePath({ score, total })} prefetch={false}>
                      {score} out of {total}
                    </Link>
                  ) : (
                    <>
                      {score} out of {total}
                    </>
                  )}
                </strong>{" "}
                = {pct(percent)}, letter grade {percentToLetter(percent, SCALE_ID).letter} ({parseFloat(wrong.toFixed(1))} wrong).
              </li>
            );
          })}
        </ul>

        <h2>{total}-question grading chart</h2>
        <p>
          The last column shows the score when a half point of partial credit is added (for example{" "}
          {total - 3}.5 out of {total}).
        </p>
        <div className="not-prose overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-bg-muted)]">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Correct</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Wrong</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Percent</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Letter</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">With ½ point</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const half = row.points < total ? ((row.points + 0.5) / total) * 100 : null;
                return (
                  <tr key={row.points} className="odd:bg-[var(--color-bg-subtle)]">
                    <td className="px-3 py-1.5 font-medium">{row.points}</td>
                    <td className="px-3 py-1.5">{total - row.points}</td>
                    <td className="px-3 py-1.5">{pct(row.percent)}</td>
                    <td className="px-3 py-1.5">{row.letterGrade}</td>
                    <td className="px-3 py-1.5">
                      {half == null ? "—" : `${pct(half)} (${percentToLetter(half, SCALE_ID).letter})`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>Scores needed for each letter grade</h2>
        <div className="not-prose overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-bg-muted)]">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Letter</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Percent</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Correct out of {total}</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((band) => (
                <tr key={band.letter} className="odd:bg-[var(--color-bg-subtle)]">
                  <td className="px-3 py-1.5 font-medium">{band.letter}</td>
                  <td className="px-3 py-1.5">
                    {band.minPercent}–{band.maxPercent}%
                  </td>
                  <td className="px-3 py-1.5">
                    {band.minPoints == null || band.maxPoints == null
                      ? "No whole score"
                      : band.minPoints === band.maxPoints
                        ? band.minPoints
                        : `${band.minPoints}–${band.maxPoints}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How to grade a {total}-question test</h2>
        <p>
          Divide the number correct by {total} and multiply by 100. For example, {popularScores[0]} ÷ {total} × 100 ={" "}
          {pct((popularScores[0] / total) * 100)}. If your school uses a 7-point scale (often 93–100 = A, 85–92 = B,
          77–84 = C, 70–76 = D), the same percentage can earn a lower letter, so compare with the{" "}
          <Link href="/grading-scales/us">US grading scale</Link> your school publishes.
        </p>
        <p>
          To score a test by wrong answers, use the <Link href="/">EZ grader</Link>. For bonus points or a different
          number of questions, use the <Link href="/test-grade-calculator">test grade calculator</Link> or build a
          chart for any total with the <Link href="/grade-chart">grade chart</Link>.
        </p>

        <section className="no-print">
          <h2>Other test lengths</h2>
          <ul className="not-prose mt-3 flex list-none flex-wrap gap-2 p-0">
            {neighbors.map((c) => (
              <li key={c.total}>
                <Link
                  href={questionChartPath(c.total)}
                  prefetch={false}
                  className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
                >
                  Grading scale for {c.total} questions
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </ContentPageLayout>
    </>
  );
}
