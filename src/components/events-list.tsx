import { listRecords } from "@/lib/airtable";

interface EventFields {
  Title: string;
  Description: string;
  "Starts At": string;
  Location: string;
  Link: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export async function EventsList() {
  const records = await listRecords<EventFields>("Events", {
    filterByFormula: "AND({Published}, IS_AFTER({Starts At}, NOW()))",
    sort: [{ field: "Starts At", direction: "asc" }],
  });
  // The fetch is cached for an hour, so re-check "upcoming" at render time.
  const now = Date.now();
  const events = records
    .filter((r) => r.fields.Title && r.fields["Starts At"])
    .map((r) => ({ id: r.id, ...r.fields, startsAt: new Date(r.fields["Starts At"]!) }))
    .filter((ev) => ev.startsAt.getTime() >= now);

  if (events.length === 0) {
    return <p className="admin-empty">Nothing on the calendar yet — check back soon.</p>;
  }

  return (
    <div className="themes__grid">
      {events.map((ev) => (
        <div className="theme" key={ev.id}>
          <span className="theme__tag">{formatDate(ev.startsAt)}</span>
          <h3>{ev.Title}</h3>
          {ev.Description && <p>{ev.Description}</p>}
          {ev.Location && <span className="theme__count">{ev.Location}</span>}
          {ev.Link && (
            <a
              className="btn btn--ghost"
              href={ev.Link}
              style={{ marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
            >
              Details
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
