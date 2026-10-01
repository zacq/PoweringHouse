"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CINA_BREAKFAST as B } from "@/lib/cina";

const KEY = "cina-breakfast-registered";

/**
 * Executive Breakfast registration, modelled on the /awareness growth-kit form:
 * a short pitch, name + email, then the session brief as an instant download.
 */
export function ExecutiveBreakfastModal({ label, className }: { label: string; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [registered, setRegistered] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setRegistered(sessionStorage.getItem(KEY));
    } catch {}
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const website = String(data.get("website") ?? "");

    if (!name) return setError("Please add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website, list: "cina-breakfast" }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Something went wrong. Try again.");
        return;
      }
      try {
        sessionStorage.setItem(KEY, email);
      } catch {}
      setRegistered(email);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={() => dialogRef.current?.showModal()}>
        {label} <span aria-hidden="true">→</span>
      </button>
      <dialog
        ref={dialogRef}
        className="modal cina-eb"
        aria-label="CINA Executive Breakfast"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <button type="button" className="modal__close cina-eb__close" onClick={() => dialogRef.current?.close()} aria-label="Close">
          ×
        </button>

        <div className="cina-eb__pitch">
          <p className="cina-eb__eyebrow">{B.eyebrow}</p>
          <h3 className="cina-eb__title">{B.title}</h3>
          <p className="cina-eb__theme">{B.theme}</p>
          <ul className="cina-eb__reasons">
            {B.reasons.map((r) => (
              <li key={r.t}>
                <strong>{r.t}</strong>
                <span>{r.d}</span>
              </li>
            ))}
          </ul>
          <p className="cina-eb__quote">“{B.quote}”</p>
        </div>

        <div className="cina-eb__panel">
          {registered ? (
            <div role="status" className="cina-eb__form">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--c-amber)" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
                <path d="M4 12l5 5L20 6" />
              </svg>
              <h4>Your seat request is in.</h4>
              <p>
                Registered as {registered}. Download the session brief below — we’ll confirm the date and venue with
                you directly.
              </p>
              {/* When email delivery is added, send the brief to the registrant instead of offering it here. */}
              <a href={B.pdf} download={B.pdfName} className="cina-btn cina-btn--amber cina-btn--block">
                Download the session brief (PDF) <span aria-hidden="true">↓</span>
              </a>
            </div>
          ) : (
            <form className="cina-eb__form" onSubmit={onSubmit} noValidate>
              <div className="cina-eb__brief">
                <span className="cina-eb__pdf" aria-hidden="true">PDF</span>
                <div>
                  <h4>{B.briefTitle}</h4>
                  <p>{B.briefLine}</p>
                </div>
              </div>
              <label className="comment-form__honeypot" aria-hidden="true">
                Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="cina-eb__field">
                <span>Name</span>
                <input name="name" autoComplete="name" placeholder="Your name" onChange={() => setError("")} />
              </label>
              <label className="cina-eb__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.co.ke"
                  onChange={() => setError("")}
                />
              </label>
              {error && (
                <p role="alert" className="cina-eb__error">
                  {error}
                </p>
              )}
              <button type="submit" className="cina-btn cina-btn--amber cina-btn--block" disabled={loading}>
                {loading ? "Registering…" : "Reserve my seat & get the brief"} <span aria-hidden="true">→</span>
              </button>
              <p className="cina-eb__fine">No spam. Just the brief, then the round table details from CINA.</p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
