/**
 * Adsterra ad unit (website ID 6177089). One small banner per page — no native banner, popunder,
 * social bar or smartlink. "Adult ads" is off for the website in the Adsterra dashboard.
 *
 * Rendered below <main>, away from calculator buttons. The banner runs in its own lazy iframe:
 * Adsterra reads a global `atOptions`, so the iframe keeps it off the page, and the fixed size
 * reserves space so the page does not shift. A lazy iframe that is display:none never loads, so
 * only the banner for the current screen size is requested.
 */
const ADSTERRA_HOST = "https://bauval.org";

const banners = {
  desktop: { key: "02bc878d3310ae4ab2c887dc2659cd44", width: 728, height: 90 },
  mobile: { key: "335cd4f42b725f5950ca02bb1e5b7e10", width: 320, height: 50 },
} as const;

function bannerDoc({ key, width, height }: { key: string; width: number; height: number }): string {
  return (
    `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body>` +
    `<script>atOptions={'key':'${key}','format':'iframe','height':${height},'width':${width},'params':{}};</script>` +
    `<script src="${ADSTERRA_HOST}/22/${key}"></script></body></html>`
  );
}

function BannerFrame({ banner, className }: { banner: (typeof banners)[keyof typeof banners]; className: string }) {
  return (
    <div className={className}>
      <iframe
        title="Advertisement"
        loading="lazy"
        width={banner.width}
        height={banner.height}
        srcDoc={bannerDoc(banner)}
        style={{ border: 0, display: "block", maxWidth: "100%" }}
        scrolling="no"
      />
    </div>
  );
}

export function AdSlots() {
  return (
    <aside aria-label="Advertisement" className="no-print mx-auto my-8 max-w-7xl px-4" data-print-chrome>
      <p className="mb-2 text-center text-xs uppercase tracking-wide text-[var(--color-text-muted)]">Advertisement</p>
      <BannerFrame banner={banners.desktop} className="hidden justify-center md:flex" />
      <BannerFrame banner={banners.mobile} className="flex justify-center md:hidden" />
    </aside>
  );
}
