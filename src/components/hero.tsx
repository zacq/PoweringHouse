import { getImageProps } from "next/image";

const WAVE_BAR_COUNT = 60;

function waveBars() {
  return Array.from({ length: WAVE_BAR_COUNT }, (_, i) => {
    const t = i / (WAVE_BAR_COUNT - 1);
    // Deterministic pseudo-waveform: two overlapping sine waves, no Math.random
    // so server/client render identically.
    const h =
      0.5 +
      0.32 * Math.sin(t * Math.PI * 2.4 + 0.6) +
      0.16 * Math.sin(t * Math.PI * 7 + 1.2);
    const height = Math.max(0.08, Math.min(1, h));
    return { x: (i / WAVE_BAR_COUNT) * 420, height: height * 27 + 2, delay: 0.16 + i * 0.0084 };
  });
}

function heroPictureProps() {
  const common = {
    alt: "Gachoka Kang'ata, founder of Powering House",
    priority: true as const,
  };
  const {
    props: { srcSet: desktopSrcSet, ...desktop },
  } = getImageProps({
    ...common,
    src: "/images/hero-desktop.jpg",
    width: 1800,
    height: 1200,
    sizes: "100vw",
  });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/hero-mobile.jpg",
    width: 1000,
    height: 1250,
    sizes: "100vw",
  });

  return { desktop, desktopSrcSet, mobileSrcSet };
}

export function Hero() {
  const { desktop, desktopSrcSet, mobileSrcSet } = heroPictureProps();
  const bars = waveBars();

  return (
    <section className="hero">
      <picture className="hero__media">
        <source media="(max-width:767px)" srcSet={mobileSrcSet} />
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt is spread in via `desktop` */}
        <img {...desktop} srcSet={desktopSrcSet} fetchPriority="high" />
      </picture>
      <div className="hero__scrim" />

      <div className="hero__copy">
        <p className="eyebrow">Gachoka Kang&apos;ata</p>
        <h1>Every business is scalable.</h1>

        <svg className="wave" viewBox="0 0 420 34" aria-hidden="true" preserveAspectRatio="none">
          {bars.map((bar, i) => (
            <rect
              key={i}
              x={bar.x.toFixed(2)}
              y={(17 - bar.height / 2).toFixed(2)}
              width={2.1}
              height={bar.height.toFixed(2)}
              rx={1}
              style={{ animationDelay: `${bar.delay.toFixed(3)}s` }}
            />
          ))}
        </svg>

        <p className="lede">
          I work with Kenyan business owners on the structure underneath the
          hustle &mdash; clarity, systems, and money discipline that hold when
          the business grows. <em>Empowering people.</em>
        </p>

        <div className="actions">
          <a className="btn btn--primary" href="#join">
            Join the room
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
          </a>
          <a className="btn btn--ghost" href="/blog">
            Read the writing
          </a>
        </div>
      </div>
    </section>
  );
}
