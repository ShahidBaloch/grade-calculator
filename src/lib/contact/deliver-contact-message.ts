import type { ContactFormValues } from "@/lib/contact/schema";
import { sendContactEmail } from "@/lib/contact/send-contact-email";
import { isSmtpConfigured, sendContactViaSmtp } from "@/lib/contact/send-contact-smtp";

export type DeliverContactResult =
  | { ok: true }
  | { ok: false; error: string; httpStatus: number };

export async function deliverContactMessage(values: ContactFormValues): Promise<DeliverContactResult> {
  if (isSmtpConfigured()) {
    const smtp = await sendContactViaSmtp(values);
    if (smtp.ok) return { ok: true };
    if (smtp.reason === "provider_error") {
      return { ok: false, error: smtp.error, httpStatus: 500 };
    }
  }

  const resend = await sendContactEmail(values);
  if (resend.ok) return { ok: true };

  if (resend.reason === "not_configured" || resend.reason === "invalid_from") {
    return {
      ok: false,
      error: "Email is not configured on the server. Please email us directly.",
      httpStatus: 503,
    };
  }

  return { ok: false, error: "Something went wrong sending your message.", httpStatus: 500 };
}
