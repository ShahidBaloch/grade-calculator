import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/in"];

export const metadata = createPageMetadata({
  title: "India Grading Tools — CGPA and 10-Point GPA",
  description: hub.description,
  path: "/in",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages("/in"),
});

export default function InHubPage() {
  return <CountryHubContent hub={hub} />;
}
