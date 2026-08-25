import { prisma } from "@/lib/prisma";

/** "Ventures That Are Growing" — content-map v2 §6, developed from the doc's testimonials note. */
export async function VenturesGrid() {
  const ventures = await prisma.venture.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (ventures.length === 0) {
    return <p className="admin-empty">Nothing here yet — check back soon.</p>;
  }

  return (
    <div className="themes__grid">
      {ventures.map((v) => (
        <div className="theme" key={v.id}>
          <span className="theme__tag">{v.sector}</span>
          <h3>{v.businessName}</h3>
          <p>{v.after}</p>
          <span className="theme__count">
            {v.metricLabel}: {v.metricBefore} → {v.metricAfter}
          </span>
        </div>
      ))}
    </div>
  );
}
