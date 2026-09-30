"use client";

import { FormEvent, useEffect, useState } from "react";
import { GK_KIT_PDF, GK_KIT_PDF_NAME } from "@/lib/growth-kit";

const KEY = "gk-kit-submitted";
const EVENT = "gk-kit-submitted";

/**
 * Shared "already asked for the kit" flag, so both forms and the mobile bar
 * flip together once either form succeeds (and stay flipped for the session).
 */
export function useKitSubmitted(): [string | null, (email: string) => void] {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      setEmail(sessionStorage.getItem(KEY));
    } catch {}
    const onSubmitted = (e: Event) => setEmail((e as CustomEvent<string>).detail);
    window.addEventListener(EVENT, onSubmitted);
    return () => window.removeEventListener(EVENT, onSubmitted);
  }, []);

  function markSubmitted(value: string) {
    try {
      sessionStorage.setItem(KEY, value);
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
  }

  return [email, markSubmitted];
}

export function GrowthKitForm({ variant = "card" }: { variant?: "card" | "compact" }) {
  const [submittedEmail, markSubmitted] = useKitSubmitted();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        body: JSON.stringify({ name, email, website, list: "growth-kit" }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Something went wrong. Try again.");
        return;
      }
      markSubmitted(email);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submittedEmail) {
    return (
      <div role="status" className="gk-form gk-form--done">
        {variant === "card" && (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2.4" strokeLinecap="square" aria-hidden="true">
            <path d="M4 12l5 5L20 6" />
          </svg>
        )}
        <h3>Your kit is ready.</h3>
        <p>
          Registered as {submittedEmail}. Download all 5 levels below.
        </p>
        {/* When email delivery is added, send the kit to submittedEmail instead of offering it here. */}
        <a href={GK_KIT_PDF} download={GK_KIT_PDF_NAME} className="btn btn--primary gk-btn-wide gk-form__download">
          Download the Growth Kit (PDF) <span aria-hidden="true">↓</span>
        </a>
        {variant === "card" && (
          <a href="#level-1" className="btn btn--ghost gk-form__story">
            Read GK’s story
          </a>
        )}
      </div>
    );
  }

  return (
    <form className="gk-form" onSubmit={onSubmit} noValidate>
      {variant === "card" ? (
        <div>
          <h3>Get the free kit</h3>
          <p>All 5 levels as a PDF — download it as soon as you register.</p>
        </div>
      ) : (
        <h3>Get the free Growth Kit</h3>
      )}
      <label className="comment-form__honeypot" aria-hidden="true">
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="gk-form__field">
        <span className={variant === "compact" ? "gk-sr" : undefined}>Name</span>
        <input name="name" autoComplete="name" placeholder="Your name" onChange={() => setError("")} />
      </label>
      <label className="gk-form__field">
        <span className={variant === "compact" ? "gk-sr" : undefined}>Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@business.co.ke"
          onChange={() => setError("")}
        />
      </label>
      {error && (
        <p role="alert" className="gk-form__error">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn--primary gk-btn-wide" disabled={loading}>
        {loading ? "Registering…" : variant === "card" ? "Get the Kit" : "Get My Free Copy"}
        <span aria-hidden="true">→</span>
      </button>
      {variant === "card" && (
        <p className="gk-form__fine">No spam. Just the kit, then occasional notes from GK.</p>
      )}
    </form>
  );
}

/** Mobile-only "Get the Kit" bar: appears once the hero has scrolled away, until the kit is requested. */
export function GrowthKitBar({ heroId }: { heroId: string }) {
  const [submittedEmail] = useKitSubmitted();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) =>
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 0)
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [heroId]);

  if (!pastHero || submittedEmail) return null;
  return (
    <a href="#kit" className="gk-bar">
      Get the Kit <span aria-hidden="true">→</span>
    </a>
  );
}
