/** When the tool name already names the market, do not prefix the hub country again. */
const TOOL_NAME_ALREADY_HAS_HUB: Partial<Record<string, RegExp>> = {
  "/in": /^india\b/i,
  "/uk": /^uk\b/i,
  "/ca": /^canada\b/i,
  "/au": /^australia\b/i,
  "/nz": /^new zealand\b/i,
  "/pk": /^pakistan\b/i,
};

export function geoCalculatorHeading(hubPath: string, hubName: string, toolName: string): string {
  // "US Letter Grade Calculator" on /au would read "Australia US Letter…" — the hub scale replaces US.
  const trimmed = hubPath === "/us" ? toolName.trim() : toolName.trim().replace(/^US\s+/, "");
  if (TOOL_NAME_ALREADY_HAS_HUB[hubPath]?.test(trimmed)) return trimmed;
  if (trimmed.toLowerCase().startsWith(hubName.toLowerCase())) return trimmed;
  return `${hubName} ${trimmed}`;
}
