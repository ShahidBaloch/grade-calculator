import { siteConfig } from "@/config/site";
import type { ContactFormValues } from "@/lib/contact/schema";

export type SendContactResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" | "invalid_from" };

function resolveFromAddress(): string | null {
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!from) return null;
  return from;
}

/** Sends contact mail via Resend when RESEND_API_KEY is configured. */
export async function sendContactEmail(values: ContactFormValues): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: "not_configured" };
  }

  const from = resolveFromAddress();
  if (!from) {
    return { ok: false, reason: "invalid_from" };
  }

  const subject = `GradeCalculator contact from ${values.name}`;
  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    "",
    values.message,
    "",
    `— Sent via ${siteConfig.url}/contact`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [siteConfig.email],
        reply_to: values.email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      return { ok: false, reason: "provider_error" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "provider_error" };
  }
}
