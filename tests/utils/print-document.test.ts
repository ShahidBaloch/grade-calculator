import { describe, expect, it } from "vitest";
import {
  buildPrintDocumentTitle,
  formatPrintDate,
  sanitizePrintDocumentTitle,
} from "@/lib/utils/print-document";

describe("sanitizePrintDocumentTitle", () => {
  it("replaces pipes and em dashes for filesystem-friendly names", () => {
    expect(sanitizePrintDocumentTitle("GPA Calculator — Semester & Term GPA | GradeCalculator")).toBe(
      "GPA Calculator - Semester & Term GPA - GradeCalculator",
    );
  });

  it("strips invalid filename characters", () => {
    expect(sanitizePrintDocumentTitle('Test: "bad" / name')).toBe("Test bad name");
  });
});

describe("buildPrintDocumentTitle", () => {
  it("uses heading, site name, and local date", () => {
    const title = buildPrintDocumentTitle(
      "GPA Calculator — Semester & Term GPA",
      new Date(2026, 8, 27),
    );
    expect(title).toBe("GPA Calculator - Semester & Term GPA - GradeCalculator - 2026-09-27");
  });
});

describe("formatPrintDate", () => {
  it("pads month and day", () => {
    expect(formatPrintDate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});
