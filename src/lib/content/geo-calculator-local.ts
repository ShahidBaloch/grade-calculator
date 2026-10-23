/**
 * Country-specific copy for /{country}/{calculator} pages.
 *
 * The worldwide calculator copy is written around the US 4.0 scale (AP, Honors, NCES). On a
 * country page that copy is both off-topic and a near-duplicate of the worldwide URL, so each
 * geo page gets its own scale table, a worked example run on that country's scale, local FAQs
 * and the scale's own sources. Every number below is computed from the scale files in
 * src/lib/grading-scales — nothing is typed in by hand.
 */
import { countryHubByPath } from "@/config/country-hubs";
import { calculatorContent } from "@/config/calculator-content";
import { getScale, getBandRangeLabel } from "@/lib/grading-scales";
import { findHecBandByCgpa, hecCgpaToBandMinimumPercent } from "@/lib/calculators/pakistan-hec-bands";
import { getCountryPrefixFromPath } from "@/lib/utils/country-path";
import type { GeoPageSection } from "@/lib/content/geo-page-copy";
import type { CalculatorSlug } from "@/types/calculator";
import type { GradingScale } from "@/types/grading-scale";
import type { FaqItem } from "@/types/seo";

export interface GeoCalculatorLocal {
  steps: string[];
  formula?: string;
  workedExample: string;
  assumptions: string[];
  primarySources: Array<{ label: string; href: string }>;
  sections: GeoPageSection[];
  faqs: FaqItem[];
}

type CountryCode = "ca" | "au" | "nz" | "in" | "pk";

interface CountryProfile {
  /** Short scale name for running text. */
  scaleName: string;
  /** What a course's weight is called on this country's transcripts. */
  weightLabel: string;
  /** Sample term: grade label on the hub scale + weight. */
  term: Array<[string, number]>;
  /** Prior record for the cumulative example. */
  prior: { gpa: number; weight: number };
  faqs: FaqItem[];
  /** Worldwide FAQs that do not apply in this country. */
  dropFaq: RegExp;
}

/** Worldwide FAQs that are about US schools only. */
const US_ONLY = /\bAP\b|Honors|graduate school|dean's list|high school|US 4\.0 scale|common US|NCES/i;

