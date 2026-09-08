import type { Metadata } from "next";
import Link from "next/link";
import { ToolsGrid } from "@/components/tools-grid";
import { EcommerceCards } from "@/components/ecommerce-cards";

export const metadata: Metadata = {
  title: "Market Place",
  description: "Where intent turns into access.",
};

export default function MarketPlacePage() {
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

      <section className="themes" aria-labelledby="six-pack-title">
        <div className="themes__head">
          <h2 id="six-pack-title">6 Pack Packages</h2>
          <p>Find the offer that fits where your business is right now.</p>
        </div>
        <div className="themes__grid">
          <Link className="theme" href="/ways-we-help">
            <span className="theme__tag">6 Pack Packages</span>
            <h3>Ways We Help</h3>
            <p>Six ways to work with us, from free tools to 1:1 coaching.</p>
            <span className="theme__count">See all offers</span>
          </Link>
          <Link className="theme" href="/ways-we-help">
            <span className="theme__tag">Self-paced</span>
            <h3>Self-Paced Master Classes</h3>
            <p>
              Build your business through continuous learning — well-designed
              programs covering Elements of Business Design and Pillars of
              Growth. Connect with the self-paced platform on free content.
            </p>
            <span className="theme__count">Explore in Ways We Help</span>
          </Link>
        </div>
      </section>
    </>
  );
}
