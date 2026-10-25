import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "Grading Scale — US A–F Grade Scale & Grading Chart",
  description:
    "The standard US grading scale: A 90–100%, B 80–89%, C 70–79%, D 60–69%, F below 60%, with plus/minus cutoffs and 4.0 GPA points. Plus grade scales by country.",
  path: "/grading-scales",
  keywords: [
    "grading scale",
    "grade scale",
    "grading scale chart",
    "letter grade chart",
    "a-f grading scale",
    "grading scale for high schools",
    "grading scale for schools",
    "grading scales by country",
  ],
});

const US_ROWS: Array<[string, string, string]> = [
  ["A+", "97–100%", "4.0"],
  ["A", "93–96%", "4.0"],
  ["A−", "90–92%", "3.7"],
  ["B+", "87–89%", "3.3"],
  ["B", "83–86%", "3.0"],
  ["B−", "80–82%", "2.7"],
  ["C+", "77–79%", "2.3"],
  ["C", "73–76%", "2.0"],
  ["C−", "70–72%", "1.7"],
  ["D+", "67–69%", "1.3"],
  ["D", "63–66%", "1.0"],
  ["D−", "60–62%", "0.7"],
  ["F", "Below 60%", "0.0"],
];

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
        <h1 className="mt-4 text-3xl font-bold">Grading Scale: US A–F Grade Scale &amp; Chart</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Letter grades, grade percentages, and GPA points by country. On the standard US grading
          scale, an A (including A− and A+) is 90–100%, a B is 80–89%, a C is 70–79%, a D is 60–69%, and an F is
          below 60%. High school and
          university grading scales vary — pick your country below for the exact chart.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Standard US grading scale (A–F)</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-bg-muted)]">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Letter</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Percentage</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">4.0 GPA</th>
              </tr>
            </thead>
            <tbody>
              {US_ROWS.map(([letter, range, gpa]) => (
                <tr key={letter} className="odd:bg-[var(--color-bg-subtle)]">
                  <td className="px-3 py-1.5 font-medium">{letter}</td>
                  <td className="px-3 py-1.5">{range}</td>
                  <td className="px-3 py-1.5">{gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          Common plus/minus cutoffs; some districts use a 7-point scale (A = 93–100). See the{" "}
          <Link href="/grading-scales/us" className="underline">full US grading scale</Link>, the{" "}
          <Link href="/grade-chart" className="underline">grade chart by number of questions</Link>, or the{" "}
          <Link href="/grade-percentage-calculator" className="underline">grade percentage calculator</Link>.
        </p>
        <h2 className="mt-10 text-xl font-semibold">Grading scales by country</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
