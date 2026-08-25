import { NextRequest, NextResponse } from "next/server";
import type { EResourceAccess } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { eResourceInputSchema } from "@/lib/validations";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const resource = await prisma.eResource.findUnique({ where: { id: params.id } });
  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(resource);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.eResource.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = eResourceInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const resource = await prisma.eResource.update({
    where: { id: params.id },
    data: {
      title: data.title,
      description: data.description,
      fileUrl: data.fileUrl,
      access: data.access as EResourceAccess,
      published: data.published,
    },
  });

  return NextResponse.json(resource);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.eResource.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.eResource.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
