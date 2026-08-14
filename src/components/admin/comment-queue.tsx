"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface QueueComment {
  id: string;
  authorName: string;
  authorEmail: string;
  body: string;
  createdAt: string;
  approved: boolean;
  post: { title: string; slug: string };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function CommentQueue({ comments }: { comments: QueueComment[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function approve(id: string) {
    setBusyId(id);
    await fetch(`/api/admin/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    router.refresh();
    setBusyId(null);
  }

  async function reject(id: string) {
    if (!confirm("Delete this comment?")) return;
    setBusyId(id);
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    router.refresh();
    setBusyId(null);
  }

  if (comments.length === 0) {
    return <p className="admin-empty">Nothing here.</p>;
  }

  return (
    <div>
      {comments.map((c) => (
        <div className="admin-card" key={c.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>{c.authorName}</strong>{" "}
              <span style={{ color: "var(--bone-dim)", fontSize: ".82rem" }}>
                {c.authorEmail} · {formatDate(c.createdAt)}
              </span>
              <p style={{ margin: ".5rem 0 0" }}>{c.body}</p>
              <p style={{ margin: ".6rem 0 0", fontSize: ".82rem", color: "var(--bone-dim)" }}>
                on <a href={`/blog/${c.post.slug}`}>{c.post.title}</a>
              </p>
            </div>
            <div className="admin-form__actions" style={{ marginTop: 0 }}>
              {!c.approved && (
                <button
                  className="btn btn--primary"
                  disabled={busyId === c.id}
                  onClick={() => approve(c.id)}
                  style={{ padding: ".5rem .9rem", fontSize: ".82rem" }}
                >
                  Approve
                </button>
              )}
              <button
                className="btn btn--ghost"
                disabled={busyId === c.id}
                onClick={() => reject(c.id)}
                style={{ padding: ".5rem .9rem", fontSize: ".82rem" }}
              >
                {c.approved ? "Revoke" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
