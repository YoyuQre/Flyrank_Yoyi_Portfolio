"use client";

import Script from "next/script";
import * as React from "react";
import { trackVisit } from "@/lib/tracking";

const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID ?? "").trim();

/**
 * Microsoft Clarity integration.
 *
 * - Loads the official Clarity tag via next/script (afterInteractive).
 * - Disabled entirely when no NEXT_PUBLIC_CLARITY_ID is configured.
 * - Skips tracking on localhost / 127.0.0.1 so dev visits stay out of the
 *   analytics data (see src/lib/tracking.ts).
 *
 * To enable: create a project at https://clarity.microsoft.com, then set
 * NEXT_PUBLIC_CLARITY_ID (project id) in your `.env.local` or on the host
 * platform (Vercel/Netlify) and redeploy.
 */
export function ClarityAnalytics() {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const hostname = window.location.hostname;
    const search = window.location.search;
    trackVisit(hostname, search);
  }, []);

  if (!CLARITY_ID) {
    return null;
  }

  return (
    <Script
      id="clarity-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", ${JSON.stringify(CLARITY_ID)});`,
      }}
    />
  );
}
