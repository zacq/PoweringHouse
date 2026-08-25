import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { CategoryFilter } from "@/components/category-filter";
import { prisma } from "@/lib/prisma";
import { categoryBySlug } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Seed of Power",
  description: "Raw thinking on what it actually takes to build the business you love.",
};

export const revalidate = 60;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeSlug = searchParams.category;
  const activeCategory = activeSlug ? categoryBySlug(activeSlug) : undefined;

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(activeCategory ? { category: activeCategory.value } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

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
      <CategoryFilter active={activeCategory?.slug} />
      {posts.length === 0 ? (
        <p className="empty-state">
          {activeCategory
            ? `Nothing published under ${activeCategory.title} yet — check back soon.`
            : "Nothing published yet — check back soon."}
        </p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
