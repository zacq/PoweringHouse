import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [published, drafts, pendingComments, subscribers] = await Promise.all([
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.comment.count({ where: { approved: false } }),
    prisma.subscriber.count({ where: { unsubscribedAt: null } }),
  ]);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="admin-grid">
        <div className="admin-card">
          <div className="stat__num">{published}</div>
          <p className="stat__label">Published posts</p>
        </div>
        <div className="admin-card">
          <div className="stat__num">{drafts}</div>
          <p className="stat__label">Drafts</p>
        </div>
        <div className="admin-card">
          <div className="stat__num">{pendingComments}</div>
          <p className="stat__label">Comments awaiting review</p>
        </div>
        <div className="admin-card">
          <div className="stat__num">{subscribers}</div>
          <p className="stat__label">Newsletter subscribers</p>
        </div>
      </div>
      <p>
        <Link className="btn btn--primary" href="/admin/posts/new">
          Write a new post
        </Link>
      </p>
    </>
  );
}
