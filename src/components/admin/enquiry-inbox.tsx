"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface InboxEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  businessName: string | null;
  message: string | null;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: string;
  offer: { name: string; slug: string };
}

const STATUSES: InboxEnquiry["status"][] = ["NEW", "CONTACTED", "CLOSED"];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function EnquiryInbox({ enquiries }: { enquiries: InboxEnquiry[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function setStatus(id: string, status: InboxEnquiry["status"]) {
    setBusyId(id);
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
    setBusyId(null);
  }

  if (enquiries.length === 0) {
    return <p className="admin-empty">Nothing here.</p>;
  }

  return (
    <div>
      {enquiries.map((e) => (
        <div className="admin-card" key={e.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>{e.fullName}</strong>{" "}
              <span style={{ color: "var(--bone-dim)", fontSize: ".82rem" }}>
                {e.email}
                {e.phone ? ` · ${e.phone}` : ""} · {formatDate(e.createdAt)}
              </span>
              {e.businessName && (
                <p style={{ margin: ".3rem 0 0", fontSize: ".86rem", color: "var(--bone-dim)" }}>
                  {e.businessName}
                </p>
              )}
              {e.message && <p style={{ margin: ".5rem 0 0" }}>{e.message}</p>}
              <p style={{ margin: ".6rem 0 0", fontSize: ".82rem", color: "var(--bone-dim)" }}>
                for <strong>{e.offer.name}</strong>
              </p>
            </div>
            <div className="admin-form__actions" style={{ marginTop: 0, flexWrap: "wrap" }}>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={s === e.status ? "btn btn--primary" : "btn btn--ghost"}
                  disabled={busyId === e.id || s === e.status}
                  onClick={() => setStatus(e.id, s)}
                  style={{ padding: ".5rem .9rem", fontSize: ".78rem" }}
                >
                  {s === "NEW" ? "New" : s === "CONTACTED" ? "Contacted" : "Closed"}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