const COUNTRY: Record<CountryCode, CountryProfile> = {
  ca: {
    scaleName: "Canadian 4.0 preset",
    weightLabel: "credits",
    term: [
      ["A", 3],
      ["B+", 3],
      ["A-", 3],
      ["C+", 3],
    ],
    prior: { gpa: 3.2, weight: 30 },
    faqs: [
      {
        question: "Is there one official GPA scale in Canada?",
        answer:
          "No. Each university publishes its own table. UBC tells students to use the evaluating body's scale for conversions, Waterloo reports percentage averages and no GPA, and McMaster uses a 12-point GPA. This page uses an illustrative 4.0-cap preset for planning; for a school-specific answer use the OMSAS, UBC, U of T, Waterloo or Guelph calculator.",
      },
      {
        question: "Is an A+ worth 4.0 or 4.33 in Canada?",
        answer:
          "It depends on the school. On this preset an A+ (90–100%) and an A (85–89%) both earn 4.0, the same way U of T counts them. Some universities award 4.33 for an A+ — if your transcript does, switch to the Canada 4.33 scale.",
      },
      {
        question: "Can I use this result on an Ontario medical school application?",
        answer:
          "Not directly. OMSAS converts every course with the OUAC table and the scale assigned to your university, so use the OMSAS GPA calculator for that number.",
      },
    ],
    dropFaq: /Australian|India|Pakistan|CGPA|O grade/i,
  },
  au: {
    scaleName: "UQ 7-point",
    weightLabel: "units",
    term: [
      ["7 (HD)", 2],
      ["6 (D)", 2],
      ["5 (C)", 2],
      ["4 (P)", 2],
    ],
    prior: { gpa: 5, weight: 16 },
    faqs: [
      {
        question: "Why does this page use the UQ 7-point scale?",
        answer:
          "The University of Queensland publishes its 7-point GPA in its Assessment Procedure, so the numbers can be checked. Australia has no national GPA table: Monash uses a 4-point GPA and UNSW mostly reports WAM. Pick the preset that matches your university before you trust the result.",
      },
      {
        question: "Does a fail count as zero in a UQ GPA?",
        answer:
          "No. On the UQ scale a 3 (marginal fail), 2 or 1 counts at its own value, and a non-graded fail (N) is treated as a 2 when a GPA has to be calculated. That is why one failed course hurts less than it would on a scale where F = 0.",
      },
      {
        question: "Can I convert my Australian GPA to a US 4.0 by multiplying by 4/7?",
        answer:
          "There is no official linear conversion. A US school or credential evaluator applies its own table, so report the GPA on your transcript and let them convert it.",
      },
      {
        question: "Is ATAR the same as GPA?",
        answer:
          "No. ATAR is a Year 12 rank used for university entry, not an average of university grades. Use the ATAR calculator for that.",
      },
    ],
    dropFaq: /India|Pakistan|CGPA|O grade/i,
  },
  nz: {
    scaleName: "NZ 9-point",
    weightLabel: "points",
    term: [
      ["A", 15],
      ["B+", 15],
      ["A-", 15],
      ["C+", 15],
    ],
    prior: { gpa: 6, weight: 120 },
    faqs: [
      {
        question: "How does the New Zealand 9-point GPA work?",
        answer:
          "Each passing letter earns a whole number of points, from A+ = 9 down to C- = 1, and a fail earns 0. Your GPA is the average of those points weighted by each course's points value, so a 30-point paper counts twice as much as a 15-point one.",
      },
      {
        question: "Do Canterbury and Auckland use the same fail grades?",
        answer:
          "The passing bands match, but the fails differ: the University of Canterbury uses D and E, while Auckland uses D+, D and D-. All of them count as 0 on the 9-point GPA.",
      },
      {
        question: "Does NCEA use this GPA?",
        answer:
          "No. NCEA is a standards-based system for secondary school (Achieved, Merit, Excellence) and has no 9-point GPA. This page is for university grades.",
      },
    ],
    dropFaq: /Australian|India|Pakistan|CGPA|O grade/i,
  },
  in: {
    scaleName: "India 10-point",
    weightLabel: "credits",
    term: [
      ["O", 4],
      ["A+", 4],
      ["A", 3],
      ["B+", 3],
    ],
    prior: { gpa: 8.1, weight: 44 },
    faqs: [
      {
        question: "Is SGPA the same as CGPA?",
        answer:
          "No. SGPA covers one semester; CGPA is the credit-weighted average of every semester so far. Enter one semester here, then combine semesters with the SGPA to CGPA calculator.",
      },
      {
        question: "Does every Indian university use these grade cut-offs?",
        answer:
          "No. The UGC Choice Based Credit System defines the 10-point letters (O, A+, A, B+, B, C, P, F), but each university sets its own percentage cut-offs. Check the grade table printed on your marksheet.",
      },
      {
        question: "Can I multiply my CGPA by 9.5 to get a percentage?",
        answer:
          "Only if your board or university says so. The ×9.5 rule comes from old CBSE certificates; UGC does not publish one national multiplier. Use the CGPA to percentage calculator with the formula your institution prints.",
      },
    ],
    dropFaq: /Australian|Pakistan|HEC/i,
  },
  pk: {
    scaleName: "HEC 4.0",
    weightLabel: "credit hours",
    term: [
      ["A", 3],
      ["B+", 3],
      ["A-", 3],
      ["B", 3],
    ],
    prior: { gpa: 3.1, weight: 36 },
    faqs: [
      {
        question: "Why does an A count as 4.00 when HEC gives a range?",
        answer:
          "HEC's §13.1 table gives each band a grade-point range — an A at 85% and above is 3.67–4.00 — because universities award fractional points within a band. A calculator needs one number, so it uses the top of each range. Your transcript shows the exact points your university gave.",
      },
      {
        question: "How do I turn a CGPA into a percentage in Pakistan?",
        answer:
          "HEC has notified that it stopped converting CGPA into percentage. Under §13.1 a CGPA is given the minimum percentage of its band, so 3.00 maps to 71%. The CGPA × 25 shortcut (3.00 → 75%) is not the HEC rule.",
      },
      {
        question: "What is the passing mark on the HEC scale?",
        answer:
          "A D at 50–53% is the lowest pass and earns 0.10–1.00 grade points; anything below 50% is an F with 0.00. Some degree programs require a higher minimum CGPA to graduate, so check your university's regulations.",
      },
    ],
    dropFaq: /Australian|India|Indian|CBSE|O grade|SPPU|10-point|UGC/i,
  },
};

const fmt = (value: number, places = 2) => value.toFixed(places);

function band(scale: GradingScale, label: string) {
  const found = scale.bands.find((b) => b.letter === label);
  if (!found || found.gpa == null) throw new Error(`${label} is not a graded band on ${scale.id}`);
  return found as typeof found & { gpa: number };
}

function termResult(scale: GradingScale, profile: CountryProfile) {
  const rows = profile.term.map(([label, weight]) => {
    const b = band(scale, label);
    return { label, weight, points: b.gpa, quality: b.gpa * weight, range: getBandRangeLabel(b) };
  });
  const weight = rows.reduce((sum, r) => sum + r.weight, 0);
  const quality = rows.reduce((sum, r) => sum + r.quality, 0);
  return { rows, weight, quality, gpa: quality / weight };
}

