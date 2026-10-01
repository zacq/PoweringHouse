/**
 * The offers shown on the home page "What we offer" section, by track.
 * PRICES: set `price` on any paid offer (e.g. "KES 15,000") and it replaces
 * "Price on request" on the card. Prices pending from the client.
 * DRAFT: the one-line descriptions are drawn from each offer's own document; confirm wording.
 */

export type OfferAction =
  | { kind: "link"; label: string; href: string }
  | { kind: "quote"; label: string }
  | { kind: "craftsmanship"; label: string }
  | { kind: "breakfast"; label: string };

export interface Offer {
  id: string;
  title: string;
  badge: string;
  paid: boolean;
  description: string;
  price?: string;
  /** Shown under the price, e.g. for the assessment's free/paid split. */
  priceNote?: string;
  actions: OfferAction[];
}

export interface OfferTrack {
  id: string;
  title: string;
  blurb: string;
  more: { label: string; href: string };
  offers: Offer[];
}

export const OFFER_TRACKS: OfferTrack[] = [
  {
    id: "micro-business",
    title: "Micro Business",
    blurb: "For founders turning hustle into a business that grows.",
    more: { label: "All ways we help", href: "/ways-we-help" },
    offers: [
      {
        id: "awareness",
        title: "Awareness Level",
        badge: "Free e-resource",
        paid: false,
        description: "The Micro Business Growth Kit — 5 levels from awareness to your next 24 hours.",
        actions: [{ kind: "link", label: "Get the free kit", href: "/awareness" }],
      },
      {
        id: "growth-design",
        title: "Micro Business Growth Design",
        badge: "Paid mentorship",
        paid: true,
        description: "Mentorship to design your micro business to grow — the elements, the pillars and the tools.",
        actions: [{ kind: "quote", label: "Request a quote" }],
      },
    ],
  },
  {
    id: "business-excellence",
    title: "Business Excellence",
    blurb: "For owners and executives growing the value already inside the business.",
    more: { label: "Explore CINA", href: "/cina" },
    offers: [
      {
        id: "craftsmanship",
        title: "Craftsmanship Awareness",
        badge: "Free e-resource",
        paid: false,
        description: "The Craftsmanship Legacy guide — big results from very small, coordinated efforts.",
        actions: [{ kind: "craftsmanship", label: "Get the free guide" }],
      },
      {
        id: "executive-breakfast",
        title: "Executive Breakfast",
        badge: "Paid",
        paid: true,
        description: "An executive round table dialogue and breakfast — structured dialogue with a real return.",
        actions: [{ kind: "breakfast", label: "Reserve & request a quote" }],
      },
      {
        id: "operation-assessment",
        title: "Operation Assessment",
        badge: "Free online · Advanced paid",
        paid: true,
        description: "Diagnose your operational health online for free, or book an advanced expert assessment.",
        price: "Free online",
        priceNote: "Advanced: price on request",
        actions: [
          { kind: "link", label: "Take the free online assessment", href: "/cina#diagnose" },
          { kind: "quote", label: "Request advanced assessment quote" },
        ],
      },
      {
        id: "cohort-training",
        title: "Cohort Training",
        badge: "Paid",
        paid: true,
        description: "Low-investment cohort training — your team learns to run PDCA, 5S and standard work.",
        actions: [{ kind: "quote", label: "Request a quote" }],
      },
    ],
  },
];
