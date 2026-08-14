import type { Comment } from "@prisma/client";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="comment-form__note">No comments yet — be the first.</p>;
  }

  return (
    <div>
      {comments.map((c) => (
        <article className="comment" key={c.id}>
          <div className="comment__head">
            <span className="comment__author">{c.authorName}</span>
            <span className="comment__date">{formatDate(c.createdAt)}</span>
          </div>
          <p className="comment__body">{c.body}</p>
        </article>
      ))}
    </div>
  );
}
