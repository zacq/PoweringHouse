import { NextRequest, NextResponse } from "next/server";
import type { EnquiryStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES: EnquiryStatus[] = ["NEW", "CONTACTED", "CLOSED"];

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.enquiry.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const enquiry = await prisma.enquiry.update({
    where: { id: params.id },
    data: { status: body.status as EnquiryStatus },
  });

  return NextResponse.json(enquiry);
}
