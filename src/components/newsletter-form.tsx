"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string) ?? "";
    const website = (new FormData(form).get("website") as string) ?? "";

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("ok");
      setMessage(
        data.alreadySubscribed
          ? "You're already on the list."
          : "You're in — welcome to the room."
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <form className="join__form" onSubmit={onSubmit}>
      <label className="comment-form__honeypot" aria-hidden="true">
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <input
        type="email"
        name="email"
        required
        placeholder="you@business.co.ke"
        aria-label="Email address"
      />
      <button className="btn btn--primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Join the room"}
      </button>
      {message && (
        <p className="join__note" data-state={status === "ok" ? "ok" : "error"}>
          {message}
        </p>
      )}
    </form>
  );
}
