import { NextRequest, NextResponse } from "next/server";
import { createRecord, getRecord } from "@/lib/airtable";
import { isHoneypotHit, subscribeInputSchema } from "@/lib/validations";

interface GatedResourceFields {
  Title: string;
  "File URL": string;
  Access: string;
  Published: boolean;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (isHoneypotHit(body)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = subscribeInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, resourceId } = parsed.data;

  // Gated E-Resource: the file URL never reaches the page, only this response.
  let source = "Newsletter";
  let fileUrl: string | undefined;
  if (resourceId) {
    const resource = await getRecord<GatedResourceFields>("E-Resources", resourceId);
    const fields = resource?.fields;
    if (!fields?.Published || fields.Access !== "Gated" || !fields["File URL"]) {
      return NextResponse.json({ error: "This resource is no longer available." }, { status: 404 });
    }
    source = `E-Resource: ${fields.Title ?? resourceId}`;
    fileUrl = fields["File URL"];
  }

  try {
    await createRecord("Subscribers", { Email: email, Source: source });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Couldn't save that right now. Try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, ...(fileUrl ? { fileUrl } : {}) });
}
