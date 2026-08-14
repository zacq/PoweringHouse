const STATS = [
  { num: "21", label: "Modules across Business Design and Pillars of Growth" },
  { num: "16", label: "Weeks from first module to certification" },
  { num: "1 hr", label: "A day — the whole commitment the programme asks for" },
];

export function ProofStats() {
  return (
    <section className="proof" aria-label="Programme at a glance">
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat__num">{s.num}</div>
          <p className="stat__label">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
