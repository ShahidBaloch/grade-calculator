export type CgpaToGpaMethodId = "linear-0.4" | "percent-bridge";

export interface CgpaToGpaMethod {
  id: CgpaToGpaMethodId;
  label: string;
  description: string;
  convert: (cgpa10: number) => number;
}

/** Educational estimates only — admissions offices and WES may use different tables. */
export const cgpaToGpaMethods: CgpaToGpaMethod[] = [
  {
    id: "linear-0.4",
    label: "Linear (CGPA × 0.4)",
    description: "Simple 10-point → 4.0 map: US GPA ≈ CGPA × 0.4 (same as CGPA ÷ 10 × 4).",
    convert: (cgpa10) => cgpa10 * 0.4,
  },
  {
    id: "percent-bridge",
    label: "Via percentage (×9.5 then ÷25)",
    description:
      "Estimate % with CBSE ×9.5, then map to 4.0 with % ÷ 25 — a common planning shortcut, not official.",
    convert: (cgpa10) => (cgpa10 * 9.5) / 25,
  },
];

export const cgpaToGpaMethodById = Object.fromEntries(
  cgpaToGpaMethods.map((m) => [m.id, m]),
) as Record<CgpaToGpaMethodId, CgpaToGpaMethod>;

export function convertCgpa10ToGpa4(input: {
  cgpa: number;
  methodId: CgpaToGpaMethodId;
}): {
  status: "valid" | "error";
  data?: {
    cgpa10: number;
    gpa4: number;
    method: CgpaToGpaMethod;
    message: string;
  };
  errors?: string[];
} {
  const method = cgpaToGpaMethodById[input.methodId];
  if (!method) {
    return { status: "error", errors: ["Unknown conversion method"] };
  }
  if (!Number.isFinite(input.cgpa) || input.cgpa < 0 || input.cgpa > 10) {
    return { status: "error", errors: ["CGPA must be between 0 and 10"] };
  }

  const gpa4 = Math.min(4, Math.max(0, method.convert(input.cgpa)));
  return {
    status: "valid",
    data: {
      cgpa10: input.cgpa,
      gpa4,
      method,
      message: `${input.cgpa.toFixed(2)} / 10 → ${gpa4.toFixed(2)} / 4.0 using ${method.label}`,
    },
  };
}
