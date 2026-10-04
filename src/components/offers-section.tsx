import Link from "next/link";
import { LeadMagnetModal } from "./lead-magnet-modal";
import { RegisterModal } from "./register-modal";
import { CINA_BREAKFAST, CINA_CRAFTSMANSHIP } from "@/lib/cina";
import { OFFER_TRACKS, PH_COACHING, type Offer, type OfferAction } from "@/lib/offers";

function Action({ offer, action, primary }: { offer: Offer; action: OfferAction; primary: boolean }) {
  const className = `btn ${primary ? "btn--primary" : "btn--ghost"} offer__btn`;
  switch (action.kind) {
    case "link":
      return (
        <Link className={className} href={action.href}>
          {action.label} <span aria-hidden="true">→</span>
        </Link>
      );
    case "craftsmanship":
      return <LeadMagnetModal content={CINA_CRAFTSMANSHIP} label={action.label} className={className} />;
    case "breakfast":
      return <LeadMagnetModal content={CINA_BREAKFAST} label={action.label} className={className} />;
    case "coaching":
      return <LeadMagnetModal content={PH_COACHING} label={action.label} className={className} />;
    case "quote":
      return (
        <RegisterModal label={action.label} subject={`Quote request — ${offer.title}`} className={className}>
          {action.label} <span aria-hidden="true">→</span>
        </RegisterModal>
      );
  }
}

/** Home page: every offer, by track, with its price (or "Price on request") and next step. */
export function OffersSection() {
  return (
    <section className="offers" id="offers" aria-labelledby="offers-title">
      <div className="themes__head">
        <h2 id="offers-title">What we offer</h2>
        <p>Start free, then go deeper. Paid offers come with a price quote.</p>
      </div>
      <div className="offers__tracks">
        {OFFER_TRACKS.map((track) => (
          <div key={track.id} className="offers__track">
            <div className="offers__track-head">
              <h3>{track.title}</h3>
              <p>{track.blurb}</p>
              <Link href={track.more.href}>
                {track.more.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ol className="offers__list">
              {track.offers.map((offer, i) => (
                <li key={offer.id} className="offer" data-paid={offer.paid || undefined}>
                  <div className="offer__top">
                    <span className="offer__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="offer__badge" data-paid={offer.paid || undefined}>
                      {offer.badge}
                    </span>
                  </div>
                  <h4>{offer.title}</h4>
                  <p>{offer.description}</p>
                  <div className="offer__price">
                    <strong>{offer.price ?? (offer.paid ? "Price on request" : "Free")}</strong>
                    {offer.priceNote && <span>{offer.priceNote}</span>}
                  </div>
                  <div className="offer__actions">
                    {offer.actions.map((action, j) => (
                      <Action key={action.label} offer={offer} action={action} primary={j === 0} />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
