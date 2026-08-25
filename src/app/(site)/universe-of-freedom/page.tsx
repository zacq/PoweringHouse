import type { Metadata } from "next";
import { PartnersGrid } from "@/components/partners-grid";
import { EResourceList } from "@/components/eresource-list";
import { VenturesGrid } from "@/components/ventures-grid";

export const metadata: Metadata = {
  title: "Universe of Freedom",
  description: "Partnerships, resources, and the businesses that are growing.",
};

export const revalidate = 60;

export default function UniverseOfFreedomPage() {
  return (
    <>
      <header className="blog-header">
        <h1>Universe of Freedom</h1>
        {/* DRAFT: content-map v2 §6, verbatim */}
        <p>
          Entrepreneurship is more about discovering the universe you work
          with than about operations alone. Universe discovery = growth =
          freedom.
        </p>
      </header>

      <section className="themes" aria-labelledby="partners-title">
        <div className="themes__head">
          <h2 id="partners-title">Partnerships</h2>
          <p>The platforms and practices we work alongside.</p>
        </div>
        <PartnersGrid />
      </section>

      <section className="themes" aria-labelledby="resources-title">
        <div className="themes__head">
          <h2 id="resources-title">E-Resources</h2>
          {/* DRAFT: content-map v2 §6, verbatim */}
          <p>Keep learning specific trends through our monthly uploads.</p>
        </div>
        <EResourceList />
      </section>

      <section className="themes" aria-labelledby="ventures-title">
        <div className="themes__head">
          <h2 id="ventures-title">Ventures That Are Growing</h2>
          {/* DRAFT: content-map v2 §6 recommends developing testimonials into this */}
          <p>Real businesses, real numbers — stories that also motivate us for this journey.</p>
        </div>
        <VenturesGrid />
      </section>
    </>
  );
}
