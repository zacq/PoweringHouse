"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "unlocked" | "error";

export function EResourceGate({ resourceId, title }: { resourceId: string; title: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const inputId = `gate-email-${resourceId}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (new FormData(e.currentTarget).get("email") as string) ?? "";

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resourceId }),
      });
      const data = await res.json();
      if (!res.ok || !data.fileUrl) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setFileUrl(data.fileUrl);
      setStatus("unlocked");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "unlocked") {
    return (
      <a className="btn btn--primary" href={fileUrl} style={{ padding: ".5rem .9rem", fontSize: ".82rem" }}>
        Get {title}
      </a>
    );
  }

  return (
    <form className="comment-form" onSubmit={onSubmit} style={{ marginTop: ".8rem" }}>
      <div>
        <label htmlFor={inputId}>Email to unlock</label>
        <input id={inputId} name="email" type="email" required placeholder="you@business.co.ke" />
      </div>
      <div className="admin-form__actions">
        <button
          className="btn btn--primary"
          type="submit"
          disabled={status === "loading"}
          style={{ padding: ".5rem .9rem", fontSize: ".82rem" }}
        >
          {status === "loading" ? "Unlocking…" : "Unlock"}
        </button>
      </div>
      {message && (
        <p className="comment-form__note" data-state="error">
          {message}
        </p>
      )}
    </form>
  );
}
