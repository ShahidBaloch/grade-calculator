export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Avoid Gmail deduping when SMTP_USER and CONTACT_TO are the same routed address. */
export function gmailPlusAlias(address: string, tag: string): string {
  const at = address.lastIndexOf("@");
  if (at <= 0) return address;
  const local = address.slice(0, at);
  const domain = address.slice(at + 1);
  if (local.includes("+")) return address;
  return `${local}+${tag}@${domain}`;
}

export function sanitizeSubjectFragment(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Google shows App Passwords with spaces; SMTP auth needs the 16 characters only. */
export function normalizeSmtpPassword(value: string): string {
  return value.trim().replace(/^["']|["']$/g, "").replace(/\s+/g, "");
}

export function formatMailboxFrom(raw: string): string {
  const value = raw.trim();
  if (value.includes("<") && value.includes(">")) return value;
  return `"GradeCalculator Contact" <${value}>`;
}

/**
 * Where the contact form delivers.
 * Gmail SMTP defaults to SMTP_USER+gradcalc so the copy stays visible when
 * hello@gradcalc.com forwards back into the same Gmail (self-sends can be hidden).
 * CONTACT_TO overrides that when you want a specific inbox.
 */
export function resolveSmtpRecipient(options: {
  host: string;
  smtpUser: string;
  contactTo?: string;
  publicInbox: string;
}): string {
  const explicit = options.contactTo?.trim();
  if (explicit) return explicit;
  if (options.host.toLowerCase().includes("gmail")) {
    return gmailPlusAlias(options.smtpUser, "gradcalc");
  }
  return options.publicInbox.trim() || options.smtpUser;
}
