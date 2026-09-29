import { listRecords } from "@/lib/airtable";
import { EResourceGate } from "./eresource-gate";

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
    return <p className="admin-empty">Nothing uploaded yet — check back soon.</p>;
  }

  const latest = resources[0].fields["Published At"];

  return (
    <div>
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
