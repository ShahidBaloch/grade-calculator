import { siteConfig } from "@/config/site";

/** Shared contact copy — keep in sync with Organization schema email. */
export const contactConfig = {
  email: siteConfig.email,
  inquiryCta: "Send message",
  successLead: "Thanks — we’ll get back to you within a few business days.",
} as const;
