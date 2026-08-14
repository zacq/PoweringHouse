import Link from "next/link";
import type { Post } from "@prisma/client";
import { categoryByValue } from "@/lib/categories";

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function PostCard({ post }: { post: Post }) {
  const category = categoryByValue(post.category);
  return (
    <Link className="post-card" href={`/blog/${post.slug}`}>
      <div className="post-card__meta">
        <span>{category.tag}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="post-card__date">{formatDate(post.publishedAt)}</div>
    </Link>
  );
}
