import { AppLink as Link } from "@/components/navigation/AppLink";
import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { ScoreOutOfCalculatorLazy } from "@/components/calculators/ScoreOutOfCalculatorLazy";
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
import { getScale, percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";
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

/** Scales compared per score: the same percentage is a different letter depending on the school. */
const COMPARE_SCALE_IDS: ScaleId[] = ["us-lenient", "us-standard", "us-seven-point"];

function facts({ score, total }: ScorePair) {
  const percent = (score / total) * 100;
  const { letter, gpa } = percentToLetter(percent, SCORE_SCALE_ID);
  const wrong = total - score;
  const next = [...CUTOFFS].reverse().find((c) => c.min > percent);
  const pointsToNext = next ? Math.ceil((next.min / 100) * total - score - 1e-9) : 0;
  const floor = CUTOFFS.find((c) => c.min <= percent);
  // Points that can be lost before dropping out of the current letter (null for an F).
  const cushion = floor ? Math.floor(score - (floor.min / 100) * total + 1e-9) : null;
  // Within half a point of the next cutoff: a teacher who rounds to the nearest whole percent bumps it up.
  const roundsUp = next && next.min - percent <= 0.5 ? next : null;
  return {
    percent,
    letter,
    gpa,
    wrong,
    next,
    pointsToNext,
    cushion,
    roundsUp,
    decimal: score / total,
  };
}

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

/** 15/20 → "3/4"; null when already in lowest terms. */
function simplified({ score, total }: ScorePair) {
  const d = gcd(score, total);
  return d > 1 ? `${score / d}/${total / d}` : null;
}

/** One-line reading of the score that changes with the letter band. */
function meaning(letter: string, percent: number) {
  const p = formatPercent(percent);
  switch (letter) {
    case "A":
      return percent === 100
        ? "A perfect paper: every point earned. On a weighted course grade, a 100% test lifts the average more than any other single score."
        : `${p} is excellent work. It sits in the top band on every common US scale, so it helps your course average no matter how your teacher sets the cutoffs.`;
    case "B":
      return `${p} is a solid, above-average result. It is a B on the 10-point scale, but stricter scales can record the same percentage a step lower (see the table below), so check your syllabus if you are near a cutoff.`;
    case "C":
      return `${p} is an average, passing grade. Many college majors and prerequisite courses require at least a C, so this score clears that bar on the 10-point scale.`;
    case "D":
      return `${p} passes in most US schools but is below average. On a 7-point scale (70% to pass) it is an F, and many programs do not accept a D for credit toward a major.`;
    default:
      return `${p} is below the usual 60% passing line. One low test rarely decides a course grade; use the final grade calculator to see what you need on the remaining work.`;
  }
}

function copyFor(pair: ScorePair) {
  const { percent, letter } = facts(pair);
  return {
    title: `${pair.score} out of ${pair.total} as a Grade & Percentage — ${formatPercent(percent)} (${letter})`,
    description: `${pair.score} out of ${pair.total} is ${formatPercent(percent)}, ${withArticle(letter)} on the common US 10-point grading scale. See the math, GPA points, and how many points to the next letter grade.`,
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { pair: slug } = await params;
  const pair = scorePairBySlug[slug];
  if (!pair) return {};
  const { title, description } = copyFor(pair);
  return createPageMetadata({
    title,
    description,
    path: scorePath(pair),
    keywords: scoreKeywords(pair),
  });
}

export default async function ScorePairPage({ params }: PageProps) {
  const { pair: slug } = await params;
  const pair = scorePairBySlug[slug];
  if (!pair) notFound();
  const { score, total } = pair;
  const path = scorePath(pair);
  const { title, description } = copyFor(pair);
  const f = facts(pair);
  const fraction = simplified(pair);
  const scaleRows = COMPARE_SCALE_IDS.map((id) => {
    const r = percentToLetter(f.percent, id);
    return {
      name: getScale(id).name,
      letter: r.letter,
      gpa: r.gpa == null ? "—" : r.gpa.toFixed(1),
    };
  });
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
          , which is {article(f.letter)} <strong>{f.letter}</strong> on the common US grading scale
          (
          {f.wrong === 0
            ? "a perfect score"
            : `${parseFloat(f.wrong.toFixed(1))} point${f.wrong === 1 ? "" : "s"} missed`}
          ).
        </p>
        <div className="not-prose my-6">
          <ScoreOutOfCalculatorLazy initialScore={score} initialTotal={total} />
        </div>

        <h2>
          How to calculate {score} out of {total}
        </h2>
        <ol>
          <li>
            Divide the score by the total: {score} ÷ {total} = {parseFloat(f.decimal.toFixed(4))}.
          </li>
          <li>Multiply by 100: {formatPercent(f.percent)}.</li>
          <li>
            Match the percentage to the grading scale: {formatPercent(f.percent)} falls in the{" "}
            {f.letter} band.
          </li>
        </ol>

        <p>{meaning(f.letter, f.percent)}</p>

        <h2>
          Grade facts for {score}/{total}
        </h2>
        <ul>
          <li>Percentage: {formatPercent(f.percent)}</li>
          <li>
            As a fraction: {score}/{total}
            {fraction ? ` (simplifies to ${fraction})` : ""}, or {parseFloat(f.decimal.toFixed(4))}{" "}
            as a decimal
          </li>
          <li>Letter grade (US 10-point scale): {f.letter}</li>
          <li>GPA points on a 4.0 scale: {(f.gpa ?? 0).toFixed(1)}</li>
          <li>Each point on this test is worth {formatPercent(100 / total)}.</li>
          {f.next ? (
            <li>
              Points needed for a {f.next.letter} ({f.next.min}%): {f.pointsToNext} more out of{" "}
              {total}.
            </li>
          ) : (
            <li>This is already in the A range (90% or higher).</li>
          )}
          {f.cushion !== null && f.cushion > 0 && (
            <li>
              Cushion: you could lose {f.cushion} more point{f.cushion === 1 ? "" : "s"} and still
              keep {withArticle(f.letter)}.
            </li>
          )}
          {f.roundsUp && (
            <li>
              Borderline: {formatPercent(f.percent)} is within half a point of {f.roundsUp.min}%. A
              teacher who rounds to the nearest whole percent would record{" "}
              {withArticle(f.roundsUp.letter)}.
            </li>
          )}
        </ul>

        <h2>
          {score} out of {total} on different grading scales
        </h2>
        <p>
          US schools do not all use the same cutoffs, so the same {formatPercent(f.percent)} can
          earn a different letter:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th scope="col">Grading scale</th>
                <th scope="col">Letter</th>
                <th scope="col">GPA points</th>
              </tr>
            </thead>
            <tbody>
              {scaleRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.letter}</td>
                  <td>{row.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
            <Link href="/test-grade-calculator" prefetch={false}>
              Test grade calculator
            </Link>{" "}
            — score a test from wrong answers, with bonus points
          </li>
          <li>
            <Link href="/grade-percentage-calculator" prefetch={false}>
              Grade percentage calculator
            </Link>
          </li>
          <li>
            <Link href={SCORE_HUB_PATH} prefetch={false}>
              All scores out of {total} and other totals
            </Link>
          </li>
        </ul>
      </ContentPageLayout>
    </>
  );
}
