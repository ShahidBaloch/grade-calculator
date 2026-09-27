import { afterEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "@/lib/contact/send-contact-email";

describe("sendContactEmail", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns not_configured without RESEND_API_KEY", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const result = await sendContactEmail({
      name: "Test",
      email: "test@example.com",
      message: "Hello from vitest.",
    });
    expect(result).toEqual({ ok: false, reason: "not_configured" });
  });

  it("returns invalid_from when API key set but FROM missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    const result = await sendContactEmail({
      name: "Test",
      email: "test@example.com",
      message: "Hello from vitest.",
    });
    expect(result).toEqual({ ok: false, reason: "invalid_from" });
  });
});
