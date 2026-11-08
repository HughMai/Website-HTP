"use client";

import { useEffect } from "react";
import { trackLead } from "@/lib/track";

/**
 * One document-level listener that reports every phone and Zalo tap on the
 * site — not just the ones someone remembered to wire up.
 *
 * Calls and Zalo chats are this shop's main conversions, and the site has ~70
 * `tel:` links spread across every landing page (hero buttons, price tables,
 * CTA bands, the footer, the desktop rail). Wiring an onClick into each one
 * would miss the next page someone adds, and an ad click that converts through
 * an untracked button looks to Google Ads like a click that went nowhere.
 *
 * `source` says where the link sat: an explicit `data-track` on a container
 * (the two fixed contact bars), otherwise the page landmark around it.
 */
function sourceOf(link: Element): string {
  const tagged = link.closest<HTMLElement>("[data-track]");
  if (tagged?.dataset.track) return tagged.dataset.track;
  if (link.closest("footer")) return "footer";
  if (link.closest("header, nav")) return "header";
  return "inline";
}

export function LeadClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackLead("call_click", { source: sourceOf(link) });
      } else if (/^https?:\/\/(www\.)?zalo\.me\//i.test(href)) {
        trackLead("zalo_click", { source: sourceOf(link) });
      }
    };
    // Capture phase: runs even if a component stops propagation on its link.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
