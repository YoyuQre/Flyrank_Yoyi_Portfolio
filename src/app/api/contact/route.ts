import { NextResponse } from "next/server";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 5000;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid payload." },
      { status: 400 },
    );
  }

  // Honeypot: real visitors never see the hidden "website" field. Bots that
  // autofill every input are silently accepted so they don't learn the trick.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > NAME_MAX) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name (max 100 characters)." },
      { status: 400 },
    );
  }

  if (!email || email.length > EMAIL_MAX || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (
    !message ||
    message.length < MESSAGE_MIN ||
    message.length > MESSAGE_MAX
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: `Please provide a message between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters.`,
      },
      { status: 400 },
    );
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { ok: false, error: "The email service is not configured." },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail({ name, email, message });
  } catch (error) {
    console.error("[contact] email send failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong while sending your message. Please try again.",
      },
      { status: 500 },
    );
  }

  // Best-effort persistence so submissions aren't lost even if delivery
  // succeeds but the store is unavailable. Never blocks the response.
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message });
    if (error) console.error("[contact] supabase insert failed", error);
  }

  return NextResponse.json({ ok: true });
}
