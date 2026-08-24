import Image from "next/image";

const CREDENTIALS = [
  "Founder, Powering House",
  "CEO, Cygnus Consulting",
  "Advisory board member, two start-ups",
  // DRAFT: content-map v2 §3.4 — newsletter name collision flagged in doc §8.1
  // (Discover Hadhi Yetu vs Seed of Power); using the bio's given name as-is.
  "Writer — author of the Discover Hadhi Yetu newsletter",
  "Champion of sustainability, in nature and in human relationships",
  "Expert in operations excellence and business finance operations",
];

export function GachokaBio() {
  return (
    <section className="bio" aria-labelledby="bio-title">
      <Image
        className="bio__photo"
        src="/images/bio.jpg"
        alt="Gachoka Kang'ata"
        width={480}
        height={600}
      />
      <div className="bio__copy">
        <p className="eyebrow">Meet Gachoka Kang&apos;ata</p>
        <h2 id="bio-title">Founder, Powering House</h2>
        <ul className="bio__credentials">
          {CREDENTIALS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        {/* DRAFT: content-map v2 §3.4, verbatim */}
        <p>
          As CEO he works daily with business owners and decision makers,
          designing and implementing models of operations excellence. As a
          founder he helps small enterprises design for growth. He is driven
          by the belief that every business is scalable, and he challenges
          founders daily on the mindset transformation that sustainable
          entrepreneurship demands.
        </p>
      </div>
    </section>
  );
}
