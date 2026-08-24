import { Hero } from "@/components/hero";
import { LifecycleBand } from "@/components/lifecycle-band";
import { OfferLineCards } from "@/components/offer-line-cards";
import { GachokaBio } from "@/components/gachoka-bio";
import { MarketSpaceGrid } from "@/components/market-space-grid";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <LifecycleBand />
      <OfferLineCards />
      <GachokaBio />
      <MarketSpaceGrid />
    </>
  );
}
