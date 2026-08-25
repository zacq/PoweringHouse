import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OfferForm } from "@/components/admin/offer-form";

export default async function EditOfferPage({ params }: { params: { id: string } }) {
  const offer = await prisma.offer.findUnique({ where: { id: params.id } });
  if (!offer) notFound();

  return (
    <>
      <h1>Edit offer</h1>
      <OfferForm
        initial={{
          id: offer.id,
          slug: offer.slug,
          name: offer.name,
          offerLine: offer.offerLine,
          order: offer.order,
          isFree: offer.isFree,
          showInMarketPlace: offer.showInMarketPlace,
          promise: offer.promise,
          whoFor: offer.whoFor,
          whoNotFor: offer.whoNotFor,
          whatHappens: offer.whatHappens,
          commitment: offer.commitment ?? "",
          price: offer.price ?? "",
          priceIsDraft: offer.priceIsDraft,
          story: offer.story ?? "",
          storyIsDraft: offer.storyIsDraft,
          ctaType: offer.ctaType,
          ctaLabel: offer.ctaLabel ?? "",
          externalUrl: offer.externalUrl ?? "",
          published: offer.published,
        }}
      />
    </>
  );
}
