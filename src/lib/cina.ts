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

/** "Why the Network Matters" — the six-step cycle (CINA Organisational Profile §08). */
export const CINA_CYCLE: string[] = [
  "See the problem",
  "Understand the process",
  "Find the cause",
  "Improve the work",
  "Measure the result",
  "Sustain the gain",
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

/**
 * Copy from the CINA Organisational Profile (Sept 2026). Section numbers refer to it.
 */
export const CINA_PROFILE = {
  tagline: "Driving the Practice of Operational Excellence",
  positioning: "A Professional Network for Continuous Improvement and Operational Excellence Practitioners",
  // §01 Executive Summary
  summary:
    "A professional community of Operational Excellence practitioners dedicated to enabling organisations to reclaim growth through excellence.",
  summaryMore:
    "CINA exists to make improvement a normal way of working — not an occasional project. We connect people, build capability, share knowledge and promote practical improvement practices that enable organisations to achieve sustainable performance excellence.",
  belief:
    "Operational Excellence is not simply about processes, tools or technology. It is about creating organisations where people continuously improve processes, eliminate waste, make better decisions and consistently deliver value to customers and stakeholders.",
  // §02 Who We Are
  whoWeAre:
    "CINA is a community of Operational Excellence practitioners, driven by experts with a focus on enabling businesses to reclaim their growth through excellence. We believe in building a body of knowledge that is replicable widely — turning proven improvement practice into shared professional capital.",
  bringTogether: [
    "Operational Excellence Practitioners",
    "Business Leaders & Executives",
    "Managers & Improvement Champions",
    "Consultants & Academics",
  ],
  // §03 Purpose, Vision & Mission
  pvm: [
    {
      t: "Our Purpose",
      d: "To build a strong community of practitioners that advances the knowledge, application and adoption of Continuous Improvement and Operational Excellence — making improvement a normal way of working, not an occasional project.",
    },
    {
      t: "Our Vision",
      d: "To become a leading network for the advancement of Continuous Improvement and Operational Excellence practice.",
    },
    {
      t: "Our Mission",
      d: "To connect people, build capability, share knowledge and promote practical improvement practices that enable organisations to achieve sustainable performance excellence.",
    },
  ],
  // §08 Why the Network Matters
  whyMatters:
    "Many organisations invest in strategies, technology and systems but struggle to translate these investments into consistent operational performance. CINA seeks to close this gap by promoting a culture of disciplined, everyday improvement.",
  whyObjective:
    "Our objective is to help create organisations where improvement is embedded in everyday management rather than dependent on isolated improvement projects.",
  // §11 Our Commitment
  commitment: [
    "Continuous Improvement is the practice.",
    "Operational Excellence is the performance ambition.",
    "People are the drivers.",
    "Sustainable results are the outcome.",
  ],
  commitmentClose:
    "The Continuous Improvement Network Association exists to connect the people, knowledge and practices required to make this possible.",
  // §12 Our Leadership
  leadershipIntro:
    "CINA is convened and led by a founding team of practitioners and entrepreneurs committed to building the Network's professional community and body of practice.",
};

/** §04 What We Stand For — five enduring principles. */
export const CINA_PRINCIPLES: { title: string; description: string }[] = [
  {
    title: "People First",
    description:
      "Improvement happens through people. We promote employee involvement, leadership capability, teamwork and a culture where people are encouraged to identify and solve problems.",
  },
  {
    title: "Customer Value",
    description: "Improvement must ultimately create value for customers, stakeholders and the organisation.",
  },
  {
    title: "Process Discipline",
    description: "Strong performance requires clearly defined, understood, measured and continuously improved processes.",
  },
  {
    title: "Evidence-Based Decisions",
    description:
      "We encourage the use of data, facts, financial information and performance measures to identify problems and guide improvement.",
  },
  {
    title: "Sustainable Improvement",
    description:
      "Operational Excellence is not a one-time intervention. We promote systems, routines and behaviours that sustain improvement over time.",
  },
];

/** §05 Areas of Practice. */
export const CINA_PRACTICE_AREAS: string[] = [
  "Continuous Improvement & Lean Management",
  "Business Process Improvement",
  "Process Excellence & Process Management",
  "Supply Chain & Inventory Excellence",
  "Operational Performance Management",
  "Financial & Operational Performance",
  "Waste & Cost Reduction",
  "Digital Transformation & Automation",
  "Productivity Improvement",
  "Change Management",
  "Quality Management",
  "Leadership for Operational Excellence",
  "People, Culture & Employee Engagement",
  "Innovation & Business Improvement",
  "Problem Solving & Root Cause Analysis",
  "ESG Adoption",
  "Performance Measurement & KPIs",
  "Management Systems Adoption",
];

export const CINA_METHODOLOGIES: string[] = [
  "Lean",
  "Kaizen",
  "Six Sigma",
  "5S",
  "Value Stream Mapping",
  "PDCA",
  "Root Cause Analysis",
  "Standard Work",
  "Visual Management",
];

/** §06 What We Do. */
export const CINA_WHAT_WE_DO: { letter: string; title: string; description: string }[] = [
  {
    letter: "A",
    title: "Build Professional Capability",
    description:
      "Learning opportunities, workshops, masterclasses, practical forums and professional development programmes for people involved in improvement.",
  },
  {
    letter: "B",
    title: "Create a Community of Practice",
    description: "We connect practitioners and organisations to exchange experiences, lessons, tools, case studies and solutions.",
  },
  {
    letter: "C",
    title: "Promote Practical Application",
    description: "We encourage members to move beyond theory by applying improvement principles to real organisational challenges.",
  },
  {
    letter: "D",
    title: "Develop & Share Knowledge",
    description:
      "We facilitate research, publications, case studies, benchmarking, thought leadership and practical improvement resources.",
  },
  {
    letter: "E",
    title: "Recognise Improvement Practice",
    description:
      "We promote recognition of individuals, teams and organisations demonstrating meaningful contributions to Continuous Improvement and Operational Excellence.",
  },
  {
    letter: "F",
    title: "Support Organisations",
    description:
      "Through the Network and its professional community, organisations can access knowledge, practitioners, improvement resources and opportunities for collaboration.",
  },
];

/** §07 Our Professional Community. */
export const CINA_COMMUNITY: string[] = [
  "Business Owners & Entrepreneurs",
  "CEOs & Senior Executives",
  "Operations Managers",
  "Finance & Business Performance Professionals",
  "Quality Professionals",
  "Supply Chain Professionals",
  "HR & People Leaders",
  "Continuous Improvement Practitioners",
  "Lean & Six Sigma Practitioners",
  "Consultants & Trainers",
  "Engineers & Technical Professionals",
  "Academics & Researchers",
  "Students & Emerging Practitioners",
  "Organisations Pursuing Operational Excellence",
];

/** §09 Strategic Priorities. */
export const CINA_PRIORITIES: { title: string; description: string }[] = [
  { title: "Capability", description: "Developing competent Continuous Improvement and Operational Excellence practitioners." },
  { title: "Community", description: "Building a strong professional network for knowledge exchange and collaboration." },
  { title: "Practice", description: "Encouraging practical application of improvement methodologies." },
  { title: "Standards & Professionalism", description: "Promoting ethical, competent and responsible improvement practice." },
  { title: "Research & Knowledge", description: "Generating and sharing relevant knowledge, evidence and case studies." },
  { title: "Recognition", description: "Celebrating individuals, teams and organisations advancing improvement." },
  {
    title: "Organisational Impact",
    description:
      "Connecting improvement activity to measurable outcomes — productivity, quality, customer experience, cost, profitability, employee engagement and sustainability.",
  },
];

/** §10 Our Desired Impact. */
export const CINA_IMPACT: string[] = [
  "Employees actively participate in improvement.",
  "Leaders manage through facts and performance measures.",
  "Processes are visible, understood and continuously improved.",
  "Waste and inefficiencies are systematically identified and removed.",
  "Problems are solved at their root rather than repeatedly treated as symptoms.",
  "Improvement is connected to financial and business results.",
  "Teams have the capability to sustain improvements.",
  "Operational Excellence becomes part of organisational culture.",
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
    name: "Gachoka Kang'ata",
    role: "Lead Chief Executive",
    specialism: "Founder, Powering House",
    photo: "/images/cina/gachoka-kangata.jpg",
  },
  {
    name: "Newton Opiyo",
    role: "Lead, Business Development",
    specialism: "Founder, Bannem Business Consultancy",
    photo: "/images/cina/newton-opiyo.jpg",
  },
  {
    name: "Julius Mwangi",
    role: "Lead, Operations Coordination",
    specialism: "Founder, Quest Spark Consulting",
    photo: "/images/cina/julius-mwangi.jpg",
  },
];

// DRAFT: LinkedIn page URL not yet supplied.
export const CINA_LINKEDIN_URL = "#";
