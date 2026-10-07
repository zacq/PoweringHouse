import { RegisterModal } from "@/components/register-modal";
import { CINA_TICKER } from "@/lib/cina";
import { ScrollFlag } from "./scroll-flag";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#diagnose", label: "Diagnose" },
  { href: "#programs", label: "Programs" },
  { href: "#practice", label: "Practice" },
  { href: "#leadership", label: "Leadership" },
];

export function CinaHeader() {
  return (
    <header className="cina-header">
      <ScrollFlag />
      <div className="cina-header__bar">
        <a className="cina-brand" href="#top" aria-label="CINA — back to top">
          <span className="cina-brand__tile" aria-hidden="true">C</span>
          <span className="cina-brand__text">
            <span className="cina-brand__name">CINA</span>
            <span className="cina-brand__sub">Continuous Improvement Network</span>
          </span>
        </a>
        <nav className="cina-header__links" aria-label="CINA sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <RegisterModal label="Let's Connect" subject="CINA — Let's Connect" className="cina-btn cina-btn--blue">
          Let&apos;s Connect <span aria-hidden="true">→</span>
        </RegisterModal>
      </div>

      <div className="cina-ticker">
        <span className="cina-ticker__label">Monthly Updates</span>
        <div className="cina-ticker__viewport">
          {/* Two copies so the marquee loops seamlessly; the second is hidden from screen readers. */}
          <div className="cina-ticker__track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="cina-ticker__list" aria-hidden={copy === 1 || undefined}>
                {CINA_TICKER.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
