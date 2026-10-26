import { AppLink as Link } from "@/components/navigation/AppLink";
import { calculatorBySlug } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { percentToLetter } from "@/lib/grading-scales";
import { canonicalPathForSlug } from "@/lib/seo/intent-urls";
import type { CalculatorSlug } from "@/types/calculator";
import type { CountryCode, GradingScale, ScaleId } from "@/types/grading-scale";

const HUB_PATH: Record<CountryCode, string> = {
  US: "/us",
  UK: "/uk",
  CA: "/ca",
  AU: "/au",
  NZ: "/nz",
  IN: "/in",
  PK: "/pk",
};

/** Scales whose country hub lists tools that do not use this scale. */
const SCALE_TOOLS: Partial<Record<ScaleId, CalculatorSlug[]>> = {
  "us-standard": ["gpa-calculator", "percentage-to-letter-grade", "letter-grade-calculator", "grade-chart", "weighted-gpa-calculator"],
  "uk-degree": ["degree-classification-calculator", "uk-degree-to-us-gpa-reference"],
  "uk-gcse": ["gcse-grade-calculator"],
  "au-seven-point": ["gpa-calculator", "cumulative-gpa-calculator"],
  "au-uq-seven-point": ["gpa-calculator", "cumulative-gpa-calculator"],
  "au-monash-four-point": ["gpa-calculator", "cumulative-gpa-calculator"],
  "ca-standard": ["gpa-calculator", "letter-grade-calculator", "cumulative-gpa-calculator", "college-gpa-calculator"],
  // The Canada calculators are locked to the 4.0-cap preset, so the 4.33 page links the UBC tool below instead.
  "ca-four-three-three": [],
  "nz-nine-point": ["gpa-calculator", "letter-grade-calculator", "cumulative-gpa-calculator"],
  "in-ten-point": ["gpa-calculator", "cgpa-calculator", "cgpa-to-percentage", "sgpa-to-cgpa", "cgpa-to-gpa"],
  "pk-hec": ["gpa-calculator", "cumulative-gpa-calculator", "cgpa-calculator", "cgpa-to-percentage", "percentage-to-cgpa", "sgpa-to-cgpa"],
};

/** Tools outside the calculator registry (geo university pages) that use a given scale. */
const SCALE_EXTRA_TOOLS: Partial<Record<ScaleId, Array<{ href: string; label: string; description: string }>>> = {
  "ca-four-three-three": [
    {
      href: "/ca/university/ubc-gpa-calculator",
      label: "UBC GPA Calculator",
      description: "Convert UBC percentages with UBC Arts' published 4.33-scale equivalencies.",
    },
  ],
};

const SAMPLE_PERCENTS = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 30];
const EXAMPLE_PERCENT = 82;

function formatGpa(gpa: number | null, max: number | undefined) {
  if (gpa == null) return null;
  return max != null && max >= 10 ? String(gpa) : gpa.toFixed(2).replace(/0$/, "");
}

export function GradingScaleGuide({ scale }: { scale: GradingScale }) {
  const hubPath = HUB_PATH[scale.country];
  const hub = countryHubs.find((h) => h.path === hubPath);
  const toolSlugs = SCALE_TOOLS[scale.id] ?? hub?.featuredCalculators.slice(0, 5) ?? [];
  const tools = [
    ...toolSlugs.map((slug) => ({
      href: canonicalPathForSlug(slug, hubPath),
      label: calculatorBySlug[slug].name,
      description: calculatorBySlug[slug].description,
    })),
    ...(SCALE_EXTRA_TOOLS[scale.id] ?? []),
  ];
  const hasGpa = scale.bands.some((band) => band.gpa != null) && scale.id !== "uk-degree";
  const rows = SAMPLE_PERCENTS.map((percent) => ({ percent, ...percentToLetter(percent, scale.id) }));
  const example = percentToLetter(EXAMPLE_PERCENT, scale.id);
  const passBand = percentToLetter(scale.passPercent, scale.id);
  const gpaWord = scale.gpaMax != null && scale.gpaMax >= 10 ? "grade points" : "GPA points";

  return (
    <>
      <section>
        <h2 className="text-xl font-semibold">Quick lookup: common percentages on this scale</h2>
        <p className="mt-2 text-[var(--color-text-muted)]">
          How typical marks map on the {scale.name}. This scale treats {scale.passPercent}% ({passBand.letter}) as the
          lowest pass.
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full min-w-[280px] text-sm">
            <thead className="bg-[var(--color-bg-muted)]">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-medium">Percentage</th>
                <th scope="col" className="px-3 py-2 text-left font-medium">Grade</th>
                {hasGpa && (
                  <th scope="col" className="px-3 py-2 text-left font-medium">
                    {gpaWord}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.percent} className="odd:bg-[var(--color-bg-subtle)]">
                  <td className="px-3 py-2">{row.percent}%</td>
                  <td className="px-3 py-2">{row.letter}</td>
                  {hasGpa && <td className="px-3 py-2">{formatGpa(row.gpa, scale.gpaMax) ?? "—"}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to convert a percentage with this scale</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--color-text-muted)]">
          <li>Find the row in the table above whose percentage range contains your mark.</li>
          <li>
            Read the grade in that row{hasGpa ? ` and its ${gpaWord}` : ""}. Use the raw mark — do not round 69.9% up to
            70% unless your school says to.
          </li>
          {hasGpa && (
            <li>
              For a semester or overall GPA, multiply each course’s {gpaWord} by its credits, add them up, and divide by
              total credits.
            </li>
          )}
        </ol>
        <p className="mt-3 text-[var(--color-text-muted)]">
          <strong className="text-[var(--color-text)]">Example:</strong> a mark of {EXAMPLE_PERCENT}% falls in the{" "}
          {example.band.min}–{example.band.max}% band, so the grade is {example.letter}
          {hasGpa && example.gpa != null ? `, worth ${formatGpa(example.gpa, scale.gpaMax)} ${gpaWord}` : ""}.
        </p>
      </section>

      {tools.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Calculators that use this scale</h2>
          <ul className="mt-3 space-y-3">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="inline-flex min-h-11 items-center font-medium text-[var(--color-primary)] hover:underline">
                  {tool.label}
                </Link>
                <span className="text-[var(--color-text-muted)]"> — {tool.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
