import { siteConfig } from "@/config/site";

/** Characters invalid in Windows/macOS file names (and common print-to-PDF defaults). */
const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\u0000-\u001f]/g;

export function formatPrintDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Normalizes text for use as the browser’s default PDF / print job name (via `document.title`). */
export function sanitizePrintDocumentTitle(title: string): string {
  return title
    .replace(/\s*[|｜]\s*/g, " - ")
    .replace(/[—–]/g, "-")
    .replace(INVALID_FILENAME_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

/**
 * Suggested Save-as-PDF name: "{page heading} - {site} - {YYYY-MM-DD}".
 * Browsers derive the default filename from `document.title` when printing.
 */
export function buildPrintDocumentTitle(pageHeading: string, date = new Date()): string {
  const heading = sanitizePrintDocumentTitle(pageHeading);
  const site = sanitizePrintDocumentTitle(siteConfig.name);
  const datePart = formatPrintDate(date);
  return sanitizePrintDocumentTitle(`${heading} - ${site} - ${datePart}`);
}

export function resolveCalculatorPrintHeading(): string {
  if (typeof document === "undefined") return siteConfig.name;
  const fromPage = document.getElementById("calculator-page-title")?.textContent?.trim();
  if (fromPage) return fromPage;
  const fromTitle = document.title.split("|")[0]?.trim();
  return fromTitle || siteConfig.name;
}

export function printCalculatorPage(): void {
  if (typeof window === "undefined") return;

  const previousTitle = document.title;
  const printTitle = buildPrintDocumentTitle(resolveCalculatorPrintHeading());
  document.title = printTitle;

  const restore = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}
