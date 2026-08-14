"use client";

import { useState } from "react";

export function NotifySubscribersButton({
  postId,
  enabled,
}: {
  postId: string;
  enabled: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onNotify() {
    if (!confirm("Email all active subscribers about this post?")) return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/admin/posts/${postId}/notify`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not send notifications.");
        return;
      }
      setStatus("ok");
      setMessage(`Sent to ${data.sent} subscriber${data.sent === 1 ? "" : "s"}.`);
    } catch {
      setStatus("error");
      setMessage("Could not send notifications.");
    }
  }

  if (!enabled) {
    return (
      <p style={{ margin: 0, fontSize: ".86rem", color: "var(--bone-dim)" }}>
        Notify subscribers is disabled — set <code>RESEND_API_KEY</code> to enable it.
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={onNotify}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Notify subscribers"}
      </button>
      {message && (
        <p
          style={{
            marginTop: ".6rem",
            fontSize: ".82rem",
            color: status === "ok" ? "var(--amber)" : "#E8836B",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
