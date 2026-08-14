import { site } from "@/lib/site";

const RESEND_API_URL = "https://api.resend.com/emails";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

/**
 * Server-only email helper. Sends contact-form messages through Resend
 * (https://resend.com) using its REST API. Never import this from a client
 * component — the API key is a server secret and must not reach the browser.
 *
 * Configure in `.env.local` / the host platform:
 *   RESEND_API_KEY      required — https://resend.com/api-keys
 *   RESEND_FROM_EMAIL   optional — verified sender; defaults to onboarding@resend.dev
 *   CONTACT_EMAIL       optional — where to deliver; defaults to site.email
 */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function sendContactEmail({
  name,
  email,
  message,
}: ContactMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const to = process.env.CONTACT_EMAIL?.trim() || site.email;

  if (!apiKey) {
    throw new Error("Resend is not configured (RESEND_API_KEY).");
  }

  const sentAt = new Date().toISOString();
  const subject = `New Portfolio Contact \u2014 ${name}`;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Sent at: ${sentAt}`,
    "",
    "Message:",
    message,
    "",
    `Reply to this email to reach ${name} at ${email}.`,
  ].join("\n");

  const html = [
    "<p><strong>Name:</strong> ",
    escapeHtml(name),
    "<br/><strong>Email:</strong> <a href=\"mailto:",
    escapeHtml(email),
    "\">",
    escapeHtml(email),
    "</a><br/><strong>Sent at:</strong> ",
    escapeHtml(sentAt),
    "</p>",
    "<p><strong>Message:</strong></p>",
    "<p>",
    escapeHtml(message).replace(/\n/g, "<br/>"),
    "</p>",
    "<p><em>Reply to this email to reach ",
    escapeHtml(name),
    " at ",
    escapeHtml(email),
    ".</em></p>",
  ].join("");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend returned ${response.status}: ${detail}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
