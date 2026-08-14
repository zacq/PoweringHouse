import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

  const { email, website } = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend success without persisting.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const existing = await prisma.subscriber.findUnique({ where: { email } });
  if (existing) {
    if (existing.unsubscribedAt) {
      await prisma.subscriber.update({
        where: { email },
        data: { unsubscribedAt: null },
      });
    }
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }

  await prisma.subscriber.create({ data: { email } });
  return NextResponse.json({ ok: true, alreadySubscribed: false });
}
