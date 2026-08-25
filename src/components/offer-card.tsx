import Link from "next/link";
import type { Offer } from "@prisma/client";

const LINE_LABELS: Record<string, string> = {
  BUSINESS_GROWTH_DESIGN: "Growth Design",
  OPERATIONS_EXCELLENCE: "Operations Excellence",
  BOTH: "Both lines",
};

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link className="theme" href={`/ways-we-help/${offer.slug}`}>
      <span className="theme__tag">{offer.isFree ? "Free" : LINE_LABELS[offer.offerLine]}</span>
      <h3>{offer.name}</h3>
      <p>{offer.promise}</p>
      <span className="theme__count">Learn more</span>
    </Link>
  );
}
