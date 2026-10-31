import { contactFormSchema, type ContactFormValues } from "@/lib/contact/schema";
import type { DeliverContactResult } from "@/lib/contact/deliver-contact-message";
import { checkContactRateLimit } from "@/lib/contact/rate-limit";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

/** POST /api/contact on any host: rate limit, honeypot, validation, then `deliver`. */
export async function handleContactRequest(
  req: Request,
  clientIp: string,
  deliver: (values: ContactFormValues) => Promise<DeliverContactResult>,
): Promise<Response> {
  const rate = checkContactRateLimit(clientIp);
  if (!rate.allowed) {
    return Response.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (String(body.website ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const parsed = contactFormSchema.safeParse({
    name: body.name,
    email: body.email,
    message: body.message,
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Check the form and try again.";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }

  const delivered = await deliver(parsed.data);
  if (delivered.ok) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, error: delivered.error }, { status: delivered.httpStatus });
}
