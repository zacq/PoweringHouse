import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CinaHeader } from "@/components/cina/cina-header";
import { SymptomChecker } from "@/components/cina/symptom-checker";
import { RegisterModal } from "@/components/register-modal";
import {
  CINA_LEADS,
  CINA_LINKEDIN_URL,
  CINA_NEXT_STEPS,
  CINA_PHILOSOPHY,
  CINA_PILLARS,
  CINA_PROGRAMS,
  CINA_QUESTIONS,
  CINA_SCOPE,
  type CinaProgram,
} from "@/lib/cina";

export const metadata: Metadata = {
  title: { absolute: "CINA — Reclaim & Re-Fill" },
  description:
    "CINA connects, equips and empowers Business Owners, CEOs and Executive Decision Makers to reclaim wasted operational potential — and re-fill the business with profitability, cash flow and sustainable growth.",
};

const pad = (n: number) => String(n).padStart(2, "0");

function BookButton({ className = "cina-btn cina-btn--amber" }: { className?: string }) {
  return (
    <RegisterModal label="Book: Let's Connect" subject="CINA — Let's Connect" className={className}>
      Book: Let&apos;s Connect <span aria-hidden="true">→</span>
    </RegisterModal>
  );
}

function ProgramAction({ program }: { program: CinaProgram }) {
  const { action } = program;
  const content = (
    <>
      {action.label} <span aria-hidden="true">→</span>
    </>
  );
  if (action.kind === "register") {
    return (
      <RegisterModal label={action.label} subject={`CINA — ${program.title}`} className="cina-textlink">
        {content}
      </RegisterModal>
    );
  }
  return (
    <a className="cina-textlink" href={action.kind === "diagnose" ? "#diagnose" : action.href}>
      {content}
    </a>
  );
}

