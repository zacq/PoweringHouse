import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { OfferCard } from "@/components/offer-card";

export const metadata: Metadata = {
  title: "Ways We Help",
  description: "Six ways to work together, from free to one-to-one.",
};

export const revalidate = 60;

export default async function WaysWeHelpPage() {
  const offers = await prisma.offer.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="themes" aria-labelledby="ways-title">
      <div className="themes__head">
        <h2 id="ways-title">Ways We Help</h2>
        {/* DRAFT: content-map v2 §4 intro copy not yet given verbatim */}
        <p>Six ways to work together, from free to one-to-one.</p>
      </div>
      {offers.length === 0 ? (
        <p className="admin-empty">Nothing published yet — check back soon.</p>
      ) : (
        <div className="themes__grid">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </section>
  );
}
