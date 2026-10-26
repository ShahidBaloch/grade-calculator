import { describe, expect, it } from "vitest";
import {
  decodeCalculatorState,
  encodeCalculatorState,
  readStateFromSearchParams,
} from "@/lib/utils/calculator-state";

describe("calculator-state", () => {
  it("round-trips state through base64", () => {
    const state = { totalQuestions: 20, wrongAnswers: 3 };
    const encoded = encodeCalculatorState(state);
    expect(decodeCalculatorState(encoded)).toEqual(state);
  });

  it("round-trips non-ASCII names (raw btoa would throw)", () => {
    const state = { items: [{ name: "Español — Prüfung ✓", score: 92 }] };
    expect(decodeCalculatorState(encodeCalculatorState(state))).toEqual(state);
  });

  it("still decodes links made by the old ASCII btoa encoder", () => {
    const state = { totalQuestions: 20, wrongAnswers: 3 };
    expect(decodeCalculatorState(btoa(JSON.stringify(state)))).toEqual(state);
  });

  it("reads state from search params", () => {
    const encoded = encodeCalculatorState({ percent: 85 });
    const result = readStateFromSearchParams(`?s=${encoded}`);
    expect(result).toEqual({ percent: 85 });
  });

  it("returns null for invalid encoded state", () => {
    expect(decodeCalculatorState("not-valid-base64!!!")).toBeNull();
  });
});
