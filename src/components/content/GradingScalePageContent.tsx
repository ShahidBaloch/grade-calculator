import Link from "next/link";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import { GradingScaleGuide } from "@/components/content/GradingScaleGuide";
import { GradingScaleTable } from "@/components/content/GradingScaleTable";
import { ScaleComparisonTable } from "@/components/content/ScaleComparisonTable";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { getScale } from "@/lib/grading-scales";
import type { GradingScalePageConfig } from "@/config/grading-scale-pages";

export function GradingScalePageContent({ config }: { config: GradingScalePageConfig }) {
  const scale = getScale(config.scaleId);
  const compareIds = config.compareScaleIds ?? [];

  return (
    <div className="space-y-8">
      <p className="leading-relaxed text-[var(--color-text-muted)]">{config.intro}</p>
      <GradingScaleTable scale={scale} />
      {compareIds.length > 1 && (
        <section>
          <h2 className="text-xl font-semibold">10-point vs plus/minus vs 7-point: the same percentage, side by side</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-muted)]">
            US schools do not all draw the lines in the same place. Find your percentage in the first column
            and read across to see the letter (and 4.0 grade points) each common scale would give it. A 92%
            is an A on the 10-point scale, an A− on the plus/minus scale, and only a B on the 7-point scale.
          </p>
          <div className="mt-4">
            <ScaleComparisonTable scaleIds={compareIds} />
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Scoring a test? The <Link href="/" className="text-[var(--color-primary)] hover:underline">EZ grader</Link>{" "}
            and <Link href="/grade-chart" className="text-[var(--color-primary)] hover:underline">grade chart</Link>{" "}
            let you switch between these scales. For how 4.0, 5.0 and 7.0 GPA scales differ, read{" "}
            <Link href="/guides/gpa-scale-explained" className="text-[var(--color-primary)] hover:underline">GPA scales explained</Link>.
          </p>
        </section>
      )}
      <GradingScaleGuide scale={scale} />
      <section>
        <h2 className="text-xl font-semibold">Important notes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
          {config.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
      {scale.sources.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Sources</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--color-text-muted)]">
            {scale.sources.map((source) => {
              const label = typeof source === "string" ? source : source.label;
              const href =
                typeof source === "string"
                  ? /^https?:\/\//i.test(source)
                    ? source
                    : undefined
                  : source.href;
              return (
                <li key={href ?? label}>
                  {href ? (
                    <a
                      href={href}
                      className="inline-block py-1 text-[var(--color-primary)] hover:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {config.faqs && config.faqs.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Common questions</h2>
          <div className="mt-3">
            <FaqAccordion faqs={config.faqs} />
          </div>
        </section>
      )}
      <section>
        <h2 className="text-xl font-semibold">Other grading scales</h2>
        <ul className="mt-3 space-y-2">
          {gradingScalePages
            .filter((p) => p.slug !== config.slug)
            .map((p) => (
              <li key={p.slug}>
                <Link href={p.path} className="inline-flex min-h-6 items-center text-[var(--color-primary)] hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
