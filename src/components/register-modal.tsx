"use client";

import { useRef } from "react";
import { ContactForm } from "@/components/contact-form";

export function RegisterModal({ label, subject }: { label: string; subject: string }) {
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
        className="btn btn--ghost"
        style={{ marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
        onClick={() => dialogRef.current?.showModal()}
      >
        {label}
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
