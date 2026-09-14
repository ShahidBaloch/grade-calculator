export type CgpaFormulaId =
  | "india-cbse-9.5"
  | "india-x10"
  | "india-sppu"
  | "pakistan-hec-25";

export interface CgpaFormula {
  id: CgpaFormulaId;
  label: string;
  region: "IN" | "PK";
  scaleMax: number;
  description: string;
  toPercent: (cgpa: number) => number;
  toCgpa: (percent: number) => number;
}

export const cgpaFormulas: CgpaFormula[] = [
  {
    id: "india-cbse-9.5",
    label: "India CBSE / UGC (×9.5)",
    region: "IN",
    scaleMax: 10,
    description: "Percentage ≈ CGPA × 9.5 — common CBSE and many UGC institutions.",
    toPercent: (cgpa) => cgpa * 9.5,
    toCgpa: (percent) => percent / 9.5,
  },
  {
    id: "india-x10",
    label: "India (×10)",
    region: "IN",
    scaleMax: 10,
    description: "Percentage ≈ CGPA × 10 — used by Anna University, VIT, and some IITs/NITs.",
    toPercent: (cgpa) => cgpa * 10,
    toCgpa: (percent) => percent / 10,
  },
  {
    id: "india-sppu",
    label: "India SPPU / Mumbai ((CGPA − 0.75) × 10)",
    region: "IN",
    scaleMax: 10,
    description: "Percentage ≈ (CGPA − 0.75) × 10 — SPPU Pune and some Mumbai University policies.",
    toPercent: (cgpa) => (cgpa - 0.75) * 10,
    toCgpa: (percent) => percent / 10 + 0.75,
  },
  {
    id: "pakistan-hec-25",
    label: "Pakistan HEC (×25)",
    region: "PK",
    scaleMax: 4,
    description: "Percentage ≈ CGPA × 25 on the HEC 4.0 scale (same as CGPA ÷ 4 × 100).",
    toPercent: (cgpa) => cgpa * 25,
    toCgpa: (percent) => percent / 25,
  },
];

export const cgpaFormulaById = Object.fromEntries(
  cgpaFormulas.map((f) => [f.id, f]),
) as Record<CgpaFormulaId, CgpaFormula>;

export type CgpaConvertMode = "cgpa-to-percent" | "percent-to-cgpa";

export interface CgpaConvertInput {
  mode: CgpaConvertMode;
  formulaId: CgpaFormulaId;
  value: number;
}

export interface CgpaConvertResult {
  formula: CgpaFormula;
  input: number;
  output: number;
  outputLabel: string;
  inputLabel: string;
  message: string;
}

export function convertCgpa(input: CgpaConvertInput): {
  status: "valid" | "error";
  data?: CgpaConvertResult;
  errors?: string[];
} {
  const formula = cgpaFormulaById[input.formulaId];
  if (!formula) {
    return { status: "error", errors: ["Unknown conversion formula"] };
  }

  const value = input.value;
  if (!Number.isFinite(value)) {
    return { status: "error", errors: ["Enter a valid number"] };
  }

  if (input.mode === "cgpa-to-percent") {
    if (value < 0 || value > formula.scaleMax) {
      return {
        status: "error",
        errors: [`CGPA must be between 0 and ${formula.scaleMax} for this formula`],
      };
    }
    const percent = Math.min(100, Math.max(0, formula.toPercent(value)));
    return {
      status: "valid",
      data: {
        formula,
        input: value,
        output: percent,
        inputLabel: "CGPA",
        outputLabel: "Percentage",
        message: `${value.toFixed(2)} CGPA → ${percent.toFixed(2)}% using ${formula.label}`,
      },
    };
  }

  if (value < 0 || value > 100) {
    return { status: "error", errors: ["Percentage must be between 0 and 100"] };
  }
  const cgpa = Math.min(formula.scaleMax, Math.max(0, formula.toCgpa(value)));
  return {
    status: "valid",
    data: {
      formula,
      input: value,
      output: cgpa,
      inputLabel: "Percentage",
      outputLabel: "CGPA",
      message: `${value.toFixed(2)}% → ${cgpa.toFixed(2)} CGPA using ${formula.label}`,
    },
  };
}
