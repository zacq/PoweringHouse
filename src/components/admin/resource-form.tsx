"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface ResourceFormValues {
  id?: string;
  title: string;
  description: string;
  fileUrl: string;
  access: string;
  published: boolean;
}

const EMPTY: ResourceFormValues = {
  title: "",
  description: "",
  fileUrl: "",
  access: "OPEN",
  published: true,
};

export function ResourceForm({ initial }: { initial?: ResourceFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<ResourceFormValues>(initial ?? EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ResourceFormValues>(key: K, value: ResourceFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/resources/${initial!.id}` : "/api/admin/resources";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save the resource.");
        setSaving(false);
        return;
      }
      router.push("/admin/resources");
      router.refresh();
    } catch {
      setError("Could not save the resource. Check your connection and try again.");
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!isEdit) return;
    if (!confirm("Delete this resource? This can't be undone.")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/resources/${initial!.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/resources");
      router.refresh();
    } else {
      setError("Could not delete the resource.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          required
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          required
          style={{ minHeight: "4.5rem" }}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="fileUrl">File URL</label>
        <input
          id="fileUrl"
          type="text"
          required
          placeholder="https://…"
          value={values.fileUrl}
          onChange={(e) => update("fileUrl", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="access">Access</label>
        <select id="access" value={values.access} onChange={(e) => update("access", e.target.value)}>
          <option value="OPEN">Open (no email needed)</option>
          <option value="GATED">Gated (email required to unlock)</option>
        </select>
      </div>

      <div className="admin-form__row">
        <input
          id="published"
          type="checkbox"
          checked={values.published}
          onChange={(e) => update("published", e.target.checked)}
        />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on Universe of Freedom)
        </label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create resource"}
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
