/**
 * The offers shown on the home page "What we offer" section, by track.
 * PRICES: set `price` on any paid offer (e.g. "KES 15,000") and it replaces
 * "Price on request" on the card. Prices pending from the client.
 * DRAFT: the one-line descriptions are drawn from each offer's own document; confirm wording.
 */

import type { LeadMagnet } from "@/components/lead-magnet-modal";

export type OfferAction =
  | { kind: "link"; label: string; href: string }
  | { kind: "quote"; label: string }
  | { kind: "craftsmanship"; label: string }
  | { kind: "breakfast"; label: string }
  | { kind: "coaching"; label: string };

/**
 * Micro Business Growth Design popup — copy from "Personal Brand & Business Coaching.pdf".
 * Register, then download the programme outline (email delivery later); the sign-up is the quote request.
 */
export const PH_COACHING: LeadMagnet = {
  list: "ph-coaching",
  pdf: "/downloads/ph-personal-brand-business-coaching.pdf",
  pdfName: "Powering House — Personal Brand & Business Coaching.pdf",
  eyebrow: "A two-part growth journey",
  title: "Know who you are. Build what you do.",
  theme:
    "You already run a business. The next step is making sure it carries the right person, the right purpose and the right promise into the market.",
  reasons: [
    {
      t: "Part one · The Personal Brand Program",
      d: "Find your purpose and own your position: purpose & identity, distinct positioning, voice & message, and market presence.",
    },
    {
      t: "Part two · Micro Business Coaching Program",
      d: "Turn your brand into a business that performs — five modules from your value proposition to a personalised 90-day growth plan.",
    },
    {
      t: "You leave with",
      d: "A brand you can state in one sentence, live consistently, and take to market with confidence.",
    },
  ],
  quote: "Brand gives your business its voice. Business gives your brand its proof.",
  briefTitle: "Get the programme outline",
  briefLine:
    "Both parts on one page — the four brand pillars and the five coaching modules with their key outcomes. Download it as soon as you register.",
  cta: "Get the outline & request a quote",
  fine: "No spam. Just the outline, then a price quote from Powering House.",
  doneTitle: "Your programme outline is ready.",
  doneText:
    "Let’s start with a conversation about where you are and where you are called to go — we’ll follow up with a price quote.",
  downloadLabel: "Download the programme outline (PDF)",
};

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
        description:
          "A two-part growth journey: the Personal Brand Program, then Micro Business Coaching — five modules to a 90-day growth plan.",
        actions: [{ kind: "coaching", label: "Get the programme & request a quote" }],
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
