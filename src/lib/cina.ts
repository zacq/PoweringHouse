/**
 * CINA — Continuous Improvement Network Association landing page (/cina).
 * All copy transcribed verbatim from the client's screenshots; anything the
 * screenshots cut off or never showed is marked DRAFT.
 */

import type { LeadMagnet } from "@/components/lead-magnet-modal";

export const CINA_TICKER: string[] = [
  // DRAFT: the start of this item is cut off in the screenshot — only "…va Stanley, Nairobi. Reserve your seat." is visible.
  "☕ Executive Roundtable Breakfast — Sarova Stanley, Nairobi. Reserve your seat.",
  "🔔 CINA is growing — invite a fellow business owner to join the network.",
  // DRAFT: the end of this item is cut off in the screenshot after "diagnose you…".
  "📊 Free 5-minute Self-Assessment live now — diagnose your operational health.",
];

export const CINA_SYMPTOMS: string[] = [
  "Costs & wastages keep increasing",
  "Profit not growing despite continuous effort",
  "No visibility into business performance",
  "Cash flow challenges",
  "Busy team but low productivity",
  "Increased customer complaints",
  "Growth creating chaos",
  "Key decisions depending on few people",
  "Too much firefighting",
  "Strategy not translating into execution",
];

export const CINA_QUESTIONS: string[] = [
  "What operational issue is currently limiting growth?",
  "Where do you believe money is leaking in your business?",
  "What processes create the most customer complaints?",
  "How much management time is spent firefighting?",
  "Which KPIs concern you most right now — and do you really own any?",
  "If you could fix one operational problem this quarter, what would it be?",
  "What's the productivity level of your whole team and machines?",
  "What's preventing your business from scaling faster?",
  "How confident are you that your processes can support future growth?",
  "Do you have a 5-year strategy — and do daily operations execute to achieve it?",
];

export const CINA_PILLARS: string[] = [
  "Profitability",
  "Cash Flow",
  "Customer Satisfaction",
  "Growth",
  "Sustainability",
];

export type CinaProgramAction =
  | { kind: "register"; label: string }
  | { kind: "breakfast"; label: string }
  | { kind: "diagnose"; label: string }
  | { kind: "link"; label: string; href: string };

export interface CinaProgram {
  icon: string;
  tag: string;
  title: string;
  description: string;
  action: CinaProgramAction;
}

export const CINA_PROGRAMS: CinaProgram[] = [
  {
    icon: "📹",
    tag: "Free",
    title: "Free Monthly Zooms",
    description: "Monthly virtual sessions for awareness and practical insights on operations improvement.",
    action: { kind: "register", label: "Register Interest" },
  },
  {
    icon: "☕",
    tag: "Paid · In person",
    title: "Executive Roundtable Breakfast",
    description: "Exclusive in-person dialogue for Business Owners, CEOs and Executive Decision Makers.",
    action: { kind: "breakfast", label: "Reserve your seat & get the brief" },
  },
  {
    icon: "📊",
    tag: "Free · 5 min",
    title: "Free Self-Assessment",
    description: "Diagnose your operational health across 10 dimensions in under 5 minutes.",
    action: { kind: "diagnose", label: "Take the Assessment" },
  },
  {
    icon: "▶️",
    tag: "Free content",
    title: "YouTube: Step of Power",
    description: "Content that builds awareness and drives action toward operational excellence.",
    // DRAFT: YouTube channel URL not yet supplied.
    action: { kind: "link", label: "Watch & Subscribe", href: "#" },
  },
  {
    icon: "📘",
    tag: "Low cost",
    title: "Monthly Low-Cost Training",
    description:
      "Optimizing staff potential through the practice of operations excellence. See the programs outline.",
    action: { kind: "register", label: "View Programs" },
  },
  {
    icon: "🤝",
    tag: "Free · 1:1",
    title: "1:1 Physical Assessment",
    description: "A free face-to-face dialogue and assessment — plus free affiliate membership.",
    action: { kind: "register", label: "Request a Visit" },
  },
];

/**
 * Executive Breakfast registration — copy from CINA_Executive_Breakfast_Improved.pdf.
 * Registering unlocks the brief as a download; email delivery replaces this later.
 */
export const CINA_BREAKFAST: LeadMagnet = {
  list: "cina-breakfast",
  pdf: "/downloads/cina-executive-breakfast.pdf",
  pdfName: "CINA Executive Breakfast — Session Brief.pdf",
  eyebrow: "Executive Round Table Dialogue & Breakfast",
  title: "Business Excellence Is Your Key Priority",
  theme: "Reclaim it — Refill your potential.",
  reasons: [
    {
      t: "Who should attend",
      d: "Chief executives, managing directors, owners and heads of department committed to sustainable growth.",
    },
    { t: "What you get", d: "Practical frameworks, candid peer insight and strategies you can act on the same week." },
    { t: "The format", d: "An executive breakfast with facilitated dialogue, real case sharing and unhurried networking." },
  ],
  quote: "Your refreshing morning with real return on investment.",
  briefTitle: "Get the session brief",
  briefLine: "The seven shifts, the seven pillars and how the morning runs — download it as soon as you register.",
  cta: "Reserve my seat & get the brief",
  fine: "No spam. Just the brief, then the round table details from CINA.",
  doneTitle: "Your seat request is in.",
  doneText: "Download the session brief below — we’ll confirm the date and venue with you directly.",
  downloadLabel: "Download the session brief (PDF)",
};

