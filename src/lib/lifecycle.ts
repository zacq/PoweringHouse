export type LifecycleStageId = "EGG" | "LARVA" | "PUPA" | "ADULT";

export interface LifecycleStage {
  id: LifecycleStageId;
  slug: string;
  label: string;
  revenueRange: string;
  constraint: string;
  /** DRAFT: content-map v2 §1, "Dominant constraint" column — needs Gachoka's sign-off. */
  constraintCopy: string;
  /** Anchor on the home page this stage's "click a stage" link scrolls to. */
  offerLineAnchor: "growth-design" | "operations-excellence" | "offer-lines";
}

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: "EGG",
    slug: "egg",
    label: "Egg",
    revenueRange: "Pre-revenue / idea",
    constraint: "Clarity",
    constraintCopy: "Clarity — what is this business actually selling?",
    offerLineAnchor: "growth-design",
  },
  {
    id: "LARVA",
    slug: "larva",
    label: "Larva",
    revenueRange: "0 – KES 10M",
    constraint: "Structure",
    constraintCopy: "Structure — it runs on the owner and nothing repeats.",
    offerLineAnchor: "growth-design",
  },
  {
    id: "PUPA",
    slug: "pupa",
    label: "Pupa",
    revenueRange: "KES 10M – 100M",
    constraint: "Transition",
    constraintCopy: "Transition — systems and people must replace the founder.",
    offerLineAnchor: "offer-lines",
  },
  {
    id: "ADULT",
    slug: "adult",
    label: "Adult",
    revenueRange: "KES 100M+",
    constraint: "Efficiency",
    constraintCopy: "Efficiency — waste, margin, and compounding.",
    offerLineAnchor: "operations-excellence",
  },
];

export function lifecycleStageBySlug(slug: string): LifecycleStage | undefined {
  return LIFECYCLE_STAGES.find((s) => s.slug === slug);
}
