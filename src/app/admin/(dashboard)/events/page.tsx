import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { startsAt: "asc" } });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.6rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Events</h1>
        <Link className="btn btn--primary" href="/admin/events/new">
          New event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="admin-empty">No events yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>When</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id}>
                <td>
                  <Link href={`/admin/events/${ev.id}/edit`}>{ev.title}</Link>
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }).format(ev.startsAt)}
                </td>
                <td>
                  <span className="pill" data-state={ev.published ? "published" : "draft"}>
                    {ev.published ? "Published" : "Draft"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
