import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminResourcesPage() {
  const resources = await prisma.eResource.findMany({ orderBy: { publishedAt: "desc" } });

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
        <h1 style={{ margin: 0 }}>Resources</h1>
        <Link className="btn btn--primary" href="/admin/resources/new">
          New resource
        </Link>
      </div>

      {resources.length === 0 ? (
        <p className="admin-empty">No resources yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Access</th>
              <th>Status</th>
              <th>Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id}>
                <td>
                  <Link href={`/admin/resources/${r.id}/edit`}>{r.title}</Link>
                </td>
                <td>{r.access === "GATED" ? "Gated" : "Open"}</td>
                <td>
                  <span className="pill" data-state={r.published ? "published" : "draft"}>
                    {r.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(r.publishedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
