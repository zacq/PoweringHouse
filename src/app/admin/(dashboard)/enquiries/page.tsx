import { prisma } from "@/lib/prisma";
import { EnquiryInbox } from "@/components/admin/enquiry-inbox";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { offer: { select: { name: true, slug: true } } },
  });

  const serialized = enquiries.map((e) => ({ ...e, createdAt: e.createdAt.toISOString() }));

  return (
    <>
      <h1>Enquiries</h1>
      <EnquiryInbox enquiries={serialized} />
    </>
  );
}
