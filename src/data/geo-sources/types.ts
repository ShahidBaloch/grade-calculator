/** A primary source a figure on a geo page was copied from. */
export interface OfficialSource {
  publisher: string;
  title: string;
  href: string;
  /** Date we read the page (YYYY-MM-DD). */
  checked: string;
  /** Edition or "last updated" line printed on the source, when it has one. */
  edition?: string;
  /** How the page was read when the live site blocks automated fetches. */
  readVia?: string;
}

/** A candidate page we researched but did not publish. */
export interface DroppedCandidate {
  name: string;
  reason: string;
  checkedSources: Array<{ label: string; href: string }>;
}
