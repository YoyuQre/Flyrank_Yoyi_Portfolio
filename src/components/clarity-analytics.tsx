"use client";

import * as React from "react";
import { isLocalhost, trackVisit } from "@/lib/tracking";

const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID ?? "xz28qpcmbe").trim();

/**
 * Microsoft Clarity integration.
 *
 * - Loads the official Clarity tag via a plain DOM script injection (the
 *   `next/script` afterInteractive strategy does not inject reliably in this
 *   Next build), executed once after mount.
 * - Reads NEXT_PUBLIC_CLARITY_ID when set; otherwise falls back to the
 *   compiled-in default so analytics works on the host platform too.
 * - Skips loading entirely on localhost / 127.0.0.1 so dev visits never reach
 *   the analytics data (see src/lib/tracking.ts).
 *
 * To change the project: create a project at https://clarity.microsoft.com,
 * then set NEXT_PUBLIC_CLARITY_ID (project id) in your `.env.local` or on the
 * host platform (Vercel/Netlify) and redeploy.
 */
export function ClarityAnalytics() {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const hostname = window.location.hostname;
    const search = window.location.search;

    if (isLocalhost(hostname) || !CLARITY_ID) return;

    const bootstrap = `(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", ${JSON.stringify(CLARITY_ID)});`;

    const script = document.createElement("script");
    script.text = bootstrap;
    script.id = "clarity-analytics";
    document.head.appendChild(script);

    trackVisit(hostname, search);
  }, []);

  return null;
}
