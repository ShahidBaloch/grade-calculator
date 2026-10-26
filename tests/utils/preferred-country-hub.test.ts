import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  enablePreferredCountryHub,
  getPreferredCountryHub,
  setPreferredCountryHub,
} from "@/lib/utils/preferred-country-hub";
import { isMenuCountrySelected } from "@/lib/utils/country-nav";

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
    enablePreferredCountryHub();
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

describe("header Countries menu tick", () => {
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
    });
    enablePreferredCountryHub();
  });

  it("ticks the session hub on worldwide pages, matching the trigger label", () => {
    setPreferredCountryHub("/pk");
    expect(isMenuCountrySelected("/pk", "/calculators")).toBe(true);
    expect(isMenuCountrySelected("/us", "/calculators")).toBe(false);
    // A country URL still wins over the session.
    expect(isMenuCountrySelected("/uk", "/uk/gcse-grade-calculator")).toBe(true);
    expect(isMenuCountrySelected("/pk", "/uk/gcse-grade-calculator")).toBe(false);
  });

  it("falls back to US without a session hub", () => {
    expect(isMenuCountrySelected("/us", "/calculators")).toBe(true);
  });
});

describe("preferred hub before hydration", () => {
  it("reads null until enabled, so server and client HTML match", async () => {
    vi.resetModules();
    const store = new Map([["gc-preferred-hub", "/pk"]]);
    vi.stubGlobal("sessionStorage", { getItem: (key: string) => store.get(key) ?? null });
    const fresh = await import("@/lib/utils/preferred-country-hub");
    expect(fresh.getPreferredCountryHub()).toBeNull();
    const listener = vi.fn();
    fresh.subscribePreferredCountryHub(listener);
    fresh.enablePreferredCountryHub();
    expect(listener).toHaveBeenCalledOnce();
    expect(fresh.getPreferredCountryHub()).toBe("/pk");
  });
});
