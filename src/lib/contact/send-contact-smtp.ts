import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import type { ContactFormValues } from "@/lib/contact/schema";
import {
  escapeHtml,
  formatMailboxFrom,
  normalizeSmtpPassword,
  resolveSmtpRecipient,
  sanitizeSubjectFragment,
} from "@/lib/contact/email-utils";

export type SendSmtpResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error"; error: string };

export function describeSmtpError(error: unknown): string {
  const text = error instanceof Error ? `${error.message}` : String(error);
  if (/535|534|username and password|invalid login|badcredentials/i.test(text)) {
    return "Gmail rejected the login. SMTP_USER must be the Gmail account that created the app password, and SMTP_PASS must be that 16-character app password.";
  }
  if (/ETIMEDOUT|ECONNREFUSED|ESOCKET|timed out|ENOTFOUND/i.test(text)) {
    return "Could not reach the mail server. SMTP_HOST must be smtp.gmail.com and SMTP_PORT must be 587.";
  }
  if (/553|550|not authorized|relay|from address|send as/i.test(text)) {
    return "Gmail refused the From address. Leave CONTACT_FROM unset until hello@gradcalc.com is verified in Gmail Send mail as.";
  }
  return "Something went wrong sending your message.";
}

export function isSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = normalizeSmtpPassword(process.env.SMTP_PASS ?? "");
  return Boolean(host && user && pass);
}

export async function sendContactViaSmtp(values: ContactFormValues): Promise<SendSmtpResult> {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = normalizeSmtpPassword(process.env.SMTP_PASS ?? "");

  if (!host || !user || !pass) {
    return { ok: false, reason: "not_configured", error: "Email is not configured on the server." };
  }

  const to = resolveSmtpRecipient({
    host,
    smtpUser: user,
    contactTo: process.env.CONTACT_TO,
    publicInbox: siteConfig.email,
  });
  // From must be the Gmail account (or a verified “Send mail as” address).
  // Default is SMTP_USER so delivery works before hello@ is verified in Gmail.
  const from = formatMailboxFrom(process.env.CONTACT_FROM?.trim() || user);
  const subjectName = sanitizeSubjectFragment(values.name);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });

  const textBody = [
    "New GradeCalculator Contact Form Submission",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    "",
    "Message:",
    values.message,
    "",
    `— Sent via ${siteConfig.url}/contact`,
  ].join("\n");

  const html = `
        <h2>New GradeCalculator Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(values.message).replace(/\n/g, "<br />")}</p>
      `;

  const attempts = [from];
  const authenticatedFrom = formatMailboxFrom(user);
  if (from !== authenticatedFrom) attempts.push(authenticatedFrom);

  let lastError: unknown;
  for (const fromAddress of attempts) {
    try {
      await transporter.sendMail({
        from: fromAddress,
        envelope: { from: user, to },
        replyTo: values.email,
        to,
        subject: `New GradeCalculator message from ${subjectName}`,
        text: textBody,
        html,
      });
      return { ok: true };
    } catch (error) {
      lastError = error;
      console.error("GradeCalculator contact SMTP failed:", error);
    }
  }

  return { ok: false, reason: "provider_error", error: describeSmtpError(lastError) };
}
