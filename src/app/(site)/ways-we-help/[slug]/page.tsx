import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EnquiryForm } from "@/components/enquiry-form";

const LINE_LABELS: Record<string, string> = {
  BUSINESS_GROWTH_DESIGN: "Business Growth Design",
  OPERATIONS_EXCELLENCE: "Operations Excellence",
  BOTH: "Business Growth Design & Operations Excellence",
};

export const revalidate = 60;

async function getOffer(slug: string) {
  return prisma.offer.findFirst({ where: { slug, published: true } });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const offer = await getOffer(params.slug);
  if (!offer) return {};
  return { title: offer.name, description: offer.promise };
}

export default async function OfferDetailPage({ params }: { params: { slug: string } }) {
  const offer = await getOffer(params.slug);
  if (!offer) notFound();

  return (
    <article className="post">
      <div className="post__meta">
        <span>{LINE_LABELS[offer.offerLine]}</span>
        {offer.isFree && <span>Free</span>}
      </div>
      <h1>{offer.name}</h1>
      <div className="post__body">
        <p>{offer.promise}</p>

        <h2>Who it&apos;s for</h2>
        <p>{offer.whoFor}</p>

        <h2>Who it&apos;s not for</h2>
        <p>{offer.whoNotFor}</p>

        <h2>What happens</h2>
        <p>{offer.whatHappens}</p>

        {offer.commitment && (
          <>
            <h2>Commitment</h2>
            <p>{offer.commitment}</p>
          </>
        )}

        {offer.price && (
          <>
            <h2>Price</h2>
            <p>{offer.price}</p>
          </>
        )}

        {offer.story && (
          <>
            <h2>One story</h2>
            <p>{offer.story}</p>
          </>
        )}
      </div>

      <div className="actions" style={{ marginTop: "2rem" }}>
        {offer.ctaType === "ENQUIRY_FORM" && (
          <EnquiryForm offerId={offer.id} offerName={offer.name} />
        )}
        {offer.ctaType === "EXTERNAL_LINK" && offer.externalUrl && (
          <a className="btn btn--primary" href={offer.externalUrl}>
            {offer.ctaLabel || "Learn more"}
          </a>
        )}
        {offer.ctaType === "INTERNAL_LINK" && offer.externalUrl && (
          <Link className="btn btn--primary" href={offer.externalUrl}>
            {offer.ctaLabel || "Learn more"}
          </Link>
        )}
      </div>
    </article>
  );
}
