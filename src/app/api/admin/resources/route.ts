import { NextRequest, NextResponse } from "next/server";
import type { EResourceAccess } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { eResourceInputSchema } from "@/lib/validations";

export async function GET() {
  const resources = await prisma.eResource.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json(resources);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = eResourceInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const resource = await prisma.eResource.create({
    data: {
      title: data.title,
      description: data.description,
      fileUrl: data.fileUrl,
      access: data.access as EResourceAccess,
      published: data.published,
    },
  });

  return NextResponse.json(resource, { status: 201 });
}
