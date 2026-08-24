import Link from "next/link";
import { partnerById } from "@/lib/partners";
import { RecentLetters } from "./recent-letters";

/**
 * "Your Market Space" — the four doors. See content-map v2 §3.5.
 * Doors 2 and 4 link to /ways-we-help and /universe-of-freedom, which ship
 * in Phases B and C of this build; they 404 until then, by design of the
 * phased delivery, not by oversight.
 */
export function MarketSpaceGrid() {
  const refill = partnerById("refill");

  return (
    <section className="themes" aria-labelledby="market-space-title">
      <div className="themes__head">
        <h2 id="market-space-title">Your Market Space</h2>
        <p>Four doors in. Pick whichever fits where you are right now.</p>
      </div>
      <div className="themes__grid">
        <div className="theme market-space__door">
          <span className="theme__tag">01 · Newsletter</span>
          <h3>
            <Link href="/blog">Seed of Power Newsletter</Link>
          </h3>
          {/* DRAFT: content-map v2 §3.5 */}
          <p>Raw thinking, every fourth night. Two or three letters shown here.</p>
          <RecentLetters />
        </div>

        <Link className="theme" href="/ways-we-help">
          <span className="theme__tag">02 · Ways We Help</span>
          <h3>Start Your Micro Biz Growth Journey</h3>
          <p>Six ways to work together, from free to one-to-one.</p>
        </Link>

        <a className="theme" href={refill.url}>
          <span className="theme__tag">03 · Operations</span>
          <h3>Business Operation Excellence</h3>
          <p>Eliminate wastes · Build productivity of people and machines · Compound growth through efficiency</p>
        </a>

        <Link className="theme" href="/universe-of-freedom">
          <span className="theme__tag">04 · Resources</span>
          <h3>Resources &amp; Testimonials</h3>
          <p>Partnerships, e-resources, and the businesses that are growing.</p>
        </Link>
      </div>
    </section>
  );
}
