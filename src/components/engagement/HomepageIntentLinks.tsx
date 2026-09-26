import { UserIntentNav } from "@/components/engagement/UserIntentNav";

/** Homepage “I want to…” navigation — grouped by task, country, and specialist tools. */
export function HomepageIntentLinks({ activeHref = "/" }: { activeHref?: string }) {
  return <UserIntentNav variant="full" activeHref={activeHref} />;
}
