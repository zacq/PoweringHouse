import Link from "next/link";
import { Hero } from "@/components/hero";
import { LifecycleBand } from "@/components/lifecycle-band";
import { OfferLineCards } from "@/components/offer-line-cards";
import { GachokaBio } from "@/components/gachoka-bio";
import { ToolsGrid } from "@/components/tools-grid";
import { MarketSpaceGrid } from "@/components/market-space-grid";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <LifecycleBand />
      <OfferLineCards />
      <GachokaBio />

      {/* One tool as the primary lead magnet, ahead of the Free Start Pack offer — content-map v2 §7.1 */}
      <section className="themes" aria-labelledby="lead-magnet-title">
        <div className="themes__head">
          <h2 id="lead-magnet-title">Start with a real tool</h2>
          <p>
            Free to take, useful today.{" "}
            <Link href="/market-place#tools">See all the tools →</Link>
          </p>
        </div>
        <ToolsGrid limit={1} />
      </section>

      <MarketSpaceGrid />
    </>
  );
}