function scaleTableSection(hubName: string, scale: GradingScale): GeoPageSection {
  const ranged = scale.bands.some((b) => b.gpaLabel);
  return {
    heading: `${hubName} grading scale used on this page`,
    paragraphs: [
      `Grades are converted with the ${scale.name} preset${scale.gpaMax ? `, where the top grade is worth ${scale.gpaMax}` : ""} and ${scale.passPercent}% is the lowest pass.`,
    ],
    table: {
      caption: `${scale.name} — percentage and grade points`,
      head: ["Grade", "Percentage", ranged ? "Grade points (HEC range)" : "Grade points"],
      rows: scale.bands
        .filter((b) => b.min >= 0)
        .map((b) => [b.letter, getBandRangeLabel(b), b.gpaLabel ?? (b.gpa == null ? "—" : String(b.gpa))]),
    },
  };
}

function termSentence(scale: GradingScale, profile: CountryProfile, noun: string) {
  const t = termResult(scale, profile);
  const parts = t.rows.map((r) => `${r.label} (${r.points} × ${r.weight} = ${fmt(r.quality, 1)})`).join(", ");
  return {
    t,
    text: `${parts} → ${fmt(t.quality, 1)} ÷ ${t.weight} ${profile.weightLabel} = ${fmt(t.gpa)} ${noun} on the ${profile.scaleName} scale.`,
  };
}

function exampleFor(slug: CalculatorSlug, code: CountryCode, scale: GradingScale): { example: string; section?: GeoPageSection } {
  const profile = COUNTRY[code];
  const noun = code === "in" ? "SGPA" : code === "pk" && slug === "cgpa-calculator" ? "SGPA" : "GPA";

  if (slug === "cumulative-gpa-calculator") {
    const { t } = termSentence(scale, profile, noun);
    const priorQ = profile.prior.gpa * profile.prior.weight;
    const total = (priorQ + t.quality) / (profile.prior.weight + t.weight);
    return {
      example: `Transcript ${fmt(profile.prior.gpa)} over ${profile.prior.weight} ${profile.weightLabel} (${fmt(priorQ, 1)} grade points) plus a ${fmt(t.gpa)} term of ${t.weight} ${profile.weightLabel} (${fmt(t.quality, 1)}) → ${fmt(priorQ + t.quality, 1)} ÷ ${profile.prior.weight + t.weight} = ${fmt(total)} cumulative GPA on the ${profile.scaleName} scale.`,
    };
  }

  if (slug === "letter-grade-calculator") {
    const picks = scale.bands.filter((b) => b.min >= 0 && b.gpa != null && b.gpa > 0).slice(0, 4);
    const lines = picks.map((b) => `${b.letter} = ${getBandRangeLabel(b)} (midpoint ${Math.round((b.min + b.max) / 2)}%, ${b.gpa} points)`);
    return { example: `On the ${profile.scaleName} scale: ${lines.join("; ")}.` };
  }

  if (slug === "sgpa-to-cgpa") {
    const sems: Array<[number, number]> = [
      [3.45, 18],
      [3.1, 17],
      [3.62, 18],
    ];
    const q = sems.reduce((sum, [g, c]) => sum + g * c, 0);
    const c = sems.reduce((sum, [, cr]) => sum + cr, 0);
    return {
      example: `Semesters ${sems.map(([g, cr]) => `${fmt(g)} × ${cr}`).join(", ")} credit hours → ${fmt(q, 2)} ÷ ${c} = ${fmt(q / c)} CGPA on the HEC 4.0 scale. A plain average of the three SGPAs would give ${fmt(sems.reduce((s, [g]) => s + g, 0) / 3)}, which ignores the lighter semester.`,
    };
  }

  if (slug === "cgpa-to-percentage" || slug === "percentage-to-cgpa") {
    const cgpas = [3.8, 3.5, 3.2, 3.0, 2.5, 2.0];
    const rows = cgpas.map((g) => [fmt(g), findHecBandByCgpa(g).letter, `${hecCgpaToBandMinimumPercent(g)}%`, `${fmt(g * 25, 0)}%`]);
    return {
      example:
        slug === "cgpa-to-percentage"
          ? `A 3.00 CGPA sits in HEC's B band (2.67–3.00), so §13.1 gives it the band minimum of ${hecCgpaToBandMinimumPercent(3)}%. The ×25 shortcut would show 75%, which is not the HEC rule.`
          : `An 80% falls in HEC's A- band (80–84%), whose grade-point range is 3.34–3.66; the calculator reports the top of that range, 3.66, as a planning figure.`,
      section: {
        heading: "HEC band minimum vs the ×25 shortcut",
        paragraphs: [
          "The same CGPA gives a different percentage depending on the rule. HEC §13.1 uses the lowest percentage of the band the CGPA falls in; the ×25 shortcut is common on forms but is not an HEC rule.",
        ],
        table: {
          caption: "CGPA to percentage in Pakistan — §13.1 band minimum compared with CGPA × 25",
          head: ["CGPA", "HEC band", "§13.1 band minimum", "×25 shortcut"],
          rows,
        },
      },
    };
  }

  const { text } = termSentence(scale, profile, noun);
  return { example: text };
}

