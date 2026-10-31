import { deliverContactMessage } from "@/lib/contact/deliver-contact-message";
import { handleContactRequest } from "@/lib/contact/handle-contact-request";
import { resolveClientIp } from "@/lib/contact/rate-limit";

export const prerender = false;

export async function POST({ request: req }: { request: Request }) {
  const clientIp = resolveClientIp(
    req.headers.get("x-forwarded-for"),
    req.headers.get("x-real-ip"),
  );
  return handleContactRequest(req, clientIp, deliverContactMessage);
}
