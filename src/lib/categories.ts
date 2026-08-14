import { Category } from "@prisma/client";

export interface CategoryMeta {
  value: Category;
  slug: string;
  tag: string;
  title: string;
  description: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    value: "BUSINESS_DESIGN",
    slug: "business-design",
    tag: "01 · Design",
    title: "Business Design",
    description:
      "The offer, the customer, the model. Deciding what the business actually is before scaling it.",
  },
  {
    value: "MONEY_DISCIPLINE",
    slug: "money-discipline",
    tag: "02 · Money",
    title: "Money Discipline",
    description:
      "Pricing, margin, records, the daily cash book. The habits that make the numbers tell the truth.",
  },
  {
    value: "GROWTH_SYSTEMS",
    slug: "growth-systems",
    tag: "03 · Growth",
    title: "Growth Systems",
    description:
      "Referrals, people, process. Turning what works once into something that runs without you.",
  },
];

export function categoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryByValue(value: Category): CategoryMeta {
  const found = CATEGORIES.find((c) => c.value === value);
  if (!found) throw new Error(`Unknown category value: ${value}`);
  return found;
}
