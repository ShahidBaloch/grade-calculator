/**
 * Adsterra ad units (website ID 6177089). Banner and Native Banner formats only — no popunder,
 * social bar or smartlink, which hurt rankings and AdSense eligibility.
 *
 * Rendered below <main>, away from calculator buttons. Each banner runs in its own lazy iframe:
 * Adsterra reads a global `atOptions`, so isolating them stops units overwriting each other, and
 * the fixed size reserves space so the page does not shift. A lazy iframe that is display:none
 * never loads, so only the banner for the current screen size is requested.
 */
const ADSTERRA_HOST = "https://bauval.org";

const banners = {
  desktop: { key: "02bc878d3310ae4ab2c887dc2659cd44", width: 728, height: 90 },
  mobile: { key: "f27d908735d1c048beb29ce69ac89bf1", width: 300, height: 250 },
} as const;

const NATIVE_BANNER_ID = "d6ba14d0675f75df222bd46e393cb640";

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
      <div className="mt-6">
        <script async data-cfasync="false" src={`${ADSTERRA_HOST}/21/${NATIVE_BANNER_ID}`} />
        <div id={`container-${NATIVE_BANNER_ID}`} />
      </div>
    </aside>
  );
}
