/**
 * Local check before deploy: uses the same env vars as Vercel (put them in .env.local).
 * Run: npm run verify:contact-smtp
 */
import nodemailer from "nodemailer";

function normalizeSmtpPassword(value) {
  return value.trim().replace(/^["']|["']$/g, "").replace(/\s+/g, "");
}

function gmailPlusAlias(address, tag) {
  const at = address.lastIndexOf("@");
  if (at <= 0) return address;
  const local = address.slice(0, at);
  const domain = address.slice(at + 1);
  if (local.includes("+")) return address;
  return `${local}+${tag}@${domain}`;
}

const host = process.env.SMTP_HOST?.trim();
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER?.trim();
const pass = normalizeSmtpPassword(process.env.SMTP_PASS ?? "");

if (!host || !user || !pass) {
  console.error(
    "Missing SMTP_HOST, SMTP_USER, or SMTP_PASS. Copy them into .env.local (see .env.example).",
  );
  process.exit(1);
}

const usingGmail = host.toLowerCase().includes("gmail");
const to =
  process.env.CONTACT_TO?.trim() ||
  (usingGmail ? gmailPlusAlias(user, "gradcalc") : user);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  requireTLS: port === 587,
  auth: { user, pass },
});

console.log("SMTP login as:", user);
console.log("Delivery target:", to);
console.log("Verifying Gmail login…");

try {
  await transporter.verify();
} catch (error) {
  console.error("\nLogin failed (fix SMTP_USER + SMTP_PASS App Password, then retry):\n", error);
  process.exit(1);
}

console.log("Login OK. Sending test message…");

await transporter.sendMail({
  from: `"GradeCalculator Contact" <${user}>`,
  envelope: { from: user, to },
  to,
  subject: "GradCalc SMTP verify (local script)",
  text: [
    "This is a local verify:contact-smtp test.",
    "If you see this, production contact form should work with the same env vars.",
    "",
    `SMTP_USER: ${user}`,
    `Delivered to: ${to}`,
  ].join("\n"),
});

console.log("\nSuccess. Open that inbox and search for: GradCalc SMTP verify");
console.log("(Gmail: also check Promotions/Spam once, then Report not spam if needed.)");
