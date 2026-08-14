import { prisma } from "@/lib/prisma";
import { SubscribersTable } from "@/components/admin/subscribers-table";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  const active = subscribers.filter((s) => !s.unsubscribedAt).length;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.6rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1 style={{ margin: 0 }}>
          Subscribers <span style={{ color: "var(--bone-dim)", fontWeight: 400 }}>({active} active)</span>
        </h1>
        <a className="btn btn--ghost" href="/api/admin/subscribers/export">
          Export CSV
        </a>
      </div>
      <SubscribersTable subscribers={subscribers} />
    </>
  );
}
