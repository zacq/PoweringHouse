import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommentList } from "@/components/comment-list";
import { CommentForm } from "@/components/comment-form";
import { prisma } from "@/lib/prisma";
import { categoryByValue } from "@/lib/categories";
import { renderMarkdown } from "@/lib/markdown";

export const revalidate = 60;

async function getPost(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const comments = await prisma.comment.findMany({
    where: { postId: post.id, approved: true },
    orderBy: { createdAt: "asc" },
  });

  const category = categoryByValue(post.category);
  const html = renderMarkdown(post.content);
  const date = post.publishedAt
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
        post.publishedAt
      )
    : "";

  return (
    <>
      <article className="post">
        <div className="post__meta">
          <span>{category.tag}</span>
          <span>{date}</span>
        </div>
        <h1>{post.title}</h1>
        <div className="post__body" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <section className="comments" aria-labelledby="comments-title">
        <h2 id="comments-title">
          Comments {comments.length > 0 ? `(${comments.length})` : ""}
        </h2>
        <CommentList comments={comments} />
        <CommentForm postId={post.id} />
      </section>
    </>
  );
}