/**
 * Free e-resource on /universe-of-freedom — copy from CINA_Craftsmanship_Legacy_V1.pdf.
 * Same pattern as the breakfast: register, then download (email delivery later).
 */
export const CINA_CRAFTSMANSHIP: LeadMagnet = {
  list: "cina-craftsmanship",
  pdf: "/downloads/cina-craftsmanship-legacy.pdf",
  pdfName: "CINA — Craftsmanship Legacy.pdf",
  eyebrow: "Free e-resource · The Continuous Improvement Model",
  title: "Craftsmanship Legacy",
  theme: "How one person can drive BIG results from very small, coordinated efforts.",
  reasons: [
    {
      t: "Seven deliberate stages",
      d: "Beginning, Culture, Implementation, Empowering, Visible Progress, Embedding — and The Legacy.",
    },
    {
      t: "75% less time to reach competency",
      d: "Training Within Industry and standardised methods: competency in about three months, not twelve.",
    },
    {
      t: "One model. Every operation.",
      d: "Tailoring, warehousing, transport, manufacturing and wholesale — if people, materials and time move through it, the model applies.",
    },
  ],
  quote: "Equipment can be bought. Mindset must be built.",
  briefTitle: "Get the Craftsmanship Legacy guide",
  briefLine:
    "15 pages: the seven-stage roadmap, PDCA floor walks, 5S and vision boards, and what changes for the owner — download it as soon as you register.",
  cta: "Send me the guide",
  fine: "No spam. Just the guide, then occasional notes from CINA.",
  doneTitle: "Your guide is ready.",
  doneText: "Reclaim. Refill. Repeat. — start with one process and one owner this week.",
  downloadLabel: "Download Craftsmanship Legacy (PDF)",
};

export const CINA_PHILOSOPHY: { title: string; description: string }[] = [
  {
    title: "Business Money Operations",
    description: "Optimizing cash flow and setting up finance structures to close cash leakages.",
  },
  {
    title: "Operations Improvement & Excellence",
    description:
      "Building from basics — process flow, waste reduction, value stream, productivity and workplace organization.",
  },
  {
    title: "Continuous Improvement Practice",
    description:
      "Change is people-driven. We capacity-build your team with continuous professional programs — low investment, real improvement.",
  },
];

export const CINA_SCOPE: string[] = [
  "Operations Improvement & Excellence",
  "Team Productivity",
  "Business Finance Operations",
  "Sales Performance & Business Development",
  "Logistics & Supply Value Chain",
  "ESG Framework",
  "Market Intelligence & Data Analytics",
  "Strategy Deployment",
  "ISO Management Systems",
];

/**
 * Continuous Improvement Framework — the next steps the page leads prospects to.
 * DRAFT: titles from the brief ("1:1 / Free OpEx assessment, cohort training"); descriptions
 * reuse this page's own program copy until the client supplies dedicated wording.
 */
export const CINA_NEXT_STEPS: { tag: string; title: string; description: string; cta: string }[] = [
  {
    tag: "Free · 1:1",
    title: "Free OpEx Assessment",
    description: "A free face-to-face dialogue and assessment — plus free affiliate membership.",
    cta: "Book my free assessment",
  },
  {
    tag: "Cohort",
    title: "Cohort Training",
    description: "Optimizing staff potential through the practice of operations excellence.",
    cta: "Register for the next cohort",
  },
];

export interface CinaLead {
  name: string;
  role: string;
  specialism: string;
  photo: string;
}

export const CINA_LEADS: CinaLead[] = [
  {
    name: "Anthony Maina",
    role: "CEO — Food Cloud Mega",
    specialism: "Market Intelligence & Data Analytics",
    photo: "/images/cina/anthony-maina.jpg",
  },
  {
    name: "Gachoka Kang'ata",
    role: "CEO — Cygnus Safety Consulting",
    specialism: "Business Finance Operations & Excellence",
    photo: "/images/cina/gachoka-kangata.jpg",
  },
  {
    name: "Esther Maina",
    role: "CEO — M-Link Group International",
    specialism: "Business Development",
    photo: "/images/cina/esther-maina.jpg",
  },
  {
    name: "Julius Mugo",
    role: "CEO — Quest Spark Consulting",
    specialism: "Igniting Potential & Productivity of Team",
    photo: "/images/cina/julius-mugo.jpg",
  },
  {
    name: "Newton Opiyo",
    role: "Sales Consultant & Business Coach — Bannem Business Consultancy",
    specialism: "Sales Performance & Business Development",
    photo: "/images/cina/newton-opiyo.jpg",
  },
];

// DRAFT: LinkedIn page URL not yet supplied.
export const CINA_LINKEDIN_URL = "#";
