"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export function ContactForm({ subject }: { subject?: string } = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: (data.get("fullName") as string) ?? "",
      email: (data.get("email") as string) ?? "",
      phone: (data.get("phone") as string) ?? "",
      subject: subject ?? "",
      message: (data.get("message") as string) ?? "",
      website: (data.get("website") as string) ?? "",
    };

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
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
      setMessage("Thanks — I'll be in touch.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "ok") {
    return (
      <p className="comment-form__note" data-state="ok">
        {message}
      </p>
    );
  }

  return (
    <form
      className="comment-form"
      onSubmit={onSubmit}
      aria-label={subject ? `Register interest — ${subject}` : "Register your interest"}
    >
      <label className="comment-form__honeypot" aria-hidden="true">
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="comment-form__row">
        <div>
          <label htmlFor="fullName">Name</label>
          <input id="fullName" name="fullName" type="text" required maxLength={120} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required maxLength={160} />
        </div>
      </div>
      <div>
        <label htmlFor="phone">Phone (optional)</label>
        <input id="phone" name="phone" type="tel" maxLength={40} />
      </div>
      <div>
        <label htmlFor="message">What would you like to connect about? (optional)</label>
        <textarea id="message" name="message" maxLength={2000} />
      </div>
      <div className="admin-form__actions">
        <button className="btn btn--primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Register"}
        </button>
      </div>
      {message && status === "error" && (
        <p className="comment-form__note" data-state="error">
          {message}
        </p>
      )}
    </form>
  );
}
