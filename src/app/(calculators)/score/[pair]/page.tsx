import { AppLink as Link } from "@/components/navigation/AppLink";
import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { ScoreOutOfCalculator } from "@/components/calculators/ScoreOutOfCalculator";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { questionChartPath, questionCharts } from "@/config/question-charts";
import {
  SCORE_HUB_PATH,
  formatPercent,
  scoreKeywords,
  scorePairBySlug,
  scorePairs,
  scorePath,
  scoreSlug,
  type ScorePair,
} from "@/config/score-pages";
import { percentToLetter } from "@/lib/grading-scales";
import { createPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return scorePairs.map((pair) => ({ pair: scoreSlug(pair) }));
}

/** Same 10-point scale as the EZ grader and the CUTOFFS below (90 = A). */
const SCORE_SCALE_ID = "us-lenient" as const;

/** "an A", "an F", "a B". */
function article(letter: string) {
  return /^[AEF]/.test(letter) ? "an" : "a";
}

function withArticle(letter: string) {
  return `${article(letter)} ${letter}`;
}

const CUTOFFS = [
  { letter: "A", min: 90 },
  { letter: "B", min: 80 },
  { letter: "C", min: 70 },
  { letter: "D", min: 60 },
];

function facts({ score, total }: ScorePair) {
  const percent = (score / total) * 100;
  const { letter, gpa } = percentToLetter(percent, SCORE_SCALE_ID);
  const wrong = total - score;
  const next = [...CUTOFFS].reverse().find((c) => c.min > percent);
  const pointsToNext = next ? Math.ceil((next.min / 100) * total - score - 1e-9) : 0;
  return { percent, letter, gpa, wrong, next, pointsToNext, decimal: score / total };
}

function copyFor(pair: ScorePair) {
  const { percent, letter } = facts(pair);
  return {
    title: `${pair.score} out of ${pair.total} as a Grade — ${formatPercent(percent)} (${letter})`,
    description: `${pair.score} out of ${pair.total} is ${formatPercent(percent)}, ${withArticle(letter)} on the common US 10-point grading scale. See the math, GPA points, and how many points to the next letter grade.`,
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { pair: slug } = await params;
  const pair = scorePairBySlug[slug];
  if (!pair) return {};
  const { title, description } = copyFor(pair);
  return createPageMetadata({ title, description, path: scorePath(pair), keywords: scoreKeywords(pair) });
}

export default async function ScorePairPage({ params }: PageProps) {
  const { pair: slug } = await params;
  const pair = scorePairBySlug[slug];
  if (!pair) notFound();
  const { score, total } = pair;
  const path = scorePath(pair);
  const { title, description } = copyFor(pair);
  const f = facts(pair);
  const hasChart = questionCharts.some((c) => c.total === total);
  // Closest pairs by score, not a fixed ±3 window: /150 and /200 pairs are spaced 4–10 apart and would get no links.
  const neighbors = scorePairs
    .filter((p) => p.total === total && p.score !== score)
    .sort((a, b) => Math.abs(a.score - score) - Math.abs(b.score - score))
    .slice(0, 6)
    .sort((a, b) => a.score - b.score);
  const sameScore = scorePairs.filter((p) => p.score === score && p.total !== total).slice(0, 6);

  const faqs = [
    {
      question: `What is ${score} out of ${total} as a percentage?`,
      answer: `${score} ÷ ${total} = ${parseFloat(f.decimal.toFixed(4))}. Multiply by 100 to get ${formatPercent(f.percent)}.`,
    },
    {
      question: `What letter grade is ${score} out of ${total}?`,
      answer: `On the common US 10-point scale (A 90+, B 80+), ${formatPercent(f.percent)} is ${withArticle(f.letter)} (${(f.gpa ?? 0).toFixed(1)} GPA points). Your teacher's syllabus sets the real cutoffs.`,
    },
    {
      question: `Is ${score} out of ${total} a passing grade?`,
      answer:
        f.percent >= 60
          ? `Yes. ${formatPercent(f.percent)} is above the usual 60% passing line in US schools, though some classes require 65% or 70%.`
          : `Usually not. ${formatPercent(f.percent)} is below the common 60% passing line in US schools.`,
    },
  ];

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Score Out of Total", href: SCORE_HUB_PATH },
    { name: `${score} out of ${total}`, href: path },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <JsonLd data={webPageJsonLd({ name: title, description, path })} />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <ContentPageLayout
        title={`What Is ${score} Out of ${total} as a Grade?`}
        description={description}
        breadcrumbs={breadcrumbs}
      >
        <p>
          <strong>
            {score} out of {total} = {formatPercent(f.percent)}
          </strong>
          , which is {article(f.letter)} <strong>{f.letter}</strong> on the common US grading scale ({f.wrong === 0 ? "a perfect score" : `${parseFloat(f.wrong.toFixed(1))} point${f.wrong === 1 ? "" : "s"} missed`}).
        </p>
        <div className="not-prose my-6">
          <ScoreOutOfCalculator initialScore={score} initialTotal={total} />
        </div>

        <h2>How to calculate {score} out of {total}</h2>
        <ol>
          <li>
            Divide the score by the total: {score} ÷ {total} = {parseFloat(f.decimal.toFixed(4))}.
          </li>
          <li>Multiply by 100: {formatPercent(f.percent)}.</li>
          <li>
            Match the percentage to the grading scale: {formatPercent(f.percent)} falls in the {f.letter} band.
          </li>
        </ol>

        <h2>Grade facts for {score}/{total}</h2>
        <ul>
          <li>Percentage: {formatPercent(f.percent)}</li>
          <li>Letter grade (US 10-point scale): {f.letter}</li>
          <li>GPA points on a 4.0 scale: {(f.gpa ?? 0).toFixed(1)}</li>
          <li>Each point on this test is worth {formatPercent(100 / total)}.</li>
          {f.next ? (
            <li>
              Points needed for a {f.next.letter} ({f.next.min}%): {f.pointsToNext} more out of {total}.
            </li>
          ) : (
            <li>This is already in the A range (90% or higher).</li>
          )}
        </ul>

        <h2>Nearby scores out of {total}</h2>
        <ul>
          {neighbors.map((p) => {
            const nf = facts(p);
            return (
              <li key={scoreSlug(p)}>
                <Link href={scorePath(p)} prefetch={false}>
                  {p.score} out of {total}
                </Link>{" "}
                = {formatPercent(nf.percent)} ({nf.letter})
              </li>
            );
          })}
        </ul>

        {sameScore.length > 0 && (
          <>
            <h2>{score} out of other totals</h2>
            <ul>
              {sameScore.map((p) => (
                <li key={scoreSlug(p)}>
                  <Link href={scorePath(p)} prefetch={false}>
                    {score} out of {p.total}
                  </Link>{" "}
                  = {formatPercent((score / p.total) * 100)}
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>Frequently asked questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}

        <h2>Related tools</h2>
        <ul>
          {hasChart && (
            <li>
              <Link href={questionChartPath(total)} prefetch={false}>
                Full grading scale for {total} questions
              </Link>
            </li>
          )}
          <li>
            <Link href="/test-grade-calculator" prefetch={false}>Test grade calculator</Link> — score a test from
            wrong answers, with bonus points
          </li>
          <li>
            <Link href="/grade-percentage-calculator" prefetch={false}>Grade percentage calculator</Link>
          </li>
          <li>
            <Link href={SCORE_HUB_PATH} prefetch={false}>All scores out of {total} and other totals</Link>
          </li>
        </ul>
      </ContentPageLayout>
    </>
  );
}
