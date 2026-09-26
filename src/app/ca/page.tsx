import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/ca"];

export const metadata = createPageMetadata({
  title: "Canada Grading Tools — University GPA",
  description: hub.description,
  path: "/ca",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages("/ca"),
});

export default function CaHubPage() {
  return <CountryHubContent hub={hub} />;
}
