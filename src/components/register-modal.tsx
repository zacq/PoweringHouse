"use client";

import { useRef } from "react";
import { ContactForm } from "@/components/contact-form";

export function RegisterModal({
  label,
  subject,
  className,
  children,
}: {
  label: string;
  subject: string;
  /** Replaces the default small ghost-button styling of the trigger. */
  className?: string;
  /** Trigger content; defaults to `label`. */
  children?: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function onBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  }

  return (
    <>
      <button
        type="button"
        className={className ?? "btn btn--ghost"}
        style={className ? undefined : { marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
        aria-label={children ? label : undefined}
        onClick={() => dialogRef.current?.showModal()}
      >
        {children ?? label}
      </button>
      <dialog ref={dialogRef} className="modal" aria-label={subject} onClick={onBackdropClick}>
        <div className="modal__head">
          <h3>{subject}</h3>
          <button
            type="button"
            className="modal__close"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <ContactForm subject={subject} />
      </dialog>
    </>
  );
}
