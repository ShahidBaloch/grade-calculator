import { describe, expect, it } from "vitest";
import fixture from "../fixtures/ouac-conversion-table.json";
import { OMSAS_SCALES, OMSAS_UNIVERSITY_SCALES, type OmsasScaleNumber } from "@/data/geo-sources/omsas";
import { caUniversityProfiles, UBC_BANDS, UOFT_BANDS } from "@/data/geo-sources/ca-universities";
import { droppedUsEocCandidates, usEocStateRules } from "@/data/geo-sources/us-eoc-states";

/** Rebuild each OUAC column from the typed data, in the printed format ("90–100", "≤ 49", "A+"). */
function printedCell(scale: OmsasScaleNumber, points: number): string {
  const data = OMSAS_SCALES[scale];
  if (data.kind === "percentage") {
    const row = data.rows.find((r) => r.points === points);
    if (!row) return "";
    return row.min === 0 ? `≤ ${row.max}` : `${row.min}–${row.max}`;
  }
  return data.rows.find((r) => r.points === points)?.grade ?? "";
}

describe("geo source data", () => {
  it("OMSAS scales match the OUAC table cell for cell", () => {
    for (const row of fixture.rows) {
      const points = Number(row.ouacValue);
      row.scales.forEach((cell, index) => {
        expect(printedCell((index + 1) as OmsasScaleNumber, points), `${row.ouacValue} scale ${index + 1}`).toBe(cell);
      });
    }
  });

  it("every typed OMSAS row appears in the OUAC table", () => {
    const values = new Set(fixture.rows.map((row) => Number(row.ouacValue)));
    for (const scale of Object.values(OMSAS_SCALES)) {
      for (const row of scale.rows) expect(values.has(row.points)).toBe(true);
    }
  });

  it("university scale list matches OUAC", () => {
    expect(OMSAS_UNIVERSITY_SCALES).toEqual(fixture.universities);
  });

  it("percentage tables cover 0–100 with no gaps or overlaps", () => {
    const tables = [
      ...Object.values(OMSAS_SCALES)
        .filter((scale) => scale.kind === "percentage")
        .map((scale) => scale.rows),
      UBC_BANDS,
      UOFT_BANDS,
    ];
    for (const rows of tables) {
      const sorted = [...rows].sort((a, b) => a.min - b.min);
      expect(sorted[0].min).toBe(0);
      expect(sorted[sorted.length - 1].max).toBe(100);
      for (let i = 1; i < sorted.length; i++) expect(sorted[i].min).toBe(sorted[i - 1].max + 1);
    }
  });

  it("every published page cites an https source with a check date", () => {
    for (const profile of caUniversityProfiles) {
      expect(profile.sources.length).toBeGreaterThan(0);
      for (const source of profile.sources) {
        expect(source.href).toMatch(/^https:\/\//);
        expect(source.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
    for (const rule of usEocStateRules) {
      expect(rule.source.href).toMatch(/^https:\/\//);
      expect(rule.quote.length).toBeGreaterThan(40);
    }
  });

  it("each state's default weight is the figure its rule names", () => {
    for (const rule of usEocStateRules) {
      const { weight } = rule;
      if (weight.kind === "range") {
        expect(rule.defaultWeight).toBeGreaterThanOrEqual(weight.min);
        expect(rule.defaultWeight).toBeLessThanOrEqual(weight.max);
      } else {
        expect(rule.defaultWeight).toBe(weight.percent);
      }
      expect(rule.quote).toMatch(new RegExp(String(rule.defaultWeight)));
    }
  });

  it("dropped candidates are not published", () => {
    const published = new Set(usEocStateRules.map((rule) => rule.state));
    for (const dropped of droppedUsEocCandidates) {
      expect(published.has(dropped.name)).toBe(false);
      expect(dropped.reason.length).toBeGreaterThan(30);
    }
  });
});
