import { listRecords } from "@/lib/airtable";
import { EResourceGate } from "./eresource-gate";
import { LeadMagnetModal } from "./lead-magnet-modal";
import { CINA_CRAFTSMANSHIP } from "@/lib/cina";

const SECTORS = ["Tailoring", "Warehousing", "Transport", "Manufacturing", "Wholesale"];

/** Featured CINA guide — always shown; gated behind name + email, then downloads. */
function FeaturedResource() {
  return (
    <div className="eres-featured">
      <div className="eres-featured__cover" aria-hidden="true">
        <span>CINA</span>
        <strong>Craftsmanship Legacy</strong>
        <em>The Continuous Improvement Model</em>
      </div>
      <div>
        <span className="theme__tag">Free guide · 15 pages · Email required</span>
        <h3>{CINA_CRAFTSMANSHIP.title}</h3>
        <p>{CINA_CRAFTSMANSHIP.theme} A simple road map to reclaim and refill — seven deliberate stages from a natural choice to a legacy of pride and growth.</p>
        <ul className="eres-featured__chips">
          {SECTORS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <LeadMagnetModal content={CINA_CRAFTSMANSHIP} label="Get the free guide" className="btn btn--primary" />
      </div>
    </div>
  );
}

interface EResourceFields {
  Title: string;
  Description: string;
  "File URL": string;
  Access: "Open" | "Gated";
  "Published At": string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** content-map v2 §4 — "show the date of the most recent upload so the promise is visibly kept." */
export async function EResourceList() {
  const resources = (
    await listRecords<EResourceFields>("E-Resources", {
      filterByFormula: "{Published}",
      sort: [{ field: "Published At", direction: "desc" }],
    })
  ).filter((r) => r.fields.Title && r.fields["File URL"]);

  if (resources.length === 0) {
    return <FeaturedResource />;
  }

  const latest = resources[0].fields["Published At"];

  return (
    <div>
      <FeaturedResource />
      {latest && (
        <p style={{ fontSize: ".82rem", color: "var(--bone-dim)", marginBottom: "1.4rem" }}>
          Most recent upload: {formatDate(new Date(latest))}
        </p>
      )}
      <div className="themes__grid">
        {resources.map(({ id, fields: r }) => (
          <div className="theme" key={id}>
            <span className="theme__tag">{r.Access === "Gated" ? "Email required" : "Open"}</span>
            <h3>{r.Title}</h3>
            <p>{r.Description}</p>
            {r.Access !== "Gated" ? (
              <a
                className="btn btn--ghost"
                href={r["File URL"]}
                style={{ marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
              >
                Get it
              </a>
            ) : (
              <EResourceGate resourceId={id} title={r.Title!} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
