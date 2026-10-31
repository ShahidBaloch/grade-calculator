import type { ReactNode } from "react";
import RootLayout from "@/app/layout";

/** Renders the page's already-resolved JSX inside the root layout. */
export default function PageBody({ tree }: { tree: ReactNode }) {
  return <RootLayout>{tree}</RootLayout>;
}
