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
 * FIRST touch wins, matching the CRM side (store.add_web_lead keeps the
 * original attribution on a repeat phone). A customer who arrives via an ad and
 * later returns through a remarketing click should still credit the campaign
 * that found them.
 *
 * gclid/fbclid are captured too and inferred into a channel. Those ride along
 * on every ad click automatically, so a destination URL someone forgot to tag
 * still attributes correctly — which, given the tagging is done by hand, is the
 * case worth defending.
 */

const KEY = "htp_attribution";

// Google Ads' own default conversion window. A click older than this should not
// keep claiming credit for a lead.
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
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
    const fbclid = p.get("fbclid") ?? undefined;

    // Nothing identifying on this URL — leave any earlier touch alone.
    if (!utm_source && !utm_medium && !utm_campaign && !gclid && !fbclid) return;

    // First touch wins.
    if (readStored()) return;

    const next: Attribution = {
      utm_source,
      utm_medium,
      utm_campaign,
      gclid,
      fbclid,
      landing: window.location.pathname,
      ts: Date.now(),
    };

    // An untagged ad click still carries its click id. Infer the channel so it
    // does not land in the CRM as an anonymous "website" lead.
    if (!next.utm_source && gclid) {
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
