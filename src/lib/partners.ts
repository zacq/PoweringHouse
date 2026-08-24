export interface Partner {
  id: string;
  name: string;
  /** DRAFT: no real logo asset yet — falls back to a text wordmark until one is supplied. */
  logo?: string;
  /** DRAFT: content-map v2 §4 names the partnership but not this one-liner. */
  description: string;
  /**
   * DRAFT: real outbound URL not yet known — content-map v2 names the partner but
   * never gives its web address. Placeholder "#" until Gachoka supplies the real
   * link; do not guess a domain, a wrong guess would send visitors to the wrong
   * place (or a domain we don't control) silently.
   */
  url: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "refill",
    name: "Refill Business Excellence",
    description: "Operations Excellence, delivered — waste, productivity, and compounding growth.",
    url: "#",
  },
  {
    id: "quest-spark",
    name: "Quest Spark",
    description: "Partnership description pending.",
    url: "#",
  },
  {
    id: "cygnus",
    name: "Cygnus Consulting",
    description: "Gachoka's consulting practice.",
    url: "#",
  },
  {
    id: "ekshop",
    name: "EKShop",
    description: "E-commerce and point-of-sale, for businesses ready to list and sell.",
    url: "#",
  },
];

export function partnerById(id: string): Partner {
  const found = PARTNERS.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown partner id: ${id}`);
  return found;
}
