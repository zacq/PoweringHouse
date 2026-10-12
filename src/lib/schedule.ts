import { listRecords } from "./airtable";

export type Programme = "Micro Business Growth Design" | "Executive Breakfast" | "Cohort Training";

export interface ProgrammeSchedule {
  date: string;
  venue: string;
  next: string;
}

interface EventFields {
  Title: string;
  "Starts At": string;
  "Date Label": string;
  Location: string;
}

const TBC = "To be confirmed";

/** An event's display date: its "Date Label" when set, else Starts At in Nairobi time. */
export function eventDate(fields: { "Starts At"?: string; "Date Label"?: string }): string {
  if (fields["Date Label"]?.trim()) return fields["Date Label"].trim();
  return fields["Starts At"] ? formatDate(fields["Starts At"]) : TBC;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(new Date(iso));
}

/**
 * Upcoming sessions for a programme, from the Airtable Events table (Programme field, Published,
 * still in the future). The earliest gives Date and Venue; the one after it is "Next".
 */
export async function getProgrammeSchedule(programme: Programme): Promise<ProgrammeSchedule> {
  const records = await listRecords<EventFields>("Events", {
    filterByFormula: `AND({Published}, {Programme}='${programme}', IS_AFTER({Starts At}, NOW()))`,
    sort: [{ field: "Starts At", direction: "asc" }],
  });
  const now = Date.now();
  const upcoming = records
    .filter((r) => r.fields["Starts At"] && new Date(r.fields["Starts At"]).getTime() >= now)
    .map((r) => r.fields);
  const [first, second] = upcoming;
  return {
    date: first ? eventDate(first) : TBC,
    venue: first?.Location || TBC,
    next: second ? `${eventDate(second)}${second.Location ? ` · ${second.Location}` : ""}` : TBC,
  };
}

export async function getSchedules(): Promise<Record<Programme, ProgrammeSchedule>> {
  const [mbgd, eb, ct] = await Promise.all([
    getProgrammeSchedule("Micro Business Growth Design"),
    getProgrammeSchedule("Executive Breakfast"),
    getProgrammeSchedule("Cohort Training"),
  ]);
  return { "Micro Business Growth Design": mbgd, "Executive Breakfast": eb, "Cohort Training": ct };
}
