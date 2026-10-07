"use client";

import { Children, useState } from "react";

/**
 * Shows the first `initial` children and a "Show all" toggle for the rest, so long lists keep a
 * section within one screen. Children are rendered on the server and passed through as-is.
 */
export function Expandable({
  as: Tag = "div",
  className,
  initial,
  moreLabel,
  lessLabel = "Show less",
  tone = "light",
  buttonClassName,
  children,
}: {
  as?: "div" | "ol" | "ul";
  className?: string;
  initial: number;
  moreLabel: string;
  lessLabel?: string;
  /** "dark" for buttons on navy sections. */
  tone?: "light" | "dark";
  /** Replaces the CINA button styling (e.g. "more-btn" on Powering House pages). */
  buttonClassName?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children);
  const hidden = items.length - initial;

  return (
    <>
      <Tag className={className}>{open || hidden <= 0 ? items : items.slice(0, initial)}</Tag>
      {hidden > 0 && (
        <button
          type="button"
          className={buttonClassName ?? `cina-more cina-more--${tone}`}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? lessLabel : `${moreLabel} (+${hidden})`}
          <span aria-hidden="true" className="more-chev">
            {open ? "↑" : "↓"}
          </span>
        </button>
      )}
    </>
  );
}
