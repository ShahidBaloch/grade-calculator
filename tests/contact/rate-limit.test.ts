import { afterEach, describe, expect, it } from "vitest";
import { checkContactRateLimit, resetContactRateLimitForTests } from "@/lib/contact/rate-limit";

describe("checkContactRateLimit", () => {
  afterEach(() => {
    resetContactRateLimitForTests();
  });

  it("allows the first few submissions", () => {
    const key = "test-ip";
    expect(checkContactRateLimit(key).allowed).toBe(true);
    expect(checkContactRateLimit(key).allowed).toBe(true);
  });

  it("blocks after the configured maximum", () => {
    const key = "heavy-ip";
    for (let i = 0; i < 5; i++) {
      expect(checkContactRateLimit(key).allowed).toBe(true);
    }
    const blocked = checkContactRateLimit(key);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});
