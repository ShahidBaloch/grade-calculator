import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { guides } from "@/config/guides";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata = createPageMetadata({
  title: "Grade & GPA Guides",
  description:
    "Free guides on calculating GPA, weighted grades, final exam targets, and understanding grading scales.",
  path: "/guides",
  keywords: ["how to calculate gpa", "weighted grades guide", "final exam tips"],
});

export default function GuidesHubPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold">Guides & How-To Articles</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Learn how grades and GPA work. Four guides include a live calculator; the rest link to the matching tools.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.path}
              className="rounded-lg border border-[var(--color-border)] p-6 transition-shadow hover:shadow-md"
            >
              <p className="text-xs text-[var(--color-text-muted)]">{guide.readTime}</p>
              <h2 className="mt-1 font-semibold">{guide.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{guide.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
