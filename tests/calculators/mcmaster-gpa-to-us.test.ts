import { describe, expect, it } from "vitest";
import { convertMcmasterTwelveToUsFour } from "@/lib/calculators/mcmaster-gpa-to-us";

describe("convertMcmasterTwelveToUsFour", () => {
  it("maps McMaster 11 to 3.9, not 11/3", () => {
    const result = convertMcmasterTwelveToUsFour(11);
    expect(result.status).toBe("valid");
    expect(result.data?.usGpa4).toBe(3.9);
    expect(result.warnings?.[0]).toMatch(/Dividing by 3/);
  });

  it("maps McMaster 12 to 4.0", () => {
    const result = convertMcmasterTwelveToUsFour(12);
    expect(result.data?.usGpa4).toBe(4);
  });

  it("maps McMaster 10 to 3.7", () => {
    expect(convertMcmasterTwelveToUsFour(10).data?.usGpa4).toBe(3.7);
  });

  it("rejects out-of-range values", () => {
    expect(convertMcmasterTwelveToUsFour(12.5).status).toBe("error");
  });
});
