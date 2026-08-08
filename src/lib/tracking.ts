/**
 * Visitor attribution & tracking helpers.
 *
 * Clarity auto-captures the standard `utm_*` parameters (utm_source,
 * utm_medium, utm_campaign, utm_term, utm_content) and surfaces them under
 * "Traffic sources" in the Clarity dashboard. This module adds:
 *
 *   1. A strict localhost guard so dev/test visits never pollute analytics.
 *   2. Parsing of a custom `ref` parameter (e.g. ?ref=john_doe) so you can
 *      attribute recruiter/partner referrals beyond the standard UTM set.
 *   3. A persistent "last seen campaign" record in localStorage, so a
 *      campaign survives a client-side navigation (Clarity itself already
 *      tracks it, but this keeps it reachable from your own code).
 */

export type CampaignParams = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  ref?: string;
};

const STORAGE_KEY = "yahya-last-campaign";

/**
 * True when running on a local dev host. Guards against polluting real
 * analytics with localhost test traffic.
 */
export function isLocalhost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".localhost")
  );
}

/**
 * Read every attribution parameter out of a query string.
 *
 * @example
 *   parseCampaignParams("?utm_campaign=google_recruiter&ref=john_doe")
 *   // => { utmCampaign: "google_recruiter", ref: "john_doe" }
 */
export function parseCampaignParams(search: string): CampaignParams {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const get = (key: string) => params.get(key)?.trim() || undefined;
  return {
    utmSource: get("utm_source"),
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    utmTerm: get("utm_term"),
    utmContent: get("utm_content"),
    ref: get("ref"),
  };
}

export function hasCampaignParams(campaign: CampaignParams): boolean {
  return Object.values(campaign).some(Boolean);
}

/**
 * Persist the first campaign a visitor arrives with, so it survives SPA
 * navigation. Returns the stored campaign.
 */
export function rememberCampaign(campaign: CampaignParams): CampaignParams {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaign));
  } catch {
    // Storage unavailable (private mode) — ignore.
  }
  return campaign;
}

export function getRememberedCampaign(): CampaignParams | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CampaignParams) : null;
  } catch {
    return null;
  }
}

/**
 * Central entry point for tracking a visit + its attribution.
 * Call once per page load (client-side only).
 *
 * When Clarity is loaded (window.clarity is defined), it forwards the
 * campaign as a custom event. Otherwise it degrades to the localStorage
 * record so nothing throws.
 */
export function trackVisit(hostname: string, search: string): void {
  if (isLocalhost(hostname)) {
    console.info("[tracking] skipped — local development host", hostname);
    return;
  }

  const campaign = parseCampaignParams(search);
  if (hasCampaignParams(campaign)) {
    rememberCampaign(campaign);
  }

  const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void })
    .clarity;
  if (typeof clarity === "function") {
    clarity("event", "visit");
    if (hasCampaignParams(campaign)) {
      clarity("event", "campaign_visit", campaign);
    }
  }
}

/**
 * Build a shareable, attributed link for an email/social post.
 *
 * @example
 *   buildAttributedLink("/", { utmCampaign: "google_recruiter", ref: "john_doe" })
 *   // => "/?utm_campaign=google_recruiter&ref=john_doe"
 */
export function buildAttributedLink(
  path: string,
  campaign: CampaignParams,
): string {
  const url = new URL(path, "https://yahya.ai");
  for (const [key, value] of Object.entries(campaign)) {
    if (value) {
      url.searchParams.set(kebabCase(key), value);
    }
  }
  return url.pathname + url.search;
}

function kebabCase(key: string): string {
  return key
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace(/^_/, "");
}
