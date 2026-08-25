import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VentureForm } from "@/components/admin/venture-form";

export default async function EditVenturePage({ params }: { params: { id: string } }) {
  const venture = await prisma.venture.findUnique({ where: { id: params.id } });
  if (!venture) notFound();

  return (
    <>
      <h1>Edit venture</h1>
      <VentureForm
        initial={{
          id: venture.id,
          businessName: venture.businessName,
          sector: venture.sector,
          before: venture.before,
          after: venture.after,
          metricLabel: venture.metricLabel,
          metricBefore: venture.metricBefore,
          metricAfter: venture.metricAfter,
          consentOnFile: venture.consentOnFile,
          photo: venture.photo ?? "",
          published: venture.published,
          order: venture.order,
        }}
      />
    </>
  );
}
