import type { Subscriber } from "@prisma/client";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  if (subscribers.length === 0) {
    return <p className="admin-empty">No subscribers yet.</p>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Subscribed</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {subscribers.map((s) => (
          <tr key={s.id}>
            <td>{s.email}</td>
            <td>{formatDate(s.createdAt)}</td>
            <td>
              <span className="pill" data-state={s.unsubscribedAt ? undefined : "published"}>
                {s.unsubscribedAt ? "Unsubscribed" : "Active"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
