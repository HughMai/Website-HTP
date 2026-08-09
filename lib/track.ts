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

export function trackLead(event: LeadEvent, detail?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", event, detail ?? {});
  } catch {
    /* a blocked or half-loaded tag must never break the page */
  }

  try {
    window.fbq?.("track", META_EVENT[event], detail ?? {});
  } catch {
    /* same */
  }
}
