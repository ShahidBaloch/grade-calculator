import { contactFormSchema } from "@/lib/contact/schema";
import { deliverContactMessage } from "@/lib/contact/deliver-contact-message";
import { checkContactRateLimit, resolveClientIp } from "@/lib/contact/rate-limit";

export const dynamic = "force-dynamic";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

export async function POST(req: Request) {
  const clientIp = resolveClientIp(
    req.headers.get("x-forwarded-for"),
    req.headers.get("x-real-ip"),
  );
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

  const delivered = await deliverContactMessage(parsed.data);
  if (delivered.ok) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, error: delivered.error }, { status: delivered.httpStatus });
}