export default function CinaPage() {
  return (
    <>
      <CinaHeader />

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="cina-hero" aria-labelledby="cina-hero-title">
          <div className="cina-wrap cina-hero__grid">
            <div className="cina-hero__copy">
              <p className="cina-eyebrow">Continuous Improvement Network Association</p>
              <h1 id="cina-hero-title" className="cina-hero__title">
                Reclaim
                <em>&amp; Re-Fill</em>
              </h1>
              <p className="cina-hero__sub">
                Your business is leaking value you can&apos;t see — <em>profit, cash flow, capacity.</em>
              </p>
              <p className="cina-hero__body">
                You&apos;re a Business Owner, CEO or Executive Decision Maker. CINA exists to connect, equip and
                empower you to <strong>reclaim</strong> wasted operational potential — and <strong>re-fill</strong>{" "}
                your business with profitability, cash flow and sustainable growth.
              </p>
              <div className="cina-actions">
                <BookButton />
                <a className="cina-btn cina-btn--dark" href="#diagnose">
                  Try the 60-second diagnostic
                </a>
              </div>
            </div>

            <div className="cina-hero__media">
              <div className="cina-hero__photo">
                <Image
                  src="/images/cina/hero.jpg"
                  alt="A CINA lead at a boardroom table"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
                <p className="cina-hero__caption">Operations excellence, built for owners &amp; CEOs.</p>
              </div>
              <span className="cina-hero__pill">Reclaim &amp; Re-Fill</span>
              <div className="cina-hero__stat">
                <span className="cina-hero__stat-label">Operational health</span>
                <span className="cina-hero__stat-num">
                  10<small>/10</small>
                </span>
                <span className="cina-hero__stat-text">dimensions diagnosed, in under 5 minutes.</span>
              </div>
            </div>
          </div>
        </section>

        <SymptomChecker />

        {/* ---------- 10 questions ---------- */}
        <section className="cina-section cina-section--light" aria-labelledby="questions-title">
          <div className="cina-wrap">
            <p className="cina-eyebrow">Ask yourself</p>
            <h2 id="questions-title" className="cina-h2 cina-h2--wide">
              10 questions every business leader must answer
            </h2>
            <p className="cina-lede cina-lede--wide">
              Honest answers here are where reclaiming begins. No diagnosis, no plan — until you can name what&apos;s
              really happening.
            </p>
            <ol className="cina-questions">
              {CINA_QUESTIONS.map((q, i) => (
                <li key={q} className="cina-question">
                  <span className="cina-question__num">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- statement ---------- */}
        <section className="cina-section cina-section--deep cina-statement" aria-label="Why operations excellence">
          <div className="cina-wrap">
            <p className="cina-statement__text">
              Operations Improvement &amp; Excellence is your strategic driver of{" "}
              <em>Profitability, Cash Flow, Customer Satisfaction, Growth and Sustainability.</em>
            </p>
            <ul className="cina-pills">
              {CINA_PILLARS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- programs ---------- */}
        <section className="cina-section cina-section--light" id="programs" aria-labelledby="programs-title">
          <div className="cina-wrap cina-center">
            <p className="cina-eyebrow">We are CINA — Understand our programs</p>
            <h2 id="programs-title" className="cina-h2">
              How CINA supports your journey
            </h2>
            <p className="cina-lede">Most of it is free. All of it moves you from awareness to action.</p>
            <div className="cina-programs">
              {CINA_PROGRAMS.map((p) => (
                <article key={p.title} className="cina-program">
                  <span className="cina-program__icon" aria-hidden="true">
                    {p.icon}
                  </span>
                  <p className="cina-program__tag">{p.tag}</p>
                  <h3>{p.title}</h3>
                  <p className="cina-program__text">{p.description}</p>
                  <ProgramAction program={p} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- philosophy ---------- */}
        <section className="cina-section cina-section--white" id="philosophy" aria-labelledby="philosophy-title">
          <div className="cina-wrap cina-philosophy">
            <div>
              <p className="cina-eyebrow">The philosophy</p>
              <h2 id="philosophy-title" className="cina-h2">
                Business Money <em>&amp;</em> Business Excellence
              </h2>
              <blockquote className="cina-quote">
                &quot;Everybody has a need they wish and desire to be addressed. Knowing the pain point, addressing the
                need and satisfying it requires insightful engagement.&quot;
              </blockquote>
              <p className="cina-body">
                Not about disconnected tools — but <strong>real Operations Improvement and Excellence</strong>. To
                increase market impact, win customer loyalty, accelerate profitability and improve commercial
                excellence, every business leader needs the right skills and a network to draw from.
              </p>
              <p className="cina-body">
                Business Owners and Decision Makers — welcome for dialogue. This might be the missing link you&apos;ve
                been waiting much longer for.
              </p>
            </div>
            <ol className="cina-pillar-cards">
              {CINA_PHILOSOPHY.map((p, i) => (
                <li key={p.title} className="cina-pillar-card">
                  <span className="cina-pillar-card__num">{pad(i + 1)}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- scope ---------- */}
        <section className="cina-section cina-section--deep" id="scope" aria-labelledby="scope-title">
          <div className="cina-wrap cina-center">
            <p className="cina-eyebrow cina-eyebrow--amber">Key scope</p>
            <h2 id="scope-title" className="cina-h2">
              One network. Every lever that moves the business.
            </h2>
            <p className="cina-lede cina-lede--blue">
              The full system we work across — so improvement in one area doesn&apos;t leak out of another.
            </p>
            <ol className="cina-scope">
              {CINA_SCOPE.map((s, i) => (
                <li key={s} className="cina-scope__card">
                  <span className="cina-scope__num">{pad(i + 1)}</span>
                  <h3>{s}</h3>
                </li>
              ))}
            </ol>

            <section className="cina-framework" aria-labelledby="framework-title">
              <p className="cina-eyebrow cina-eyebrow--amber">Continuous Improvement Framework</p>
              {/* DRAFT: heading and intro written for this block — confirm wording with the client. */}
              <h2 id="framework-title" className="cina-h2">
                Put the framework to work in your business.
              </h2>
              <p className="cina-lede cina-lede--blue">
                Start with a free one-to-one OpEx assessment, or bring your team into the next cohort training.
              </p>
              <div className="cina-framework__grid">
                {CINA_NEXT_STEPS.map((step) => (
                  <article key={step.title} className="cina-framework__card">
                    <p className="cina-program__tag">{step.tag}</p>
                    <h3>{step.title}</h3>
                    <p className="cina-framework__text">{step.description}</p>
                    <RegisterModal
                      label={step.cta}
                      subject={`CINA — ${step.title} (Continuous Improvement Framework)`}
                      className="cina-btn cina-btn--amber cina-btn--block"
                    >
                      {step.cta} <span aria-hidden="true">→</span>
                    </RegisterModal>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* ---------- leads ---------- */}
        <section className="cina-section cina-section--light" aria-labelledby="leads-title">
          <div className="cina-wrap cina-center">
            <p className="cina-eyebrow">Our leads</p>
            <h2 id="leads-title" className="cina-h2 cina-h2--wide">
              The people behind the network
            </h2>
            <ul className="cina-leads">
              {CINA_LEADS.map((l) => (
                <li key={l.name} className="cina-lead">
                  <div className="cina-lead__photo">
                    <Image src={l.photo} alt={l.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" />
                  </div>
                  <h3>{l.name}</h3>
                  <p className="cina-lead__role">{l.role}</p>
                  <p className="cina-lead__spec">{l.specialism}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- final CTA ---------- */}
        <section className="cina-section cina-section--deep cina-final" aria-labelledby="final-title">
          <div className="cina-wrap cina-center">
            <h2 id="final-title" className="cina-h2 cina-h2--xl">
              Ready to Reclaim Your Business Potential?
            </h2>
            <p className="cina-lede cina-lede--blue">
              One conversation can be the turning point. Connect with CINA and let&apos;s explore what&apos;s possible
              for your business.
            </p>
            <div className="cina-actions cina-actions--center">
              <BookButton />
              <a className="cina-btn cina-btn--dark" href={CINA_LINKEDIN_URL}>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* DRAFT: the screenshots end at the final CTA — footer content to confirm. */}
      <footer className="cina-footer">
        <div className="cina-wrap cina-footer__row">
          <span>© {new Date().getFullYear()} CINA — Continuous Improvement Network Association</span>
          <Link href="/">Part of Powering House</Link>
        </div>
      </footer>

      {/* DRAFT: swap for a WhatsApp link once the number is supplied. */}
      <RegisterModal label="Chat with CINA" subject="CINA — Chat" className="cina-chat">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v11H8l-4 4V5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="cina-chat__dot" aria-hidden="true" />
      </RegisterModal>
    </>
  );
}
