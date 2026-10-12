"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

/**
 * A document gated behind name + email (Executive Breakfast brief, e-resources…), or — with no `pdf` —
 * a pitched request form (e.g. a quote request) that confirms instead of offering a download.
 */
export interface LeadMagnet {
  /** /api/subscribe `list` value — decides the Airtable Subscribers Source. */
  list: "cina-breakfast" | "cina-craftsmanship" | "ph-coaching" | "cina-cohort" | "ph-assessment";
  pdf?: string;
  pdfName?: string;
  /** Short label on the tile beside the brief box (default "PDF"). */
  briefBadge?: string;
  eyebrow: string;
  title: string;
  theme: string;
  reasons: { t: string; d: string }[];
  quote: string;
  briefTitle: string;
  briefLine: string;
  cta: string;
  fine: string;
  doneTitle: string;
  doneText: string;
  downloadLabel?: string;
  /** Paid programmes: adds a "Register" switch that turns the panel into a registration form. */
  register?: { label: string; title: string; intro: string; subject: string };
}

/**
 * Pitch drawn from the document itself, then name + email, then the PDF as an instant
 * download (the /awareness growth-kit pattern). Styled by --lm-* tokens, so it takes the
 * Powering House look by default and the CINA look inside .cina.
 */
export function LeadMagnetModal({
  content: c,
  label,
  className,
}: {
  content: LeadMagnet;
  label: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const key = `lead-magnet:${c.list}`;
  const [registered, setRegistered] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"outline" | "register" | "registered">("outline");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!c.register) return;
    const d = new FormData(e.currentTarget);
    const payload = {
      fullName: String(d.get("fullName") ?? "").trim(),
      email: String(d.get("email") ?? "").trim(),
      phone: String(d.get("phone") ?? "").trim(),
      message: String(d.get("message") ?? "").trim(),
      website: String(d.get("website") ?? ""),
      subject: c.register.subject,
    };
    if (payload.fullName.length < 2) return setRegError("Please add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return setRegError("Please enter a valid email address.");
    setRegLoading(true);
    setRegError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) return setRegError(result.error ?? "Something went wrong. Try again.");
      setView("registered");
    } catch {
      setRegError("Something went wrong. Try again.");
    } finally {
      setRegLoading(false);
    }
  }

  const registerSwitch = c.register && (
    <div className="lm__switch">
      <span>Ready to join the paid programme?</span>
      <button type="button" className="lm__btn lm__btn--ghost" onClick={() => setView("register")}>
        {c.register.label} <span aria-hidden="true">→</span>
      </button>
    </div>
  );

  useEffect(() => {
    try {
      setRegistered(sessionStorage.getItem(key));
    } catch {}
  }, [key]);

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
        body: JSON.stringify({ name, email, website, list: c.list }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Something went wrong. Try again.");
        return;
      }
      try {
        sessionStorage.setItem(key, email);
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
        className="modal lm"
        aria-label={c.title}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <button type="button" className="modal__close lm__close" onClick={() => dialogRef.current?.close()} aria-label="Close">
          ×
        </button>

        <div className="lm__pitch">
          <p className="lm__eyebrow">{c.eyebrow}</p>
          <h3 className="lm__title">{c.title}</h3>
          <p className="lm__theme">{c.theme}</p>
          <ul className="lm__reasons">
            {c.reasons.map((r) => (
              <li key={r.t}>
                <strong>{r.t}</strong>
                <span>{r.d}</span>
              </li>
            ))}
          </ul>
          <p className="lm__quote">“{c.quote}”</p>
        </div>

        <div className="lm__panel">
          {view === "registered" && c.register ? (
            <div role="status" className="lm__form">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--lm-accent)" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
                <path d="M4 12l5 5L20 6" />
              </svg>
              <h4>Your registration is in.</h4>
              <p>Thank you — we’ll contact you shortly with the price, dates and next steps for {c.register.title}.</p>
            </div>
          ) : view === "register" && c.register ? (
            <form className="lm__form" onSubmit={onRegister} noValidate>
              <div className="lm__brief">
                <span className="lm__pdf" aria-hidden="true">REG</span>
                <div>
                  <h4>Register — {c.register.title}</h4>
                  <p>{c.register.intro}</p>
                </div>
              </div>
              <label className="comment-form__honeypot" aria-hidden="true">
                Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="lm__row">
                <label className="lm__field">
                  <span>Name</span>
                  <input name="fullName" autoComplete="name" placeholder="Your name" onChange={() => setRegError("")} />
                </label>
                <label className="lm__field">
                  <span>Email</span>
                  <input type="email" name="email" autoComplete="email" inputMode="email" placeholder="you@company.co.ke" onChange={() => setRegError("")} />
                </label>
              </div>
              <label className="lm__field">
                <span>Phone (optional)</span>
                <input type="tel" name="phone" autoComplete="tel" placeholder="07xx xxx xxx" />
              </label>
              <label className="lm__field">
                <span>What would you like to connect about? (optional)</span>
                <textarea name="message" rows={3} maxLength={2000} />
              </label>
              {regError && (
                <p role="alert" className="lm__error">
                  {regError}
                </p>
              )}
              <button type="submit" className="lm__btn" disabled={regLoading}>
                {regLoading ? "Registering…" : "Register"} <span aria-hidden="true">→</span>
              </button>
              <button type="button" className="lm__back" onClick={() => setView("outline")}>
                ← Back to the programme outline
              </button>
            </form>
          ) : registered ? (
            <div role="status" className="lm__form">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--lm-accent)" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
                <path d="M4 12l5 5L20 6" />
              </svg>
              <h4>{c.doneTitle}</h4>
              <p>
                Registered as {registered}. {c.doneText}
              </p>
              {/* When email delivery is added, send the document to the registrant instead of offering it here. */}
              {c.pdf && (
                <a href={c.pdf} download={c.pdfName} className="lm__btn">
                  {c.downloadLabel} <span aria-hidden="true">↓</span>
                </a>
              )}
              {registerSwitch}
            </div>
          ) : (
            <form className="lm__form" onSubmit={onSubmit} noValidate>
              <div className="lm__brief">
                <span className="lm__pdf" aria-hidden="true">{c.briefBadge ?? "PDF"}</span>
                <div>
                  <h4>{c.briefTitle}</h4>
                  <p>{c.briefLine}</p>
                </div>
              </div>
              <label className="comment-form__honeypot" aria-hidden="true">
                Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="lm__field">
                <span>Name</span>
                <input name="name" autoComplete="name" placeholder="Your name" onChange={() => setError("")} />
              </label>
              <label className="lm__field">
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
                <p role="alert" className="lm__error">
                  {error}
                </p>
              )}
              <button type="submit" className="lm__btn" disabled={loading}>
                {loading ? "Registering…" : c.cta} <span aria-hidden="true">→</span>
              </button>
              <p className="lm__fine">{c.fine}</p>
              {registerSwitch}
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
