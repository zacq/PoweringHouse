import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { CategoryFilter } from "@/components/category-filter";
import { prisma } from "@/lib/prisma";
import { categoryBySlug } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Writing",
  description: "Business design, money discipline, and growth systems.",
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
        <h1>Writing</h1>
        <p>
          Business Design, Money Discipline, Growth Systems &mdash; the same
          three lines of work, written up as I learn them in the room.
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
