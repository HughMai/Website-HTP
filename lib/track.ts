/**
 * Fire a conversion event to whichever tags are actually loaded.
 *
 * Every call site is a real business event — a lead form submit, a tap on the
 * phone number, a tap through to Zalo. Those are the three things worth paying
 * for, and the ad platforms optimise toward whatever you report, so reporting
 * them accurately is what makes Smart Bidding work later.
 *
 * No-ops silently when the tags are absent (which is every deploy until the ad
 * accounts exist). Never throws into a click handler: a blocked tracker must
 * not stop a customer from reaching the phone.
 */

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

export type LeadEvent = "form_submit" | "call_click" | "zalo_click";

// Meta's standard event names — using the standard vocabulary is what lets the
// Pixel optimise delivery instead of treating these as opaque custom events.
const META_EVENT: Record<LeadEvent, string> = {
  form_submit: "Lead",
  call_click: "Contact",
  zalo_click: "Contact",
};

// Native Google Ads conversion actions. Each label comes from Google Ads →
// Goals → Conversions → (action) → Tag setup, e.g. "AbC-D_efG-h12_34-567".
// Unset label = that action isn't sent natively; GA4 import still works.
// Never have a native action AND its GA4 import both Primary: every lead would
// count twice (runbook §2b).
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LABEL: Record<LeadEvent, string | undefined> = {
  form_submit: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_FORM,
  call_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_CALL,
  zalo_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_ZALO,
};
// Provisional values in VND, matching runbook §2a. A form is worth more than a
// tap: a tap is intent, a form is a contact.
const ADS_VALUE: Record<LeadEvent, number> = {
  form_submit: 300000,
  call_click: 100000,
  zalo_click: 100000,
};

export function trackLead(
  event: LeadEvent,
  detail?: Record<string, unknown>,
  transactionId?: string
): void {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", event, detail ?? {});
  } catch {
    /* a blocked or half-loaded tag must never break the page */
  }

  const label = ADS_LABEL[event];
  if (ADS_ID && label) {
    try {
      window.gtag?.("event", "conversion", {
        send_to: `${ADS_ID}/${label}`,
        value: ADS_VALUE[event],
        currency: "VND",
        // Dedupes a double-fired form conversion and ties it to the CRM row.
        ...(transactionId ? { transaction_id: transactionId } : {}),
      });
    } catch {
      /* same */
    }
  }

  try {
    window.fbq?.("track", META_EVENT[event], detail ?? {});
  } catch {
    /* same */
  }
}
