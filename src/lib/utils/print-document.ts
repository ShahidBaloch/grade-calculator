import { siteConfig } from "@/config/site";

/** Characters invalid in Windows/macOS file names (and common print-to-PDF defaults). */
const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\u0000-\u001f]/g;

const CALCULATOR_ARTICLE_SELECTOR = 'article[aria-labelledby="calculator-page-title"]';

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

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function syncClonedFormValues(source: ParentNode, clone: ParentNode): void {
  const sourceFields = source.querySelectorAll("input, textarea, select");
  const cloneFields = clone.querySelectorAll("input, textarea, select");
  sourceFields.forEach((field, index) => {
    const target = cloneFields[index];
    if (!target) return;
    if (field instanceof HTMLInputElement && target instanceof HTMLInputElement) {
      target.value = field.value;
      target.checked = field.checked;
    } else if (field instanceof HTMLTextAreaElement && target instanceof HTMLTextAreaElement) {
      target.value = field.value;
    } else if (field instanceof HTMLSelectElement && target instanceof HTMLSelectElement) {
      target.value = field.value;
    }
  });
}

export function getCalculatorArticleClone(): HTMLElement | null {
  const article = document.querySelector(CALCULATOR_ARTICLE_SELECTOR);
  if (!article) return null;
  const clone = article.cloneNode(true) as HTMLElement;
  syncClonedFormValues(article, clone);
  clone.querySelectorAll(".no-print, [data-print-chrome]").forEach((node) => node.remove());
  return clone;
}

function collectHeadMarkup(doc: Document): string {
  return Array.from(doc.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join("");
}

function printInCurrentWindow(printTitle: string): void {
  const previousTitle = document.title;
  document.title = printTitle;
  const restore = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}

/**
 * Prints calculator results only (no site header, privacy bar, or footer).
 * Uses a dedicated window so the PDF name can follow `document.title`.
 */
export function printCalculatorPage(): void {
  if (typeof window === "undefined") return;

  const printTitle = buildPrintDocumentTitle(resolveCalculatorPrintHeading());
  const articleClone = getCalculatorArticleClone();

  if (!articleClone) {
    printInCurrentWindow(printTitle);
    return;
  }

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    printInCurrentWindow(printTitle);
    return;
  }

  const headMarkup = collectHeadMarkup(document);
  const htmlClass = document.documentElement.className;
  const bodyClass = document.body.className;
  const lang = document.documentElement.lang || "en-US";

  printWindow.document.open();
  printWindow.document.write(`<!DOCTYPE html>
<html lang="${escapeHtml(lang)}" class="${escapeHtml(htmlClass)}">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(printTitle)}</title>
${headMarkup}
</head>
<body class="${escapeHtml(bodyClass)}">
<div class="mx-auto max-w-3xl px-4 py-6 md:py-8">${articleClone.outerHTML}</div>
</body>
</html>`);
  printWindow.document.close();

  let printed = false;
  const runPrint = () => {
    if (printed) return;
    printed = true;
    printWindow.document.title = printTitle;
    printWindow.focus();
    const cleanup = () => {
      printWindow.removeEventListener("afterprint", cleanup);
      printWindow.close();
    };
    printWindow.addEventListener("afterprint", cleanup);
    printWindow.print();
  };

  const links = Array.from(printWindow.document.querySelectorAll('link[rel="stylesheet"]'));
  if (links.length === 0) {
    runPrint();
    return;
  }

  let pending = links.length;
  const onSheetDone = () => {
    pending -= 1;
    if (pending <= 0) runPrint();
  };
  for (const link of links) {
    link.addEventListener("load", onSheetDone);
    link.addEventListener("error", onSheetDone);
  }
  window.setTimeout(runPrint, 2500);
}
