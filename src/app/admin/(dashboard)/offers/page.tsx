import Link from "next/link";
import { prisma } from "@/lib/prisma";

const LINE_LABELS: Record<string, string> = {
  BUSINESS_GROWTH_DESIGN: "Growth Design",
  OPERATIONS_EXCELLENCE: "Operations",
  BOTH: "Both",
};

export default async function AdminOffersPage() {
  const offers = await prisma.offer.findMany({ orderBy: { order: "asc" } });

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
        <h1 style={{ margin: 0 }}>Offers</h1>
        <Link className="btn btn--primary" href="/admin/offers/new">
          New offer
        </Link>
      </div>

      {offers.length === 0 ? (
        <p className="admin-empty">No offers yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Line</th>
              <th>Status</th>
              <th>Draft copy</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.order}</td>
                <td>
                  <Link href={`/admin/offers/${offer.id}/edit`}>{offer.name}</Link>
                </td>
                <td>{LINE_LABELS[offer.offerLine]}</td>
                <td>
                  <span className="pill" data-state={offer.published ? "published" : "draft"}>
                    {offer.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  {(offer.priceIsDraft || offer.storyIsDraft) && (
                    <span className="pill" data-state="pending">
                      {[offer.priceIsDraft && "price", offer.storyIsDraft && "story"]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
