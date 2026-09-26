/**
 * Editorial policy: do not ship thin programmatic URL patterns (e.g. /3/4-as-a-percent)
 * without unique content, canonical targets, and noindex where appropriate.
 */
const LOW_VALUE_PATH_PATTERNS: RegExp[] = [
  /^\/\d+\/\d+(?:\/|-|$)/,
  /^\/\d+-out-of-\d+/i,
  /-out-of-\d+(?:-|$)/i,
  /as-a-percent/i,
  /^\/what-is-\d+-percent-of-\d+/i,
  /^\/percent-of-\d+/i,
  /^\/\d+-percent-of-\d+/i,
];

export function isLowValueProgrammaticPath(pathname: string): boolean {
  const path = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  return LOW_VALUE_PATH_PATTERNS.some((pattern) => pattern.test(path));
}
