import { fetchBeehiivPosts } from "@/lib/beehiiv";
import { FeedCard, formatFeedDate } from "./feed-card";

/** Door 1 of the Market Space grid: proves the newsletter is worth the address. */
export async function RecentLetters() {
  const posts = (await fetchBeehiivPosts()).slice(0, 3);

  if (posts.length === 0) {
    return <p className="admin-empty">Nothing published yet — check back soon.</p>;
  }

  return (
    <div className="post-grid post-grid--compact">
      {posts.map((post) => (
        <FeedCard
          key={post.id}
          href={post.url}
          external
          tag="Newsletter"
          title={post.title}
          excerpt={post.excerpt}
          date={formatFeedDate(post.publishedAt)}
        />
      ))}
    </div>
  );
}
