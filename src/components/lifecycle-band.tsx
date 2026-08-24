import { LIFECYCLE_STAGES } from "@/lib/lifecycle";

/**
 * The home page's primary self-location device: four life-cycle stages,
 * each linking down to the matching offer-line card. See content-map v2
 * §1 "The map" and §3.2.
 */
export function LifecycleBand() {
  return (
    <section className="themes" id="lifecycle" aria-labelledby="lifecycle-title">
      <div className="themes__head">
        <h2 id="lifecycle-title">Find yourself</h2>
        {/* DRAFT: content-map v2 §3.2, verbatim */}
        <p>Every business moves through four stages. The work is different at each one. Find yours.</p>
      </div>
      <div className="themes__grid">
        {LIFECYCLE_STAGES.map((stage) => (
          <a className="theme" key={stage.id} href={`#${stage.offerLineAnchor}`}>
            <span className="theme__tag">{stage.revenueRange}</span>
            <h3>{stage.label}</h3>
            <p>{stage.constraintCopy}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
