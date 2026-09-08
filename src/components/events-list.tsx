import { prisma } from "@/lib/prisma";

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
  const events = await prisma.event.findMany({
    where: { published: true, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
  });

  if (events.length === 0) {
    return <p className="admin-empty">Nothing on the calendar yet — check back soon.</p>;
  }

  return (
    <div className="themes__grid">
      {events.map((ev) => (
        <div className="theme" key={ev.id}>
          <span className="theme__tag">{formatDate(ev.startsAt)}</span>
          <h3>{ev.title}</h3>
          {ev.description && <p>{ev.description}</p>}
          {ev.location && <span className="theme__count">{ev.location}</span>}
          {ev.link && (
            <a
              className="btn btn--ghost"
              href={ev.link}
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
