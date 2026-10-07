"use client";

import { useState } from "react";
import { RegisterModal } from "@/components/register-modal";
import { Expandable } from "@/components/expandable";
import { CINA_SYMPTOMS } from "@/lib/cina";

// Semicircle gauge geometry (viewBox 0 0 240 140, centre 120,120, radius 100).
const ARC = "M 20 120 A 100 100 0 0 1 220 120";
const ARC_LENGTH = Math.PI * 100;

export function SymptomChecker() {
  const [selected, setSelected] = useState<string[]>([]);
  // DRAFT: weighting to confirm — the screenshots only ever show 0%, so each symptom counts equally for now.
  const percent = Math.round((selected.length / CINA_SYMPTOMS.length) * 100);

  function toggle(symptom: string) {
    setSelected((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]));
  }

  const subject = selected.length
    ? `CINA — Diagnostic: ${CINA_SYMPTOMS.filter((s) => selected.includes(s)).join(", ")}`
    : "CINA — Diagnostic";

  return (
    <section className="cina-section cina-section--navy cina-diagnose" id="diagnose" aria-labelledby="diagnose-title">
      <div className="cina-wrap cina-diagnose__grid">
        <div>
          <p className="cina-eyebrow cina-eyebrow--coral">Are you awake at night?</p>
          <h2 id="diagnose-title" className="cina-h2">
            Imagining how your business is not responding...
          </h2>
          <p className="cina-lede">
            Tap every symptom that sounds familiar. Watch how much potential is sitting locked up — value CINA helps
            you reclaim.
          </p>
          <div role="group" aria-label="Symptoms">
            <Expandable className="cina-symptoms" initial={6} moreLabel="Show all symptoms" tone="dark">
            {CINA_SYMPTOMS.map((s) => {
              const on = selected.includes(s);
              return (
                <label key={s} className="cina-symptom" data-on={on || undefined}>
                  <input type="checkbox" checked={on} onChange={() => toggle(s)} />
                  <span className="cina-symptom__box" aria-hidden="true" />
                  <span>{s}</span>
                </label>
              );
            })}
            </Expandable>
          </div>
        </div>

        <div className="cina-gauge-panel">
          <p className="cina-gauge-panel__label">Estimated reclaimable potential</p>
          <div className="cina-gauge" role="img" aria-label={`${percent}% estimated reclaimable potential`}>
            <svg viewBox="0 0 240 140" aria-hidden="true">
              <path d={ARC} className="cina-gauge__track" />
              <path
                d={ARC}
                className="cina-gauge__fill"
                strokeDasharray={ARC_LENGTH}
                strokeDashoffset={ARC_LENGTH * (1 - percent / 100)}
              />
            </svg>
            <div className="cina-gauge__value">
              <span className="cina-gauge__num">{percent}</span>
              <span className="cina-gauge__pct">%</span>
            </div>
            <span className="cina-gauge__hint">
              {selected.length ? `${selected.length} of ${CINA_SYMPTOMS.length} selected` : "Select what applies"}
            </span>
          </div>
          <p className="cina-gauge-panel__note">
            Most leaders find <strong>3 or more</strong> of these draining the business at once.
          </p>
          <RegisterModal label="Reclaim it — Let's Connect" subject={subject} className="cina-btn cina-btn--amber cina-btn--block">
            Reclaim it — Let&apos;s Connect <span aria-hidden="true">→</span>
          </RegisterModal>
        </div>
      </div>
    </section>
  );
}
