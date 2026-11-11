/**
 * First-touch ad attribution, captured in the browser.
 *
 * The problem this solves: a customer clicks a Google Ad onto
 * /sua-chua-cua-cuon-can-tho, reads, navigates to the homepage, and submits the
 * form there. By then the utm tags are long gone from the URL, so the CRM
 * records the lead as "Khác" and the campaign that paid for it gets no credit.
 *
 *   tagged landing ──► capture() stores it ──► form submit reads it back
 *                                              │
 *   untagged landing ──► nothing stored ───────┴─► CRM falls back to "website"
 *
 * FIRST touch wins for the utm tags, matching the CRM side (store.add_web_lead
 * keeps the original attribution on a repeat phone). A customer who arrives via
 * an ad and later returns through another click should still credit the
 * campaign that found them.
 *
 * Click ids are the exception: the LATEST gclid/gbraid/wbraid is kept, because
 * an offline conversion upload has to name a click Google still remembers
 * (90 days), and the newest click is the one most likely to be inside it.
 *
 * gclid/fbclid are captured too and inferred into a channel. Those ride along
 * on every ad click automatically, so a destination URL someone forgot to tag
 * still attributes correctly — which, given the tagging is done by hand, is the
 * case worth defending. gbraid/wbraid are what iPhone clicks often carry
 * instead of a gclid.
 */

const KEY = "htp_attribution";

// Google Ads' longest click-through conversion window, and the age limit for
// gclid offline uploads. A click older than this can't be credited anyway.
// Counted from the latest ad click.
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  landing?: string;
  ts: number;
};

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed?.ts || Date.now() - parsed.ts > TTL_MS) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    return parsed;
  } catch {
    // Private mode, disabled storage, or corrupt JSON. Attribution is a
    // nice-to-have; never let it break a lead form.
    return null;
  }
}

/**
 * Read the current URL and store attribution if this looks like an ad click and
 * nothing is stored yet. Safe to call on every page view — it no-ops once set.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const p = new URLSearchParams(window.location.search);
    const utm_source = p.get("utm_source") ?? undefined;
    const utm_medium = p.get("utm_medium") ?? undefined;
    const utm_campaign = p.get("utm_campaign") ?? undefined;
    const gclid = p.get("gclid") ?? undefined;
    const gbraid = p.get("gbraid") ?? undefined;
    const wbraid = p.get("wbraid") ?? undefined;
    const fbclid = p.get("fbclid") ?? undefined;
    const googleClick = gclid || gbraid || wbraid;

    // Nothing identifying on this URL — leave any earlier touch alone.
    if (!utm_source && !utm_medium && !utm_campaign && !googleClick && !fbclid) return;

    const stored = readStored();
    if (stored) {
      // First touch wins for the tags, but a new Google click replaces the old
      // click ids and restarts the 90-day clock.
      if (googleClick) {
        window.localStorage.setItem(
          KEY,
          JSON.stringify({ ...stored, gclid, gbraid, wbraid, ts: Date.now() })
        );
      }
      return;
    }

    const next: Attribution = {
      utm_source,
      utm_medium,
      utm_campaign,
      gclid,
      gbraid,
      wbraid,
      fbclid,
      landing: window.location.pathname,
      ts: Date.now(),
    };

    // An untagged ad click still carries its click id. Infer the channel so it
    // does not land in the CRM as an anonymous "website" lead.
    if (!next.utm_source && googleClick) {
      next.utm_source = "google";
      next.utm_medium = next.utm_medium ?? "cpc";
    }
    if (!next.utm_source && fbclid) {
      next.utm_source = "facebook";
      next.utm_medium = next.utm_medium ?? "paid_social";
    }

    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Same reasoning as readStored — attribution must never throw into a page.
  }
}

/**
 * The fields `/api/contact` forwards to the CRM. Returns an empty object when
 * there is nothing stored, so it can always be spread into a payload.
 */
export function getAttribution(): Partial<Attribution> {
  if (typeof window === "undefined") return {};
  const stored = readStored();
  if (!stored) return {};
  const { ts: _ts, ...fields } = stored;
  return fields;
}

/** True when this visitor's stored attribution is a Google Ads click. */
export function isGoogleAdsVisitor(): boolean {
  const a = getAttribution();
  if (a.gclid || a.gbraid || a.wbraid) return true;
  return (a.utm_source ?? "").toLowerCase().includes("google") &&
    ["cpc", "ppc", "paid", "paidsearch"].includes((a.utm_medium ?? "").toLowerCase());
}
