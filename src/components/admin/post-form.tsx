"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/slugify";
import { renderMarkdown } from "@/lib/markdown";

export interface PostFormValues {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
}

const EMPTY: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: CATEGORIES[0].value,
  published: false,
};

export function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<PostFormValues>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onTitleChange(title: string) {
    update("title", title);
    if (!slugTouched) update("slug", slugify(title));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save the post.");
        setSaving(false);
        return;
      }
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Could not save the post. Check your connection and try again.");
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!isEdit) return;
    if (!confirm("Delete this post? This can't be undone.")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/posts/${initial!.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      setError("Could not delete the post.");
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
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="slug">Slug (URL)</label>
        <input
          id="slug"
          type="text"
          required
          value={values.slug}
          onChange={(e) => {
            setSlugTouched(true);
            update("slug", slugify(e.target.value));
          }}
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={values.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="excerpt">Excerpt</label>
        <input
          id="excerpt"
          type="text"
          required
          maxLength={280}
          value={values.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
        />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: ".4rem",
          }}
        >
          <label htmlFor="content" style={{ margin: 0 }}>
            Content (Markdown)
          </label>
          <button
            type="button"
            className="btn btn--ghost"
            style={{ padding: ".35rem .75rem", fontSize: ".8rem" }}
            onClick={() => setPreview((p) => !p)}
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
        {preview ? (
          <div
            className="post__body admin-card"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(values.content || "*Nothing yet.*") }}
          />
        ) : (
          <textarea
            id="content"
            required
            value={values.content}
            onChange={(e) => update("content", e.target.value)}
          />
        )}
      </div>

      <div className="admin-form__row">
        <input
          id="published"
          type="checkbox"
          checked={values.published}
          onChange={(e) => update("published", e.target.checked)}
        />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on the public site)
        </label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create post"}
        </button>
        {isEdit && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onDelete}
            disabled={saving}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
