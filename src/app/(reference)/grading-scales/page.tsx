import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "Grading Scales by Country",
  description:
    "Compare letter grades, percentages, and GPA points across US, UK, and Australian grading systems.",
  path: "/grading-scales",
  keywords: ["grading scale", "letter grade chart", "gpa scale"],
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
        <h1 className="mt-4 text-3xl font-bold">Grading Scales by Country</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Reference charts for US, UK, and Australian grading systems. Scales are applied automatically
          based on your location, or choose one in any calculator.
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
