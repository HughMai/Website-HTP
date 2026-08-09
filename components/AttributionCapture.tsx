"use client";

import * as React from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records first-touch ad attribution on the landing page view.
 *
 * Mounted once in the root layout. Runs on mount only: an ad click is always
 * the initial page load, so there is nothing to catch on subsequent client
 * navigations, and reading search params on every route change would force a
 * Suspense boundary around all 152 static pages for no gain.
 *
 * Renders nothing.
 */
export function AttributionCapture() {
  React.useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
