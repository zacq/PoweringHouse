import Link from "next/link";
import { partnerById } from "@/lib/partners";

/**
 * The two offer lines the whole recommendation logic hangs off. See
 * content-map v2 §1 "Two offer lines" and §3.3.
 *
 * NOTE: the Business Growth Design card links to /ways-we-help, which
 * ships in Phase B of this build. Until that phase is live, this link
 * 404s — flagged to the user, not an oversight.
 */
export function OfferLineCards() {
  const refill = partnerById("refill");

  return (
    <section className="themes" aria-labelledby="offer-lines-title">
      <div className="themes__head">
        <h2 id="offer-lines-title">Choose your line</h2>
        <p>Two ways to work together, split by what your business needs right now.</p>
      </div>
      <div className="themes__grid">
        <Link className="theme" id="growth-design" href="/ways-we-help">
          <span className="theme__tag">0 – KES 10M</span>
          <h3>Business Growth Design</h3>
          {/* DRAFT: content-map v2 §3.3 */}
          <p>Design the business so it can grow. The offer, the model, the customer, the plan &mdash; decided before you scale them.</p>
          <span className="theme__count">Ways We Help</span>
        </Link>
        <a className="theme" id="operations-excellence" href={refill.url}>
          <span className="theme__tag">KES 10M+</span>
          <h3>Operations Excellence</h3>
          <p>Eliminate waste. Build the productivity of your people and your machines. Compound growth through efficiency.</p>
          <span className="theme__count">{refill.name}</span>
        </a>
      </div>
    </section>
  );
}
