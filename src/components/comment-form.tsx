"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export function CommentForm({ postId }: { postId: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      postId,
      authorName: (data.get("authorName") as string) ?? "",
      authorEmail: (data.get("authorEmail") as string) ?? "",
      body: (data.get("body") as string) ?? "",
      website: (data.get("website") as string) ?? "",
    };

    setStatus("loading");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(result.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("ok");
      setMessage("Thanks — your comment is in the queue for review before it appears.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <label className="comment-form__honeypot" aria-hidden="true">
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="comment-form__row">
        <div>
          <label htmlFor="authorName">Name</label>
          <input id="authorName" name="authorName" type="text" required maxLength={80} />
        </div>
        <div>
          <label htmlFor="authorEmail">Email (not published)</label>
          <input id="authorEmail" name="authorEmail" type="email" required maxLength={160} />
        </div>
      </div>
      <div>
        <label htmlFor="body">Comment</label>
        <textarea id="body" name="body" required maxLength={2000} />
      </div>
      <div className="admin-form__actions">
        <button className="btn btn--primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Post comment"}
        </button>
      </div>
      {message && (
        <p className="comment-form__note" data-state={status === "ok" ? "ok" : "error"}>
          {message}
        </p>
      )}
    </form>
  );
}
