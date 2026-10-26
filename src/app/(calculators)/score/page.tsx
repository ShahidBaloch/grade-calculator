import { AppLink as Link } from "@/components/navigation/AppLink";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { ScoreOutOfCalculator } from "@/components/calculators/ScoreOutOfCalculator";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { SCORE_HUB_PATH, formatPercent, scorePairs, scorePath, scoreSlug } from "@/config/score-pages";
import { percentToLetter } from "@/lib/grading-scales";
import { createPageMetadata } from "@/lib/seo/metadata";
import { webPageJsonLd } from "@/lib/seo/jsonld";

const title = "Score Out of Total to Grade — X Out of Y Calculator";
const description =
  "Turn any score out of a total into a percentage and US letter grade. Enter points earned and points possible, or pick a common score like 15 out of 20.";

export const metadata = createPageMetadata({
  title,
  description,
  path: SCORE_HUB_PATH,
  keywords: ["out of grade calculator", "x out of y grade", "score out of", "what is my score out of", "points out of total to percentage"],
});

export default function ScoreHubPage() {
  const totals = [...new Set(scorePairs.map((p) => p.total))];
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Score Out of Total", href: SCORE_HUB_PATH },
  ];
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <JsonLd data={webPageJsonLd({ name: title, description, path: SCORE_HUB_PATH })} />
      <ContentPageLayout title="Score Out of Total to Grade Calculator" description={description} breadcrumbs={breadcrumbs}>
        <div className="not-prose my-6">
          <ScoreOutOfCalculator />
        </div>
        <p>
          The formula is always the same: <strong>score ÷ total × 100 = percentage</strong>. Then match the percentage
          to the US A–F scale: 90%+ is an A, 80–89% a B, 70–79% a C, 60–69% a D, and below 60% an F. Check your
          syllabus, since some schools use a 7-point scale or different plus/minus cutoffs. To score a whole test from
          wrong answers, use the <Link href="/test-grade-calculator">test grade calculator</Link>.
        </p>
        {totals.map((total) => (
          <section key={total}>
            <h2>Scores out of {total}</h2>
            <ul className="not-prose flex flex-wrap gap-2">
              {scorePairs
                .filter((p) => p.total === total)
                .map((p) => {
                  const percent = (p.score / total) * 100;
                  return (
                    <li key={scoreSlug(p)}>
                      <Link
                        href={scorePath(p)}
                        prefetch={false}
                        className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm hover:bg-[var(--color-bg-subtle)]"
                      >
                        {p.score}/{total} · {formatPercent(percent)} {percentToLetter(percent, "us-lenient").letter}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </ContentPageLayout>
    </>
  );
}
