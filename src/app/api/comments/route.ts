import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { commentInputSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = commentInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { postId, authorName, authorEmail, body: commentBody, website } = parsed.data;

  // Honeypot: bots fill hidden fields. Pretend success without persisting.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const post = await prisma.post.findFirst({ where: { id: postId, published: true } });
  if (!post) {
    return NextResponse.json({ error: "This post no longer accepts comments." }, { status: 404 });
  }

  await prisma.comment.create({
    data: { postId, authorName, authorEmail, body: commentBody, approved: false },
  });

  return NextResponse.json({ ok: true });
}
