import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

  await prisma.contactMessage.create({
    data: { fullName, email, phone: phone || null, subject: subject || null, message: message || null },
  });

  return NextResponse.json({ ok: true });
}
