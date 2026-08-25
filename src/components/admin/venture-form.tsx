"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface VentureFormValues {
  id?: string;
  businessName: string;
  sector: string;
  before: string;
  after: string;
  metricLabel: string;
  metricBefore: string;
  metricAfter: string;
  consentOnFile: boolean;
  photo: string;
  published: boolean;
  order: number;
}

const EMPTY: VentureFormValues = {
  businessName: "",
  sector: "",
  before: "",
  after: "",
  metricLabel: "",
  metricBefore: "",
  metricAfter: "",
  consentOnFile: false,
  photo: "",
  published: false,
  order: 0,
};

export function VentureForm({ initial }: { initial?: VentureFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<VentureFormValues>(initial ?? EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof VentureFormValues>(key: K, value: VentureFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onConsentChange(checked: boolean) {
    update("consentOnFile", checked);
    if (!checked) update("published", false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/ventures/${initial!.id}` : "/api/admin/ventures";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save the venture.");
        setSaving(false);
        return;
      }
      router.push("/admin/ventures");
      router.refresh();
    } catch {
      setError("Could not save the venture. Check your connection and try again.");
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!isEdit) return;
    if (!confirm("Delete this venture? This can't be undone.")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/ventures/${initial!.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/ventures");
      router.refresh();
    } else {
      setError("Could not delete the venture.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="businessName">Business name</label>
        <input
          id="businessName"
          type="text"
          required
          value={values.businessName}
          onChange={(e) => update("businessName", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sector">Sector</label>
        <input
          id="sector"
          type="text"
          required
          value={values.sector}
          onChange={(e) => update("sector", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="before">Before</label>
        <textarea
          id="before"
          required
          style={{ minHeight: "4.5rem" }}
          value={values.before}
          onChange={(e) => update("before", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="after">After</label>
        <textarea
          id="after"
          required
          style={{ minHeight: "4.5rem" }}
          value={values.after}
          onChange={(e) => update("after", e.target.value)}
        />
      </div>

      <div className="admin-form__row" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ flex: "1 1 12rem" }}>
          <label htmlFor="metricLabel">Metric label</label>
          <input
            id="metricLabel"
            type="text"
            required
            placeholder="e.g. Monthly revenue"
            value={values.metricLabel}
            onChange={(e) => update("metricLabel", e.target.value)}
          />
        </div>
        <div style={{ flex: "1 1 8rem" }}>
          <label htmlFor="metricBefore">Before value</label>
          <input
            id="metricBefore"
            type="text"
            required
            value={values.metricBefore}
            onChange={(e) => update("metricBefore", e.target.value)}
          />
        </div>
        <div style={{ flex: "1 1 8rem" }}>
          <label htmlFor="metricAfter">After value</label>
          <input
            id="metricAfter"
            type="text"
            required
            value={values.metricAfter}
            onChange={(e) => update("metricAfter", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="photo">Photo URL (optional)</label>
        <input id="photo" type="text" value={values.photo} onChange={(e) => update("photo", e.target.value)} />
      </div>

      <div>
        <label htmlFor="order">Order</label>
        <input
          id="order"
          type="text"
          inputMode="numeric"
          value={values.order}
          onChange={(e) => update("order", Number(e.target.value.replace(/\D/g, "")) || 0)}
        />
      </div>

      <div className="admin-form__row">
        <input
          id="consentOnFile"
          type="checkbox"
          checked={values.consentOnFile}
          onChange={(e) => onConsentChange(e.target.checked)}
        />
        <label htmlFor="consentOnFile" style={{ margin: 0 }}>
          Written consent on file from this business
        </label>
      </div>

      <div className="admin-form__row">
        <input
          id="published"
          type="checkbox"
          checked={values.published}
          disabled={!values.consentOnFile}
          onChange={(e) => update("published", e.target.checked)}
        />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on Universe of Freedom)
          {!values.consentOnFile && " — needs consent on file first"}
        </label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create venture"}
        </button>
        {isEdit && (
          <button type="button" className="btn btn--ghost" onClick={onDelete} disabled={saving}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
