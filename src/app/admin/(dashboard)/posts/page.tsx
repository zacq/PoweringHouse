import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { categoryByValue } from "@/lib/categories";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

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
        <h1 style={{ margin: 0 }}>Posts</h1>
        <Link className="btn btn--primary" href="/admin/posts/new">
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="admin-empty">No posts yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link href={`/admin/posts/${post.id}/edit`}>{post.title}</Link>
                </td>
                <td>{categoryByValue(post.category).title}</td>
                <td>
                  <span className="pill" data-state={post.published ? "published" : "draft"}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(post.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
