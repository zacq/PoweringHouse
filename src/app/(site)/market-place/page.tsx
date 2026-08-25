import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { OfferCard } from "@/components/offer-card";
import { ToolsGrid } from "@/components/tools-grid";
import { EcommerceCards } from "@/components/ecommerce-cards";

export const metadata: Metadata = {
  title: "Market Place",
  description: "Where intent turns into access.",
};

export const revalidate = 60;

export default async function MarketPlacePage() {
  const offers = await prisma.offer.findMany({
    where: { published: true, showInMarketPlace: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <header className="blog-header">
        <h1>Market Place</h1>
        {/* DRAFT: content-map v2 §7, verbatim */}
        <p>
          We sat down for months, listening to and watching what growing an
          enterprise actually looks like. Some are starting. Some are midway
          and stagnated. Some are tired. That journey can be shortened, and
          it can be more enjoyable. It takes your readiness to change your
          mind, and the discipline of continuous learning.
        </p>
      </header>

      <section className="themes" id="tools" aria-labelledby="tools-title">
        <div className="themes__head">
          <h2 id="tools-title">Productivity Tools &amp; E-Resources</h2>
          <p>Find the support tools we have for you.</p>
        </div>
        <ToolsGrid />
      </section>

      <section className="themes" aria-labelledby="ecommerce-title">
        <div className="themes__head">
          <h2 id="ecommerce-title">E-Commerce</h2>
        </div>
        <EcommerceCards />
      </section>

      {offers.length > 0 && (
        <section className="themes" aria-labelledby="ways-title">
          <div className="themes__head">
            <h2 id="ways-title">Ways We Help</h2>
            <p>The same offers as Ways We Help — pick whichever fits.</p>
          </div>
          <div className="themes__grid">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
