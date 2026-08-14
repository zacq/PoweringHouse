import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailSendingEnabled, sendPostNotification } from "@/lib/email";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!emailSendingEnabled) {
    return NextResponse.json(
      { error: "Email sending isn't configured yet (RESEND_API_KEY missing)." },
      { status: 400 }
    );
  }

  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post || !post.published) {
    return NextResponse.json({ error: "Post not found or not published." }, { status: 404 });
  }

  const subscribers = await prisma.subscriber.findMany({
    where: { unsubscribedAt: null },
    select: { email: true },
  });
  if (subscribers.length === 0) {
    return NextResponse.json({ error: "No active subscribers to notify." }, { status: 400 });
  }

  const origin = process.env.NEXTAUTH_URL || req.nextUrl.origin;
  const result = await sendPostNotification({
    to: subscribers.map((s) => s.email),
    subject: `New: ${post.title}`,
    postTitle: post.title,
    postExcerpt: post.excerpt,
    postUrl: `${origin}/blog/${post.slug}`,
  });

  if (result.skipped) {
    return NextResponse.json({ error: "Email sending isn't configured." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, sent: result.sent });
}
