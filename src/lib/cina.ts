/**
 * CINA — Continuous Improvement Network Association landing page (/cina).
 * All copy transcribed verbatim from the client's screenshots; anything the
 * screenshots cut off or never showed is marked DRAFT.
 */

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
    tag: "Free · In person",
    title: "Executive Roundtable Breakfast",
    description: "Exclusive in-person dialogue for Business Owners, CEOs and Executive Decision Makers.",
    action: { kind: "register", label: "Reserve Your Seat" },
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
