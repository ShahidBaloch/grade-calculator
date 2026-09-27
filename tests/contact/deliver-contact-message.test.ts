import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverContactMessage } from "@/lib/contact/deliver-contact-message";

describe("deliverContactMessage", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 503 when no mail provider is configured", async () => {
    vi.stubEnv("SMTP_HOST", "");
    vi.stubEnv("RESEND_API_KEY", "");
    const result = await deliverContactMessage({
      name: "Test",
      email: "test@example.com",
      message: "Hello from vitest.",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(503);
    }
  });
});
