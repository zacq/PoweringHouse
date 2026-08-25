import { prisma } from "@/lib/prisma";
import { EResourceGate } from "./eresource-gate";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** content-map v2 §4 — "show the date of the most recent upload so the promise is visibly kept." */
export async function EResourceList() {
  const resources = await prisma.eResource.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  if (resources.length === 0) {
    return <p className="admin-empty">Nothing uploaded yet — check back soon.</p>;
  }

  return (
    <div>
      <p style={{ fontSize: ".82rem", color: "var(--bone-dim)", marginBottom: "1.4rem" }}>
        Most recent upload: {formatDate(resources[0].publishedAt)}
      </p>
      <div className="themes__grid">
        {resources.map((r) => (
          <div className="theme" key={r.id}>
            <span className="theme__tag">{r.access === "GATED" ? "Email required" : "Open"}</span>
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            {r.access === "OPEN" ? (
              <a
                className="btn btn--ghost"
                href={r.fileUrl}
                style={{ marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
              >
                Get it
              </a>
            ) : (
              <EResourceGate resourceId={r.id} fileUrl={r.fileUrl} title={r.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
