import Script from "next/script";

/**
 * Conversion tracking for paid acquisition. Renders nothing until the matching
 * env var is set, so this is inert on every deploy until ads actually launch.
 *
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID   G-XXXXXXX    GA4 — behaviour + goals
 *   NEXT_PUBLIC_GOOGLE_ADS_ID       AW-XXXXXXX   Google Ads conversions (remarketing OFF:
 *                                                 no consent for ad personalisation yet,
 *                                                 PDPL Art. 28(8); runbook G6)
 *   NEXT_PUBLIC_META_PIXEL_ID       123456789    Meta Pixel — Messenger + site leads
 *
 * GA4 and Google Ads share one gtag.js load: loading it twice double-counts
 * every pageview. The loader is emitted once, then each configured product gets
 * its own `config` line.
 *
 * `afterInteractive` is deliberate. These are third-party scripts on a site
 * whose customers are on Vietnamese mobile networks — they must never sit in
 * front of first paint. Conversions still register; the tag simply fires a
 * moment later.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function Analytics() {
  const gtagId = GA_ID || ADS_ID;

  return (
    <>
      {gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
              ${ADS_ID ? `gtag('config', '${ADS_ID}', { allow_ad_personalization_signals: false });` : ""}
            `}
          </Script>
        </>
      )}

      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
