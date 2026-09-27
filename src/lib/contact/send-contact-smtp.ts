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

export type SendSmtpResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

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
    return { ok: false, reason: "not_configured" };
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

  try {
    await transporter.sendMail({
      from,
      replyTo: values.email,
      to,
      subject: `New GradeCalculator message from ${subjectName}`,
      text: textBody,
      html: `
        <h2>New GradeCalculator Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(values.message).replace(/\n/g, "<br />")}</p>
      `,
    });
    return { ok: true };
  } catch (error) {
    console.error("GradeCalculator contact SMTP failed:", error);
    return { ok: false, reason: "provider_error" };
  }
}
