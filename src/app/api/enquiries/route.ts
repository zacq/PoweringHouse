import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquiryInputSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = enquiryInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { offerId, fullName, email, phone, businessName, message, website } = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend success without persisting.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const offer = await prisma.offer.findFirst({ where: { id: offerId, published: true } });
  if (!offer) {
    return NextResponse.json({ error: "This offer is no longer accepting enquiries." }, { status: 404 });
  }

  await prisma.enquiry.create({
    data: { offerId, fullName, email, phone: phone || null, businessName: businessName || null, message: message || null },
  });

  return NextResponse.json({ ok: true });
}
