import { TOOLS } from "@/lib/tools";
import { RegisterModal } from "./register-modal";

/** Pass `limit` to show only the first N tools (used for the home page lead-magnet slot). */
export function ToolsGrid({ limit }: { limit?: number }) {
  const tools = typeof limit === "number" ? TOOLS.slice(0, limit) : TOOLS;

  return (
    <div className="themes__grid line-cards line-cards--four">
      {tools.map((tool) => (
        <div className="theme line-card" key={tool.slug}>
          <span className="theme__tag">Free tool</span>
          <h3>{tool.name}</h3>
          <p>{tool.promise}</p>
          {/* DRAFT: tool files not supplied yet — requests go to Contact Messages until each tool has a download. */}
          <RegisterModal label="Get this tool" subject={`Free tool request — ${tool.name}`} className="line-card__cta">
            Get this tool <span aria-hidden="true">→</span>
          </RegisterModal>
        </div>
      ))}
    </div>
  );
}
