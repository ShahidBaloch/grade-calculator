import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "Grading Scales & Grade Charts by Country",
  description:
    "Free grade charts and grading scales for US, UK, Canadian, Australian, New Zealand, India, and Pakistan systems. See what percentage is an A, B, or C on each scale, including high school and university grading.",
  path: "/grading-scales",
  keywords: [
    "grading scale",
    "letter grade chart",
    "gpa scale",
    "grade scale",
    "grading scale for high schools",
    "grading scale for schools",
    "b grade percentage",
    "c grade percentage",
    "grade percentages",
  ],
});

export default function GradingScalesHubPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Grading Scales", href: "/grading-scales" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold">Grading Scales &amp; Grade Charts by Country</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Letter grades, grade percentages, and GPA points by country. On the standard US grading
          scale, an A is 93–100%, a B is 83–92%, a C is 73–82%, and a D is 63–72%. High school and
          university grading scales vary — pick your country below for the exact chart.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {gradingScalePages.map((page) => (
            <Link
              key={page.slug}
              href={page.path}
              className="rounded-lg border border-[var(--color-border)] p-6 transition-shadow hover:shadow-md"
            >
              <h2 className="font-semibold">{page.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{page.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
