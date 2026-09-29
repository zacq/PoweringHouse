import { listRecords } from "@/lib/airtable";

interface VentureFields {
  "Business Name": string;
  Sector: string;
  After: string;
  "Metric Label": string;
  "Metric Before": string;
  "Metric After": string;
}

/** "Ventures That Are Growing" — content-map v2 §6, developed from the doc's testimonials note. */
export async function VenturesGrid() {
  const ventures = (
    await listRecords<VentureFields>("Ventures", {
      filterByFormula: "{Published}",
      sort: [{ field: "Order", direction: "asc" }],
    })
  ).filter((v) => v.fields["Business Name"]);

  if (ventures.length === 0) {
    return <p className="admin-empty">Nothing here yet — check back soon.</p>;
  }

  return (
    <div className="themes__grid">
      {ventures.map(({ id, fields: v }) => (
        <div className="theme" key={id}>
          <span className="theme__tag">{v.Sector}</span>
          <h3>{v["Business Name"]}</h3>
          <p>{v.After}</p>
          {v["Metric Label"] && (
            <span className="theme__count">
              {v["Metric Label"]}: {v["Metric Before"]} → {v["Metric After"]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
