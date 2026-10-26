import { describe, expect, it, beforeEach, vi } from "vitest";
import { getPreferredCountryHub, setPreferredCountryHub } from "@/lib/utils/preferred-country-hub";

describe("preferred country hub session", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal("sessionStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => store.clear(),
    });
  });

  it("stores and reads a non-US hub", () => {
    setPreferredCountryHub("/ca");
    expect(getPreferredCountryHub()).toBe("/ca");
  });

  it("does not store the US hub", () => {
    setPreferredCountryHub("/us");
    expect(getPreferredCountryHub()).toBeNull();
  });

  it("clears when set to null", () => {
    setPreferredCountryHub("/nz");
    setPreferredCountryHub(null);
    expect(getPreferredCountryHub()).toBeNull();
  });
});
