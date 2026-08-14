import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/post-form";
import { NotifySubscribersButton } from "@/components/admin/notify-subscribers-button";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <>
      <h1>Edit post</h1>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          published: post.published,
        }}
      />
      {post.published && (
        <div className="admin-card" style={{ marginTop: "1.6rem" }}>
          <NotifySubscribersButton postId={post.id} enabled={Boolean(process.env.RESEND_API_KEY)} />
        </div>
      )}
    </>
  );
}
