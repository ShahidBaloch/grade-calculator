/**
 * Cloudflare Worker for gradcalc.com. Pages and files are Workers static assets
 * (.cloudflare/static, built by `npm run build`) and never reach this code: wrangler.jsonc
 * runs the worker first only for /api/*, so page views cost no worker request.
 */
import { EmailMessage } from "cloudflare:email";
import { securityHeaders } from "../src/config/security-headers";
import { siteConfig } from "../src/config/site";
import type { DeliverContactResult } from "../src/lib/contact/deliver-contact-message";
import { handleContactRequest } from "../src/lib/contact/handle-contact-request";
import type { ContactFormValues } from "../src/lib/contact/schema";
import { sendContactEmail } from "../src/lib/contact/send-contact-email";
import { GET as geo } from "../src/pages/api/geo";
import { GET as health } from "../src/pages/api/health";

interface Env {
  ASSETS: Fetcher;
  /** Cloudflare Email Routing send binding; `CONTACT_TO` must be a verified destination address. */
  CONTACT_EMAIL?: SendEmail;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

/** Encoded-word for header values that may contain non-ASCII (RFC 2047). */
function encodeHeader(value: string): string {
  const clean = value.replace(/[\r\n]+/g, " ").trim();
  if (/^[\x20-\x7e]*$/.test(clean)) return clean;
  const bytes = new TextEncoder().encode(clean);
  return `=?UTF-8?B?${btoa(String.fromCharCode(...bytes))}?=`;
}

async function sendViaEmailRouting(env: Env, values: ContactFormValues): Promise<boolean> {
  if (!env.CONTACT_EMAIL || !env.CONTACT_TO) return false;
  const from = env.CONTACT_FROM ?? "contact@gradcalc.com";
  const body = [
    "New GradCalc Contact Form Submission",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    "",
    "Message:",
    values.message,
    "",
    `— Sent via ${siteConfig.url}/contact`,
  ].join("\r\n");
  const raw = [
    `From: GradCalc <${from}>`,
    `To: ${env.CONTACT_TO}`,
    `Reply-To: ${values.email.replace(/[\r\n<>]/g, "")}`,
    `Subject: ${encodeHeader(`GradCalc contact from ${values.name}`)}`,
    `Message-ID: <${crypto.randomUUID()}@gradcalc.com>`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body,
  ].join("\r\n");
  await env.CONTACT_EMAIL.send(new EmailMessage(from, env.CONTACT_TO, raw));
  return true;
}

async function deliver(env: Env, values: ContactFormValues): Promise<DeliverContactResult> {
  try {
    if (await sendViaEmailRouting(env, values)) return { ok: true };
  } catch (error) {
    console.error("contact: email routing send failed", error);
    return { ok: false, error: "Something went wrong sending your message.", httpStatus: 500 };
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

async function route(request: Request, env: Env): Promise<Response> {
  const { pathname } = new URL(request.url);
  const method = request.method;
  if (pathname === "/api/geo" && (method === "GET" || method === "HEAD")) {
    // cf-ipcountry needs the zone's IP Geolocation setting; request.cf.country is always there.
    const headers = new Headers(request.headers);
    const country = request.cf?.country;
    if (!headers.has("cf-ipcountry") && typeof country === "string") headers.set("cf-ipcountry", country);
    return geo({ request: new Request(request.url, { headers }) });
  }
  if (pathname === "/api/health" && (method === "GET" || method === "HEAD")) return health();
  if (pathname === "/api/contact" && method === "POST") {
    const clientIp = request.headers.get("cf-connecting-ip") ?? "unknown";
    return handleContactRequest(request, clientIp, (values) => deliver(env, values));
  }
  // Anything else under /api is the site's 404 page, as on Vercel.
  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env) {
    const response = await route(request, env);
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, { status: response.status, headers });
  },
} satisfies ExportedHandler<Env>;
