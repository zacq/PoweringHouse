import { prisma } from "@/lib/prisma";
import { CommentQueue } from "@/components/admin/comment-queue";

export default async function AdminCommentsPage() {
  const [pending, approved] = await Promise.all([
    prisma.comment.findMany({
      where: { approved: false },
      orderBy: { createdAt: "asc" },
      include: { post: { select: { title: true, slug: true } } },
    }),
    prisma.comment.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      include: { post: { select: { title: true, slug: true } } },
    }),
  ]);

  const serialize = (rows: typeof pending) =>
    rows.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() }));

  return (
    <>
      <h1>Comments</h1>
      <h2 style={{ fontFamily: "var(--display)", fontSize: "1.1rem", marginTop: "1.6rem" }}>
        Pending ({pending.length})
      </h2>
      <CommentQueue comments={serialize(pending)} />

      <h2 style={{ fontFamily: "var(--display)", fontSize: "1.1rem", marginTop: "2.4rem" }}>
        Approved ({approved.length})
      </h2>
      <CommentQueue comments={serialize(approved)} />
    </>
  );
}
