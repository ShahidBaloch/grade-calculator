import sitemap from "@/app/sitemap";

/** Same XML layout as Next's MetadataRoute.Sitemap serializer. */
export function GET() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const entry of sitemap()) {
    xml += "<url>\n";
    xml += `<loc>${entry.url}</loc>\n`;
    if (entry.lastModified) {
      const lastmod =
        entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified;
      xml += `<lastmod>${lastmod}</lastmod>\n`;
    }
    if (entry.changeFrequency) xml += `<changefreq>${entry.changeFrequency}</changefreq>\n`;
    if (entry.priority !== undefined) xml += `<priority>${entry.priority}</priority>\n`;
    xml += "</url>\n";
  }
  xml += "</urlset>\n";
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
