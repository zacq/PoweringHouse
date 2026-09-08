import { prisma } from "@/lib/prisma";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminContactMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <h1>Contact messages</h1>
      {messages.length === 0 ? (
        <p className="admin-empty">Nothing here.</p>
      ) : (
        <div>
          {messages.map((m) => (
            <div className="admin-card" key={m.id}>
              <strong>{m.fullName}</strong>{" "}
              <span style={{ color: "var(--bone-dim)", fontSize: ".82rem" }}>
                {m.email}
                {m.phone ? ` · ${m.phone}` : ""} · {formatDate(m.createdAt)}
              </span>
              {m.message && <p style={{ margin: ".5rem 0 0" }}>{m.message}</p>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
