import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const where = status === "pending" ? { approved: false } : status === "approved" ? { approved: true } : {};

  const comments = await prisma.comment.findMany({
    where,
    orderBy: { createdAt: status === "pending" ? "asc" : "desc" },
    include: { post: { select: { title: true, slug: true } } },
  });

  return NextResponse.json(comments);
}
