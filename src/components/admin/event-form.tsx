"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface EventFormValues {
  id?: string;
  title: string;
  description: string;
  startsAt: string;
  location: string;
  link: string;
  published: boolean;
}

const EMPTY: EventFormValues = {
  title: "",
  description: "",
  startsAt: "",
  location: "",
  link: "",
  published: true,
};

export function EventForm({ initial }: { initial?: EventFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<EventFormValues>(initial ?? EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof EventFormValues>(key: K, value: EventFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/events/${initial!.id}` : "/api/admin/events";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save the event.");
        setSaving(false);
        return;
      }
      router.push("/admin/events");
      router.refresh();
    } catch {
      setError("Could not save the event. Check your connection and try again.");
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!isEdit) return;
    if (!confirm("Delete this event? This can't be undone.")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/events/${initial!.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/events");
      router.refresh();
    } else {
      setError("Could not delete the event.");
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
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          style={{ minHeight: "4.5rem" }}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="startsAt">Date &amp; time</label>
        <input
          id="startsAt"
          type="datetime-local"
          required
          value={values.startsAt}
          onChange={(e) => update("startsAt", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="location">Location (optional)</label>
        <input
          id="location"
          type="text"
          placeholder="Online, or a physical address"
          value={values.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="link">Link (optional)</label>
        <input
          id="link"
          type="text"
          placeholder="https://…"
          value={values.link}
          onChange={(e) => update("link", e.target.value)}
        />
      </div>

      <div className="admin-form__row">
        <input
          id="published"
          type="checkbox"
          checked={values.published}
          onChange={(e) => update("published", e.target.checked)}
        />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on Let&apos;s Connect)
        </label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create event"}
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
