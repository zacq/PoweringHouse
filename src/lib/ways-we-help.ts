export type WayCtaType = "SELF_PACED" | "REG_FORM" | "UNIVERSE";

export interface Way {
  slug: string;
  tag: string;
  title: string;
  blurb: string;
  cta: WayCtaType;
}

/** content-map v2 Menu 2 — the six boxes, verbatim. */
export const WAYS_WE_HELP: Way[] = [
  {
    slug: "free-start-pack",
    tag: "Free",
    title: "FREE Start Pack",
    blurb: "Understand entrepreneurship.",
    cta: "SELF_PACED",
  },
  {
    slug: "free-360-entrepreneurial-community",
    tag: "Free",
    title: "FREE 360° Entrepreneurial Community",
    blurb: "Join your peers. Don't walk alone. Enjoy well-curated programmes.",
    cta: "REG_FORM",
  },
  {
    slug: "1-1-clarity-session",
    tag: "1:1",
    title: "1:1 Clarity Session",
    blurb: "Don't walk in doubt. Doubts will kill all your dreams. Feel welcome.",
    cta: "REG_FORM",
  },
  {
    slug: "boot-camp-business-design-coaching",
    tag: "Coaching",
    title: "Boot Camp — Business Design Coaching",
    blurb: "Design your micro business to grow.",
    cta: "REG_FORM",
  },
  {
    slug: "self-paced-master-classes",
    tag: "Self-paced",
    title: "Self-Paced Master Classes",
    blurb:
      "Build your business through continuous learning. Well-designed programmes — Elements of Business Design & Pillars of Growth.",
    cta: "SELF_PACED",
  },
  {
    slug: "productivity-tools",
    tag: "Tools",
    title: "Productivity Tools",
    blurb: "Real freedom. Tools that let your business run beyond yourself — the power of compounding.",
    cta: "UNIVERSE",
  },
];
