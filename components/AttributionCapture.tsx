"use client";

import * as React from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records first-touch ad attribution (UTM tags, click ids, referrer) on the landing page view,
 * so the lead form can credit the campaign that found the visitor.
 *
 * Mounted once in the root layout. Capture runs on mount only: an ad click is
 * always the initial page load, so there is nothing to catch on subsequent
 * client navigations, and reading search params on every route change would
 * force a Suspense boundary around all 152 static pages for no gain.
 *
 * Until 10/11/2026 this component also swapped the hotline order for Google Ads visitors
 * (their call and Zalo buttons rang the other number). Since 0913 574 077 became the main
 * number for everyone, there is nothing to swap.
 *
 * Renders nothing.
 */
export function AttributionCapture() {
  React.useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
