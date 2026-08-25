import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { offer: { select: { name: true, slug: true } } },
  });
  return NextResponse.json(enquiries);
}
