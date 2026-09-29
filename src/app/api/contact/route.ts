import { NextRequest, NextResponse } from "next/server";
import { createRecord } from "@/lib/airtable";
import { contactMessageInputSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactMessageInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { fullName, email, phone, subject, message, website } = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend success without persisting.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await createRecord("Contact Messages", {
      "Full Name": fullName,
      Email: email,
      Phone: phone || undefined,
      Subject: subject || undefined,
      Message: message || undefined,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't send that right now. Try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
