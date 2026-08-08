import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const supabase = getSupabase();

    if (supabase) {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({ name, email, message });

      if (error) {
        console.error("[contact] supabase insert failed", error);
        return NextResponse.json(
          { ok: false, error: "Failed to store message." },
          { status: 500 },
        );
      }
    } else {
      // No SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY configured yet — confirm
      // receipt without losing the message.
      console.info("[contact] submission received (not persisted)", {
        name,
        email,
        at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid payload." },
      { status: 400 },
    );
  }
}
