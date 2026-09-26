import Link from "next/link";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { RelatedCalculators } from "@/components/content/RelatedCalculators";
import type { GuideConfig } from "@/config/guides";
import { guideBySlug } from "@/config/guides";

interface GuideArticleProps {
  guide: GuideConfig;
  embeddedCalculator?: React.ReactNode;
}

export function GuideArticle({ guide, embeddedCalculator }: GuideArticleProps) {
  return (
    <div className="space-y-8 text-[var(--color-text)]">
      <p className="text-sm text-[var(--color-text-muted)]">{guide.readTime}</p>

      {guide.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-muted)]">{section.body}</p>
        </section>
      ))}

      {embeddedCalculator && (
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 sm:p-6">
          <h2 className="text-lg font-semibold">Try it yourself</h2>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Use the calculator below with your own numbers.
          </p>
          <div className="mt-4">{embeddedCalculator}</div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-3">
          <FaqAccordion faqs={guide.faqs} />
        </div>
      </section>

      {guide.relatedGuides.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Related guides</h2>
          <ul className="mt-3 space-y-2">
            {guide.relatedGuides.map((slug) => {
              const related = guideBySlug[slug];
              return (
                <li key={slug}>
                  <Link href={related.path} className="text-[var(--color-primary)] hover:underline">
                    {related.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">Related calculators</h2>
        <div className="mt-4">
          <RelatedCalculators slugs={guide.relatedCalculators} />
        </div>
      </section>
    </div>
  );
}
