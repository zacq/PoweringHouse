import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminVenturesPage() {
  const ventures = await prisma.venture.findMany({ orderBy: { order: "asc" } });

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
        <h1 style={{ margin: 0 }}>Ventures</h1>
        <Link className="btn btn--primary" href="/admin/ventures/new">
          New venture
        </Link>
      </div>

      {ventures.length === 0 ? (
        <p className="admin-empty">No ventures yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Business</th>
              <th>Sector</th>
              <th>Consent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ventures.map((v) => (
              <tr key={v.id}>
                <td>{v.order}</td>
                <td>
                  <Link href={`/admin/ventures/${v.id}/edit`}>{v.businessName}</Link>
                </td>
                <td>{v.sector}</td>
                <td>
                  <span className="pill" data-state={v.consentOnFile ? "published" : "pending"}>
                    {v.consentOnFile ? "On file" : "Missing"}
                  </span>
                </td>
                <td>
                  <span className="pill" data-state={v.published ? "published" : "draft"}>
                    {v.published ? "Published" : "Draft"}
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
