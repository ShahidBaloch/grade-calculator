import type { GradeChartBand, GradeChartPointsRow } from "@/lib/calculators/grade-chart";
import { percentToLetter } from "@/lib/grading-scales";
import type { ScaleId } from "@/types/grading-scale";

/** 80 → "80%", 93.333… → "93.33%", 82.5 → "82.5%". */
function pct(value: number) {
  return `${parseFloat(value.toFixed(2))}%`;
}

function list(items: string[]) {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

/** "an 18-question", "an 8-question", "a 20-question". */
function article(total: number) {
  return total === 11 || total === 18 || String(total).startsWith("8") ? "an" : "a";
}

/** Whole-score span covering every band of one letter family (B+, B, B-). */
function letterSpan(bands: GradeChartBand[], letter: string, total: number) {
  const family = bands.filter((band) => band.letter[0] === letter && band.minPoints != null && band.maxPoints != null);
  if (!family.length) return null;
  const min = Math.min(...family.map((band) => band.minPoints!));
  const max = Math.max(...family.map((band) => band.maxPoints!));
  const correct = min === max ? `only ${min} correct` : `${min}–${max} correct`;
  const wrongMin = total - max;
  const wrongMax = total - min;
  const wrong = wrongMin === wrongMax ? `${wrongMin} wrong` : `${wrongMin}–${wrongMax} wrong`;
  return { min, max, text: `${correct} (${wrong})` };
}

/**
 * One worked-example paragraph per test length, built from the chart's own rows and bands
 * so every number matches the tables on the page.
 */
export function questionChartScenario(
  total: number,
  rows: GradeChartPointsRow[],
  bands: GradeChartBand[],
  scaleId: ScaleId,
): string {
  const perQuestion = 100 / total;
  const missesForA = rows.filter((row) => row.letterGrade[0] === "A").length - 1;
  const skipped = bands.filter((band) => band.minPoints == null && band.letter !== "F").map((band) => band.letter);
  const bSpan = letterSpan(bands, "B", total);
  const cSpan = letterSpan(bands, "C", total);

  // Highest score where a half point of partial credit changes the letter.
  const halfRow = rows.find(
    (row) => row.points < total && percentToLetter(((row.points + 0.5) / total) * 100, scaleId).letter !== row.letterGrade,
  );
  const halfPercent = halfRow ? ((halfRow.points + 0.5) / total) * 100 : null;
  const halfLetter = halfPercent == null ? null : percentToLetter(halfPercent, scaleId).letter;
  const halfSentence =
    halfRow && halfPercent != null
      ? ` Partial credit matters most right at a cutoff: ${halfRow.points} out of ${total} is ${pct(halfRow.percent)} (${halfRow.letterGrade}), but ${halfRow.points}.5 is ${pct(halfPercent)} (${halfLetter}).`
      : " A half point of partial credit never changes the letter here, because every cutoff falls on a whole question.";

  const bText = bSpan ? `a B of any kind takes ${bSpan.text}` : "no whole score lands in the B range";
  const cText = cSpan ? `a C takes ${cSpan.text}` : "no whole score lands in the C range";

  if (skipped.length) {
    return (
      `On ${article(total)} ${total}-question quiz, every miss costs ${pct(perQuestion)}, which is wider than most plus/minus steps, ` +
      `so some letters can't be reached with whole answers: no score out of ${total} lands on ${list(skipped)}. ` +
      `${missesForA === 0 ? "An A of any kind means a perfect paper" : `You can miss ${missesForA} and still keep an A`}, ` +
      `${bText}, and ${cText}.${halfSentence}`
    );
  }

  const bWidth = bSpan ? bSpan.max - bSpan.min + 1 : 0;
  return (
    `With ${total} questions, one miss only moves you ${pct(perQuestion)}, so there is some room: ` +
    `you can miss ${missesForA} and still have an A, ${bText}, and ${cText}.` +
    (bWidth >= 5
      ? ` The whole B range is ${bWidth} questions wide, so from the middle of it two careless misses still leave you with a B.`
      : bWidth
        ? ` The whole B range is only ${bWidth} questions wide, so ${bWidth} extra misses drop you a full letter from anywhere inside it.`
        : "") +
    halfSentence
  );
}
