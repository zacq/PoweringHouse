import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ventureInputSchema } from "@/lib/validations";

export async function GET() {
  const ventures = await prisma.venture.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(ventures);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = ventureInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const venture = await prisma.venture.create({
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

  return NextResponse.json(venture, { status: 201 });
}
