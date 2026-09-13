import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/ca"];

export const metadata = createPageMetadata({
  title: "Canada Grade Calculator — Canadian GPA Tools",
  description: hub.description,
  path: "/ca",
  keywords: hub.keywords,
});

export default function CaHubPage() {
  return <CountryHubContent hub={hub} />;
}
