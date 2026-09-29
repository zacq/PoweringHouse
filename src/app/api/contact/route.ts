import { NextRequest, NextResponse } from "next/server";
import { createRecord } from "@/lib/airtable";
import { contactMessageInputSchema, isHoneypotHit } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (isHoneypotHit(body)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactMessageInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { fullName, email, phone, subject, message } = parsed.data;

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
