import robots from "@/app/robots";

/** Same text format as Next's MetadataRoute.Robots serializer. */
export function GET() {
  const config = robots();
  let text = "";
  for (const rule of config.rules) {
    for (const agent of [rule.userAgent].flat()) text += `User-Agent: ${agent}\n`;
    for (const path of [rule.allow ?? []].flat()) text += `Allow: ${path}\n`;
    for (const path of [rule.disallow ?? []].flat()) text += `Disallow: ${path}\n`;
    text += "\n";
  }
  if (config.host) text += `Host: ${config.host}\n`;
  for (const sitemap of [config.sitemap ?? []].flat()) text += `Sitemap: ${sitemap}\n`;
  return new Response(text, { headers: { "Content-Type": "text/plain" } });
}
