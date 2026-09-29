export interface AirtableRecord<T> {
  id: string;
  fields: Partial<T>;
}

function config() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  return token && baseId ? { token, baseId } : null;
}

function tableUrl(baseId: string, table: string) {
  return `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`;
}

/**
 * Fails soft (empty array) on missing config or API errors, so a content
 * section shows its empty state instead of taking the page down.
 */
export async function listRecords<T>(
  table: string,
  options: { filterByFormula?: string; sort?: { field: string; direction?: "asc" | "desc" }[] } = {}
): Promise<AirtableRecord<T>[]> {
  const cfg = config();
  if (!cfg) return [];

  const params = new URLSearchParams();
  if (options.filterByFormula) params.set("filterByFormula", options.filterByFormula);
  options.sort?.forEach((s, i) => {
    params.set(`sort[${i}][field]`, s.field);
    params.set(`sort[${i}][direction]`, s.direction ?? "asc");
  });

  try {
    const res = await fetch(`${tableUrl(cfg.baseId, table)}?${params}`, {
      headers: { Authorization: `Bearer ${cfg.token}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`Airtable list ${table} error: ${res.status} ${res.statusText}`);
      return [];
    }
    const json = (await res.json()) as { records?: AirtableRecord<T>[] };
    return json.records ?? [];
  } catch (err) {
    console.error(`Airtable list ${table} failed:`, err);
    return [];
  }
}

/** Uncached single-record lookup; null when missing, misconfigured, or on API error. */
export async function getRecord<T>(table: string, id: string): Promise<AirtableRecord<T> | null> {
  const cfg = config();
  if (!cfg || !/^rec[A-Za-z0-9]{14}$/.test(id)) return null;

  try {
    const res = await fetch(`${tableUrl(cfg.baseId, table)}/${id}`, {
      headers: { Authorization: `Bearer ${cfg.token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as AirtableRecord<T>;
  } catch (err) {
    console.error(`Airtable get ${table}/${id} failed:`, err);
    return null;
  }
}

/** Throws on failure — a lost form submission must surface to the user. */
export async function createRecord(table: string, fields: Record<string, unknown>): Promise<void> {
  const cfg = config();
  if (!cfg) throw new Error("Airtable is not configured");

  const res = await fetch(tableUrl(cfg.baseId, table), {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields, typecast: true }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Airtable create ${table} error: ${res.status} ${await res.text()}`);
  }
}
