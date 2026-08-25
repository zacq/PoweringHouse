import { TOOLS } from "@/lib/tools";

/** Pass `limit` to show only the first N tools (used for the home page lead-magnet slot). */
export function ToolsGrid({ limit }: { limit?: number }) {
  const tools = typeof limit === "number" ? TOOLS.slice(0, limit) : TOOLS;

  return (
    <div className="themes__grid">
      {tools.map((tool) => (
        <div className="theme" key={tool.slug}>
          <span className="theme__tag">Free tool</span>
          <h3>{tool.name}</h3>
          <p>{tool.promise}</p>
        </div>
      ))}
    </div>
  );
}
