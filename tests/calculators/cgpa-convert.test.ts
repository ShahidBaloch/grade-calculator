import { describe, expect, it } from "vitest";
import { convertCgpa } from "@/lib/calculators/cgpa-convert";

describe("convertCgpa", () => {
  it("converts India CBSE CGPA to percentage with ×9.5", () => {
    const result = convertCgpa({
      mode: "cgpa-to-percent",
      formulaId: "india-cbse-9.5",
      value: 8.2,
    });
    expect(result.status).toBe("valid");
    expect(result.data?.output).toBeCloseTo(77.9, 5);
  });

  it("converts percentage to India CGPA", () => {
    const result = convertCgpa({
      mode: "percent-to-cgpa",
      formulaId: "india-cbse-9.5",
      value: 76,
    });
    expect(result.status).toBe("valid");
    expect(result.data?.output).toBeCloseTo(8, 5);
  });

  it("maps Pakistan HEC §13.1 CGPA to band minimum percentage", () => {
    const result = convertCgpa({
      mode: "cgpa-to-percent",
      formulaId: "pakistan-hec-13.1",
      value: 3,
    });
    expect(result.status).toBe("valid");
    expect(result.data?.output).toBe(71);
  });

  it("converts Pakistan HEC CGPA with ×25 shortcut", () => {
    const result = convertCgpa({
      mode: "cgpa-to-percent",
      formulaId: "pakistan-hec-25",
      value: 3.4,
    });
    expect(result.status).toBe("valid");
    expect(result.data?.output).toBeCloseTo(85, 5);
  });

  it("rejects CGPA above formula max", () => {
    const result = convertCgpa({
      mode: "cgpa-to-percent",
      formulaId: "pakistan-hec-25",
      value: 4.5,
    });
    expect(result.status).toBe("error");
  });
});
