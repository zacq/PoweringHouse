import { prisma } from "@/lib/prisma";
import { PostCard } from "./post-card";

/** Door 1 of the Market Space grid: proves the newsletter is worth the address. */
export async function RecentLetters() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  if (posts.length === 0) {
    return <p className="admin-empty">Nothing published yet — check back soon.</p>;
  }

  return (
    <div className="post-grid post-grid--compact">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
