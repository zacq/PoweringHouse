import { NextRequest, NextResponse } from "next/server";
import { createRecord } from "@/lib/airtable";
import { subscribeInputSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = subscribeInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, source, website } = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend success without persisting.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await createRecord("Subscribers", { Email: email, Source: source || "Newsletter" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't save that right now. Try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
