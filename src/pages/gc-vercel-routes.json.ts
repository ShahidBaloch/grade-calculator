import { seoRedirects } from "@/lib/seo/intent-urls";

/**
 * Build-time only: hands the SEO redirect list to integrations/vercel-routes.ts, which writes it
 * into the Vercel output config and deletes this file.
 */
export function GET() {
  return Response.json({ redirects: seoRedirects() });
}