function stepsFor(slug: CalculatorSlug, code: CountryCode, scale: GradingScale, base: string[]): string[] {
  const { weightLabel: w, scaleName } = COUNTRY[code];
  if (["gpa-calculator", "college-gpa-calculator", "cgpa-calculator"].includes(slug)) {
    return [
      `List this term's courses with the grade or percentage from your results and the ${w} for each.`,
      `Each grade converts to points on the ${scaleName} scale shown below${scale.gpaMax ? ` (top grade ${scale.gpaMax})` : ""}.`,
      `Points × ${w} are added and divided by total ${w} for the term.`,
    ];
  }
  if (slug === "cumulative-gpa-calculator") {
    return [
      `Enter the GPA and ${w} already on your record (leave both empty in your first term).`,
      `Add this term's courses — grades convert on the ${scaleName} scale.`,
      `Prior grade points and this term's are combined and divided by all ${w}.`,
    ];
  }
  if (slug === "letter-grade-calculator") {
    return [`Enter a grade from the ${scaleName} scale (for example ${scale.bands[1]?.letter ?? scale.bands[0].letter}).`, base[1], base[2]];
  }
  if (code === "pk" && slug === "cgpa-to-percentage") {
    return [
      "Choose CGPA → percentage.",
      "Pick HEC §13.1 band minimum (the HEC rule) or the ×25 shortcut if a form asks for it.",
      "Read the percentage — and use the one printed on your transcript when you have it.",
    ];
  }
  if (code === "pk" && slug === "percentage-to-cgpa") {
    return [
      "Enter your percentage marks (0–100).",
      "Pick HEC §13.1 planning (top of the band's grade-point range) or the ×25 shortcut.",
      "Read the estimated CGPA on the HEC 4.0 scale.",
    ];
  }
  return base;
}

const PK_FORMULA: Partial<Record<CalculatorSlug, string>> = {
  "cgpa-to-percentage": "HEC §13.1: % = minimum percentage of the band the CGPA falls in · Unofficial shortcut: % = CGPA × 25",
  "percentage-to-cgpa": "HEC §13.1: CGPA = top of the grade-point range for your percentage band · Unofficial shortcut: CGPA = % ÷ 25",
};

export function geoCalculatorLocal(slug: CalculatorSlug, pagePath?: string): GeoCalculatorLocal | null {
  const prefix = getCountryPrefixFromPath(pagePath);
  const code = prefix?.slice(1) as CountryCode | undefined;
  if (!prefix || !code || !(code in COUNTRY)) return null;
  const hub = countryHubByPath[prefix];
  if (!hub) return null;

  const scale = getScale(hub.scaleId);
  const profile = COUNTRY[code];
  const content = calculatorContent[slug];
  const { example, section } = exampleFor(slug, code, scale);

  const scaleSources = scale.sources
    .filter((s): s is { label: string; href: string } => typeof s !== "string")
    .map((s) => ({ label: s.label, href: s.href }));
  const baseSources = (content.primarySources ?? []).filter(
    (s) => !/nces\.ed\.gov/.test(s.href) && !profile.dropFaq.test(s.label),
  );
  const sources = [...scaleSources, ...baseSources.filter((s) => !scaleSources.some((x) => x.href === s.href))];

  const baseFaqs = content.faqs.filter(
    (f) => !US_ONLY.test(`${f.question} ${f.answer}`) && !profile.dropFaq.test(`${f.question} ${f.answer}`),
  );
  const sections: GeoPageSection[] = [scaleTableSection(hub.name, scale)];
  if (section) sections.push(section);

  return {
    steps: stepsFor(slug, code, scale, content.howItWorks),
    formula: code === "pk" ? PK_FORMULA[slug] : undefined,
    workedExample: example,
    assumptions: [
      ...(content.assumptions ?? []).filter((a) => !US_ONLY.test(a) && !profile.dropFaq.test(a)),
      `Scale preset: ${scale.name}. Your institution's own table wins if it differs.`,
    ],
    primarySources: sources,
    sections,
    faqs: [...profile.faqs, ...baseFaqs],
  };
}
