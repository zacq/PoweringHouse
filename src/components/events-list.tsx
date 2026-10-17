import { listRecords } from "@/lib/airtable";
import { eventDate, getSchedules, type Programme } from "@/lib/schedule";
import { LeadMagnetModal, type LeadMagnet } from "./lead-magnet-modal";
import { CINA_BREAKFAST, CINA_ESSENTIALS, CINA_ZOOM } from "@/lib/cina";
import { PH_COACHING } from "@/lib/offers";

interface EventFields {
  Title: string;
  Description: string;
  "Starts At": string;
  "Date Label": string;
  Location: string;
  Link: string;
  Programme?: Programme;
}

/** The popup each programme's events open — the same ones used on the home page and /cina. */
const PROGRAMME_POPUP: Record<Programme, LeadMagnet> = {
  "Free Monthly Zooms": CINA_ZOOM,
  "Executive Breakfast": CINA_BREAKFAST,
  "Cohort Training": CINA_ESSENTIALS,
  "Micro Business Growth Design": PH_COACHING,
};

const BTN_STYLE = { marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" };

export async function EventsList() {
  const [records, schedules] = await Promise.all([
    listRecords<EventFields>("Events", {
      filterByFormula: "AND({Published}, IS_AFTER({Starts At}, NOW()))",
      sort: [{ field: "Starts At", direction: "asc" }],
    }),
    getSchedules(),
  ]);
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
      {events.map((ev) => {
        const programme = ev.Programme;
        const popup = programme ? PROGRAMME_POPUP[programme] : undefined;
        return (
          <div className="theme" key={ev.id}>
            <span className="theme__tag">{eventDate(ev)}</span>
            <h3>{ev.Title}</h3>
            {ev.Description && <p>{ev.Description}</p>}
            {ev.Location && <span className="theme__count">{ev.Location}</span>}
            {popup && programme ? (
              <div style={BTN_STYLE}>
                <LeadMagnetModal
                  content={popup}
                  schedule={schedules[programme]}
                  label="Register"
                  className="btn btn--ghost event__register"
                />
              </div>
            ) : (
              ev.Link && (
                <a className="btn btn--ghost" href={ev.Link} style={BTN_STYLE}>
                  {ev.Link.includes("forms.") ? "Register" : "Details"}
                </a>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
