import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventInputSchema } from "@/lib/validations";

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { startsAt: "asc" } });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = eventInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description || null,
      startsAt: data.startsAt,
      location: data.location || null,
      link: data.link || null,
      published: data.published,
    },
  });

  return NextResponse.json(event, { status: 201 });
}
