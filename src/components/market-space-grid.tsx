import Link from "next/link";
import { partnerById } from "@/lib/partners";

/** "Your Market Space" — the four doors. See content-map v2 §3.5. */
export function MarketSpaceGrid() {
  const refill = partnerById("refill");

  return (
    <section className="themes themes--light" aria-labelledby="market-space-title">
      <div className="themes__head">
        <h2 id="market-space-title">Your Market Space</h2>
        <p>Four doors in. Pick whichever fits where you are right now.</p>
      </div>
      <div className="themes__grid line-cards line-cards--four">
        <Link className="theme line-card" href="/blog">
          <span className="theme__tag">01 · Newsletter</span>
          <h3>Seed of Power Newsletter</h3>
          {/* DRAFT: content-map v2 §3.5 */}
          <p>Raw thinking, every fourth night.</p>
          <span className="line-card__cta">
            Read the newsletter <span aria-hidden="true">→</span>
          </span>
        </Link>

        <Link className="theme line-card" href="/ways-we-help">
          <span className="theme__tag">02 · Ways We Help</span>
          <h3>Start Your Micro Biz Growth Journey</h3>
          <p>Six ways to work together, from free to one-to-one.</p>
          <span className="line-card__cta">
            See the ways we help <span aria-hidden="true">→</span>
          </span>
        </Link>

        <Link className="theme line-card" href={refill.url}>
          <span className="theme__tag">03 · Operations</span>
          <h3>Business Operation Excellence</h3>
          <p>Eliminate wastes · Build productivity of people and machines · Compound growth through efficiency</p>
          <span className="line-card__cta">
            Explore CINA <span aria-hidden="true">→</span>
          </span>
        </Link>

        <Link className="theme line-card" href="/universe-of-freedom">
          <span className="theme__tag">04 · Resources</span>
          <h3>Resources &amp; Testimonials</h3>
          <p>Partnerships, e-resources, and the businesses that are growing.</p>
          <span className="line-card__cta">
            Browse resources <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
