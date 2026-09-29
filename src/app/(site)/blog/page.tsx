import type { Metadata } from "next";
import { FeedCard, formatFeedDate } from "@/components/feed-card";
import { fetchBeehiivPosts } from "@/lib/beehiiv";

export const metadata: Metadata = {
  title: "Seed of Power",
  description: "Raw thinking on what it actually takes to build the business you love.",
};

export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await fetchBeehiivPosts();

  return (
    <>
      <header className="blog-header">
        <h1>Seed of Power</h1>
        {/* DRAFT: content-map v2 §5, verbatim — cadence and name still need Gachoka's sign-off, §8.1/§8.2 */}
        <p>
          It&apos;s my raw thought write-up, every fourth night. I tell you
          what I find my own mind telling me. It could save you years of the
          lone journey of trying to build the enterprise you love.
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="empty-state">Nothing published yet — check back soon.</p>
      ) : (
        <div className="post-grid">
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
      )}
    </>
  );
}
