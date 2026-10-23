import Link from "next/link";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { HowItWorks } from "@/components/content/HowItWorks";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import type { GeoPageCopy, GeoPageSection } from "@/lib/content/geo-page-copy";
import type { GeoLinkGroup } from "@/lib/seo/geo-programmatic";
import { webApplicationJsonLd } from "@/lib/seo/jsonld";
import type { BreadcrumbItem } from "@/types/seo";

export function SectionBlock({ section, index }: { section: GeoPageSection; index: number }) {
  const id = `geo-section-${index}`;
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-xl font-semibold">
        {section.heading}
      </h2>
      {section.quote && (
        <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 text-sm italic">
          “{section.quote.text}”
          <footer className="mt-1 not-italic text-[var(--color-text-muted)]">— {section.quote.cite}</footer>
        </blockquote>
      )}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 60)} className="text-sm leading-relaxed text-[var(--color-text-muted)]">
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--color-text-muted)]">
          {section.bullets.map((bullet) => (
            <li key={bullet.slice(0, 60)}>{bullet}</li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <caption className="px-3 py-2 text-left text-xs text-[var(--color-text-muted)]">{section.table.caption}</caption>
            <thead className="bg-[var(--color-bg-muted)]">
              <tr>
                {section.table.head.map((cell) => (
                  <th key={cell} scope="col" className="px-3 py-2 text-left font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-[var(--color-bg-subtle)]">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function GeoLinkList({ group }: { group: GeoLinkGroup }) {
  return (
    <section aria-label={group.heading} className="space-y-2">
      <h2 className="text-lg font-semibold">{group.heading}</h2>
      <p className="text-sm text-[var(--color-text-muted)]">{group.intro}</p>
      <ul className="space-y-2 text-sm">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-6 items-center font-medium text-[var(--color-primary)] hover:underline">
              {link.title}
            </Link>
            <span className="block text-[var(--color-text-muted)]">{link.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GeoProgrammaticPage({
  copy,
  path,
  breadcrumbs,
  calculator,
  related,
}: {
  copy: GeoPageCopy;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  calculator: React.ReactNode;
  related: GeoLinkGroup;
}) {
  const siblings = { ...related, links: related.links.filter((link) => link.href !== path) };

  const aside = (
    <div className="space-y-8">
      <section aria-labelledby="geo-steps-heading">
        <h2 id="geo-steps-heading" className="text-lg font-semibold">Quick steps</h2>
        <div className="mt-3">
          <HowItWorks steps={copy.steps} />
        </div>
      </section>
      <section aria-labelledby="geo-sources-heading" className="space-y-2">
        <h2 id="geo-sources-heading" className="text-lg font-semibold">Sources</h2>
        <ul className="space-y-3 text-sm">
          {copy.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} rel="noopener" className="inline-block py-1 font-medium text-[var(--color-primary)] hover:underline">
                {source.title}
              </a>
              <span className="block text-[var(--color-text-muted)]">
                {source.publisher}
                {source.edition ? ` · ${source.edition}` : ""} · checked {source.checked}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <GeoLinkList group={siblings} />
    </div>
  );

  const below = (
    <div className="space-y-10">
      {copy.sections.map((section, index) => (
        <SectionBlock key={section.heading} section={section} index={index} />
      ))}
      <section aria-labelledby="geo-faq-heading" className="space-y-4">
        <h2 id="geo-faq-heading" className="text-xl font-semibold">Common questions</h2>
        {copy.faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-base font-medium">{faq.question}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{faq.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );

  return (
    <>
      <JsonLd data={webApplicationJsonLd({ name: copy.title, description: copy.description, path })} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CalculatorLayout
        title={copy.h1}
        description={copy.description}
        breadcrumbs={breadcrumbs}
        calculator={
          <>
            {copy.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 60)} className="mb-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                {paragraph}
              </p>
            ))}
            {calculator}
          </>
        }
        content={aside}
        below={below}
      />
    </>
  );
}
