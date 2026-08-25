import { NextRequest, NextResponse } from "next/server";
import type { OfferCtaType, OfferLine } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { offerInputSchema } from "@/lib/validations";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const offer = await prisma.offer.findUnique({ where: { id: params.id } });
  if (!offer) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(offer);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.offer.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = offerInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  if (data.slug !== existing.slug) {
    const slugTaken = await prisma.offer.findUnique({ where: { slug: data.slug } });
    if (slugTaken) {
      return NextResponse.json({ error: "That slug is already taken." }, { status: 409 });
    }
  }

  const offer = await prisma.offer.update({
    where: { id: params.id },
    data: {
      slug: data.slug,
      name: data.name,
      offerLine: data.offerLine as OfferLine,
      order: data.order,
      isFree: data.isFree,
      showInMarketPlace: data.showInMarketPlace,
      promise: data.promise,
      whoFor: data.whoFor,
      whoNotFor: data.whoNotFor,
      whatHappens: data.whatHappens,
      commitment: data.commitment || null,
      price: data.price || null,
      priceIsDraft: data.priceIsDraft,
      story: data.story || null,
      storyIsDraft: data.storyIsDraft,
      ctaType: data.ctaType as OfferCtaType,
      ctaLabel: data.ctaLabel || null,
      externalUrl: data.externalUrl || null,
      published: data.published,
    },
  });

  return NextResponse.json(offer);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.offer.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.offer.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
