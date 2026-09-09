export interface BeehiivPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: Date | null;
}

interface BeehiivApiPost {
  id: string;
  title: string;
  subtitle?: string;
  preview_text?: string;
  web_url: string;
  publish_date?: number;
  created?: number;
  hidden_from_feed?: boolean;
}

/**
 * Fails soft (empty array) on missing config or API errors — Beehiiv is an
 * external dependency and must never take the Seed of Power page down with it.
 */
export async function fetchBeehiivPosts(): Promise<BeehiivPost[]> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return [];

  const params = new URLSearchParams({
    status: "confirmed",
    audience: "free",
    order_by: "publish_date",
    direction: "desc",
    limit: "20",
  });

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts?${params}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error(`Beehiiv API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = (await res.json()) as { data?: BeehiivApiPost[] };

    return (json.data ?? [])
      .filter((p) => !p.hidden_from_feed)
      .map((p) => ({
        id: p.id,
        title: p.title,
        excerpt: p.subtitle || p.preview_text || "",
        url: p.web_url,
        publishedAt: p.publish_date
          ? new Date(p.publish_date * 1000)
          : p.created
            ? new Date(p.created * 1000)
            : null,
      }));
  } catch (err) {
    console.error("Beehiiv fetch failed:", err);
    return [];
  }
}
