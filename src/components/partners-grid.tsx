import { PARTNERS } from "@/lib/partners";

export function PartnersGrid() {
  return (
    <div className="themes__grid">
      {PARTNERS.map((p) => (
        <a className="theme" key={p.id} href={p.url}>
          <span className="theme__tag">Partner</span>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </a>
      ))}
    </div>
  );
}
