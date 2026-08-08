import { NextResponse } from "next/server";
import { searchAssistant } from "@/lib/assistant/engine";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body?.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json(
        { ok: false, error: "Missing query." },
        { status: 400 },
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { ok: false, error: "Query too long (max 500 chars)." },
        { status: 400 },
      );
    }

    const matches = searchAssistant(query);

    return NextResponse.json({ ok: true, query, matches });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid payload." },
      { status: 400 },
    );
  }
}
