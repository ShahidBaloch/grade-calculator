import { afterEach, describe, expect, it, vi } from "vitest";

describe("siteConfig.url", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults when NEXT_PUBLIC_SITE_URL is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.url).toBe("https://ezgradecalc.com");
  });

  it("adds https when the env value has no protocol", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "grade-calculator.vercel.app");
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.url).toBe("https://grade-calculator.vercel.app");
  });

  it("falls back to the default origin when public URL is invalid", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "not a valid url");
    vi.stubEnv("VERCEL_URL", "my-app.vercel.app");
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.url).toBe("https://ezgradecalc.com");
  });
});
