import { NextRequest, NextResponse } from "next/server";
import type { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { postInputSchema } from "@/lib/validations";

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = postInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const existing = await prisma.post.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json({ error: "That slug is already taken." }, { status: 409 });
  }

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category as Category,
      published: data.published,
      publishedAt: data.published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
