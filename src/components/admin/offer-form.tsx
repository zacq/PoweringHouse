"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { slugify } from "@/lib/slugify";

export interface OfferFormValues {
  id?: string;
  slug: string;
  name: string;
  offerLine: string;
  order: number;
  isFree: boolean;
  showInMarketPlace: boolean;
  promise: string;
  whoFor: string;
  whoNotFor: string;
  whatHappens: string;
  commitment: string;
  price: string;
  priceIsDraft: boolean;
  story: string;
  storyIsDraft: boolean;
  ctaType: string;
  ctaLabel: string;
  externalUrl: string;
  published: boolean;
}

const EMPTY: OfferFormValues = {
  slug: "",
  name: "",
  offerLine: "BUSINESS_GROWTH_DESIGN",
  order: 0,
  isFree: false,
  showInMarketPlace: true,
  promise: "",
  whoFor: "",
  whoNotFor: "",
  whatHappens: "",
  commitment: "",
  price: "",
  priceIsDraft: true,
  story: "",
  storyIsDraft: true,
  ctaType: "ENQUIRY_FORM",
  ctaLabel: "",
  externalUrl: "",
  published: true,
};

export function OfferForm({ initial }: { initial?: OfferFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState<OfferFormValues>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof OfferFormValues>(key: K, value: OfferFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function onNameChange(name: string) {
    update("name", name);
    if (!slugTouched) update("slug", slugify(name));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/offers/${initial!.id}` : "/api/admin/offers";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save the offer.");
        setSaving(false);
        return;
      }
      router.push("/admin/offers");
      router.refresh();
    } catch {
      setError("Could not save the offer. Check your connection and try again.");
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!isEdit) return;
    if (!confirm("Delete this offer? This can't be undone.")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/offers/${initial!.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/offers");
      router.refresh();
    } else {
      setError("Could not delete the offer.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          required
          value={values.name}
          onChange={(e) => onNameChange(e.target.value)}
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
        <label htmlFor="offerLine">Offer line</label>
        <select
          id="offerLine"
          value={values.offerLine}
          onChange={(e) => update("offerLine", e.target.value)}
        >
          <option value="BUSINESS_GROWTH_DESIGN">Business Growth Design</option>
          <option value="OPERATIONS_EXCELLENCE">Operations Excellence</option>
          <option value="BOTH">Both</option>
        </select>
      </div>

      <div>
        <label htmlFor="order">Order (1–6 on Ways We Help)</label>
        <input
          id="order"
          type="text"
          inputMode="numeric"
          value={values.order}
          onChange={(e) => update("order", Number(e.target.value.replace(/\D/g, "")) || 0)}
        />
      </div>

      <div>
        <label htmlFor="promise">Promise</label>
        <textarea
          id="promise"
          required
          style={{ minHeight: "5rem" }}
          value={values.promise}
          onChange={(e) => update("promise", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="whoFor">Who it&apos;s for</label>
        <textarea
          id="whoFor"
          required
          style={{ minHeight: "5rem" }}
          value={values.whoFor}
          onChange={(e) => update("whoFor", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="whoNotFor">Who it&apos;s NOT for</label>
        <textarea
          id="whoNotFor"
          required
          style={{ minHeight: "5rem" }}
          value={values.whoNotFor}
          onChange={(e) => update("whoNotFor", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="whatHappens">What happens</label>
        <textarea
          id="whatHappens"
          required
          style={{ minHeight: "5rem" }}
          value={values.whatHappens}
          onChange={(e) => update("whatHappens", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="commitment">Commitment (optional)</label>
        <textarea
          id="commitment"
          style={{ minHeight: "3.5rem" }}
          value={values.commitment}
          onChange={(e) => update("commitment", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price">Price (optional, free text)</label>
        <input id="price" type="text" value={values.price} onChange={(e) => update("price", e.target.value)} />
      </div>
      <div className="admin-form__row">
        <input
          id="priceIsDraft"
          type="checkbox"
          checked={values.priceIsDraft}
          onChange={(e) => update("priceIsDraft", e.target.checked)}
        />
        <label htmlFor="priceIsDraft" style={{ margin: 0 }}>
          Price is still a draft (shows a DRAFT pill here in admin; never shown to visitors)
        </label>
      </div>

      <div>
        <label htmlFor="story">Customer story (optional)</label>
        <textarea
          id="story"
          style={{ minHeight: "5rem" }}
          value={values.story}
          onChange={(e) => update("story", e.target.value)}
        />
      </div>
      <div className="admin-form__row">
        <input
          id="storyIsDraft"
          type="checkbox"
          checked={values.storyIsDraft}
          onChange={(e) => update("storyIsDraft", e.target.checked)}
        />
        <label htmlFor="storyIsDraft" style={{ margin: 0 }}>
          Story is still a draft
        </label>
      </div>

      <div>
        <label htmlFor="ctaType">Call to action type</label>
        <select id="ctaType" value={values.ctaType} onChange={(e) => update("ctaType", e.target.value)}>
          <option value="ENQUIRY_FORM">Enquiry form (on-site)</option>
          <option value="EXTERNAL_LINK">External link</option>
          <option value="INTERNAL_LINK">Internal link</option>
        </select>
      </div>

      <div>
        <label htmlFor="ctaLabel">CTA button label (optional)</label>
        <input
          id="ctaLabel"
          type="text"
          value={values.ctaLabel}
          onChange={(e) => update("ctaLabel", e.target.value)}
        />
      </div>

      {values.ctaType === "EXTERNAL_LINK" && (
        <div>
          <label htmlFor="externalUrl">External URL</label>
          <input
            id="externalUrl"
            type="text"
            required
            value={values.externalUrl}
            onChange={(e) => update("externalUrl", e.target.value)}
          />
        </div>
      )}

      {values.ctaType === "INTERNAL_LINK" && (
        <div>
          <label htmlFor="externalUrl">Internal path (e.g. /market-place#tools)</label>
          <input
            id="externalUrl"
            type="text"
            required
            value={values.externalUrl}
            onChange={(e) => update("externalUrl", e.target.value)}
          />
        </div>
      )}

      <div className="admin-form__row">
        <input
          id="isFree"
          type="checkbox"
          checked={values.isFree}
          onChange={(e) => update("isFree", e.target.checked)}
        />
        <label htmlFor="isFree" style={{ margin: 0 }}>
          Free offer
        </label>
      </div>

      <div className="admin-form__row">
        <input
          id="showInMarketPlace"
          type="checkbox"
          checked={values.showInMarketPlace}
          onChange={(e) => update("showInMarketPlace", e.target.checked)}
        />
        <label htmlFor="showInMarketPlace" style={{ margin: 0 }}>
          Also show in Market Place
        </label>
      </div>

      <div className="admin-form__row">
        <input
          id="published"
          type="checkbox"
          checked={values.published}
          onChange={(e) => update("published", e.target.checked)}
        />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on Ways We Help)
        </label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-form__actions">
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create offer"}
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
