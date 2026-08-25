import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ventureInputSchema } from "@/lib/validations";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const venture = await prisma.venture.findUnique({ where: { id: params.id } });
  if (!venture) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(venture);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.venture.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = ventureInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const venture = await prisma.venture.update({
    where: { id: params.id },
    data: {
      businessName: data.businessName,
      sector: data.sector,
      before: data.before,
      after: data.after,
      metricLabel: data.metricLabel,
      metricBefore: data.metricBefore,
      metricAfter: data.metricAfter,
      consentOnFile: data.consentOnFile,
      photo: data.photo || null,
      published: data.published,
      order: data.order,
    },
  });

  return NextResponse.json(venture);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.venture.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.venture.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
