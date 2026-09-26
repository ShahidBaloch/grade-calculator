import Link from "next/link";
import { GradingScaleTable } from "@/components/content/GradingScaleTable";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { getScale } from "@/lib/grading-scales";
import type { GradingScalePageConfig } from "@/config/grading-scale-pages";

export function GradingScalePageContent({ config }: { config: GradingScalePageConfig }) {
  const scale = getScale(config.scaleId);

  return (
    <div className="space-y-8">
      <p className="leading-relaxed text-[var(--color-text-muted)]">{config.intro}</p>
      <GradingScaleTable scale={scale} />
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
                      className="text-[var(--color-primary)] hover:underline"
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
      <section>
        <h2 className="text-xl font-semibold">Other grading scales</h2>
        <ul className="mt-3 space-y-2">
          {gradingScalePages
            .filter((p) => p.slug !== config.slug)
            .map((p) => (
              <li key={p.slug}>
                <Link href={p.path} className="text-[var(--color-primary)] hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
