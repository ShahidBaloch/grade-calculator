import { describe, expect, it } from "vitest";
import {
  lookupUkDegreeUsGpaReference,
  ukDegreeUsGpaReferenceFromPercent,
} from "@/lib/calculators/uk-degree-us-gpa-reference";

describe("uk-degree-us-gpa-reference", () => {
  it("returns illustrative 3.7 for 2:1 without treating it as a reporting rule", () => {
    const result = lookupUkDegreeUsGpaReference("Upper Second (2:1)");
    expect(result.status).toBe("valid");
    expect(result.data?.illustrativeUsGpa).toBe(3.7);
    expect(result.data?.message).toMatch(/do not enter/i);
  });

  it("maps 65% to 2:1 illustrative reference", () => {
    const result = ukDegreeUsGpaReferenceFromPercent(65);
    expect(result.data?.classification).toBe("Upper Second (2:1)");
  });
});
