import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CinaHeader } from "@/components/cina/cina-header";
import { Expandable } from "@/components/cina/expandable";
import { SymptomChecker } from "@/components/cina/symptom-checker";
import { LeadMagnetModal } from "@/components/lead-magnet-modal";
import { RegisterModal } from "@/components/register-modal";
import {
  CINA_BREAKFAST,
  CINA_COHORT,
  CINA_COMMUNITY,
  CINA_CYCLE,
  CINA_IMPACT,
  CINA_LEADS,
  CINA_LINKEDIN_URL,
  CINA_METHODOLOGIES,
  CINA_NEXT_STEPS,
  CINA_PRACTICE_AREAS,
  CINA_PRINCIPLES,
  CINA_PRIORITIES,
  CINA_PROFILE as P,
  CINA_PROGRAMS,
  CINA_QUESTIONS,
  CINA_WHAT_WE_DO,
  type CinaProgram,
} from "@/lib/cina";

export const metadata: Metadata = {
  title: { absolute: "CINA — Reclaim & Refill · Driving the Practice of Operational Excellence" },
  description:
    "The Continuous Improvement Network Association (CINA) is a professional community of Operational Excellence practitioners dedicated to enabling organisations to reclaim growth through excellence.",
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
  if (action.kind === "breakfast") {
    return <LeadMagnetModal content={CINA_BREAKFAST} label={action.label} className="cina-textlink" />;
  }
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
                <em>&amp; Refill</em>
              </h1>
              <p className="cina-hero__sub">
                <em>{P.tagline}.</em>
              </p>
              <p className="cina-hero__body">
                {P.positioning} — dedicated to enabling organisations to <strong>reclaim</strong> growth through
                excellence, and <strong>refill</strong> them with capability that stays.
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
                <p className="cina-hero__caption">Improvement as a way of working.</p>
              </div>
              <span className="cina-hero__pill">Reclaim &amp; Refill</span>
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

        {/* ---------- who we are (profile §01–03) ---------- */}
        <section className="cina-section cina-section--white" id="about" aria-labelledby="about-title">
          <div className="cina-wrap">
            <div className="cina-about">
              <div>
                <p className="cina-eyebrow">Who we are</p>
                <h2 id="about-title" className="cina-h2">
                  A community of Operational Excellence practitioners.
                </h2>
                <p className="cina-body">{P.whoWeAre}</p>
                <p className="cina-body">{P.summaryMore}</p>
              </div>
              <div>
                <blockquote className="cina-quote cina-quote--belief">
                  <span className="cina-quote__label">Our belief</span>
                  {P.belief}
                </blockquote>
                <p className="cina-mini-label">Who we bring together</p>
                <ul className="cina-together">
                  {P.bringTogether.map((g) => (
                    <li key={g}>
                      <strong>{g}</strong>
                      <span>Connected &amp; engaged through the Network</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- purpose, vision & mission (profile §03) ---------- */}
        <section className="cina-section cina-section--light" aria-labelledby="pvm-title">
          <div className="cina-wrap cina-center">
            <p className="cina-eyebrow">Purpose, vision &amp; mission</p>
            <h2 id="pvm-title" className="cina-h2 cina-h2--wide">
              Improvement as a normal way of working.
            </h2>
            <div className="cina-pvm">
              {P.pvm.map((x) => (
                <article key={x.t} className="cina-pvm__card">
                  <p className="cina-program__tag">{x.t}</p>
                  <p>{x.d}</p>
                </article>
              ))}
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
            <Expandable as="ol" className="cina-questions" initial={4} moreLabel="Show all 10 questions">
              {CINA_QUESTIONS.map((q, i) => (
                <li key={q} className="cina-question">
                  <span className="cina-question__num">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </Expandable>
          </div>
        </section>

        {/* ---------- why the network matters (profile §08) ---------- */}
        <section className="cina-section cina-section--deep cina-statement" aria-labelledby="why-title">
          <div className="cina-wrap">
            <p className="cina-eyebrow cina-eyebrow--amber">Why the network matters</p>
            <h2 id="why-title" className="cina-statement__text">
              From strategy on paper to <em>disciplined, everyday improvement.</em>
            </h2>
            <p className="cina-lede cina-lede--blue cina-statement__lede">{P.whyMatters}</p>
            <ol className="cina-cycle">
              {CINA_CYCLE.map((step, i) => (
                <li key={step}>
                  <span>{pad(i + 1)}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="cina-lede cina-lede--blue cina-statement__lede">{P.whyObjective}</p>
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
            <Expandable className="cina-programs" initial={3} moreLabel="Show all programs">
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
            </Expandable>
          </div>
        </section>

        {/* ---------- what we stand for (profile §04) ---------- */}
        <section className="cina-section cina-section--white" id="principles" aria-labelledby="principles-title">
          <div className="cina-wrap cina-philosophy">
            <div>
              <p className="cina-eyebrow">What we stand for</p>
              <h2 id="principles-title" className="cina-h2">
                Five enduring <em>principles</em>
              </h2>
              <p className="cina-body">CINA is built around five enduring principles that guide everything we do.</p>
            </div>
            <div>
            <Expandable as="ol" className="cina-pillar-cards" initial={3} moreLabel="Show all principles">
              {CINA_PRINCIPLES.map((p, i) => (
                <li key={p.title} className="cina-pillar-card">
                  <span className="cina-pillar-card__num">{pad(i + 1)}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                  </div>
                </li>
              ))}
            </Expandable>
            </div>
          </div>
        </section>

        {/* ---------- areas of practice (profile §05) + next steps ---------- */}
        <section className="cina-section cina-section--deep" id="practice" aria-labelledby="practice-title">
          <div className="cina-wrap cina-center">
            <p className="cina-eyebrow cina-eyebrow--amber">Areas of practice</p>
            <h2 id="practice-title" className="cina-h2">
              An integrated approach to Operational Excellence.
            </h2>
            <p className="cina-lede cina-lede--blue">
              The Network promotes an integrated approach to Operational Excellence across the following disciplines.
            </p>
            <Expandable
              as="ol"
              className="cina-scope cina-scope--areas"
              initial={6}
              moreLabel="Show all 18 areas"
              tone="dark"
            >
              {CINA_PRACTICE_AREAS.map((s, i) => (
                <li key={s} className="cina-scope__card">
                  <span className="cina-scope__num">{pad(i + 1)}</span>
                  <h3>{s}</h3>
                </li>
              ))}
            </Expandable>
            <p className="cina-mini-label cina-mini-label--light">Established methodologies we recognise</p>
            <p className="cina-methods">
              {CINA_METHODOLOGIES.join(" · ")} · and other relevant improvement methodologies
            </p>
          </div>
        </section>

        {/* ---------- continuous improvement framework: next steps ---------- */}
        <section className="cina-section cina-section--deep" aria-labelledby="framework-title">
          <div className="cina-wrap cina-center">
            <div className="cina-framework">
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
                    {step.title === "Cohort Training" ? (
                      <LeadMagnetModal
                        content={CINA_COHORT}
                        label={step.cta}
                        className="cina-btn cina-btn--amber cina-btn--block"
                      />
                    ) : (
                      <RegisterModal
                        label={step.cta}
                        subject={`CINA — ${step.title} (Continuous Improvement Framework)`}
                        className="cina-btn cina-btn--amber cina-btn--block"
                      >
                        {step.cta} <span aria-hidden="true">→</span>
                      </RegisterModal>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- what we do + community (profile §06–07) ---------- */}
        <section className="cina-section cina-section--light" aria-labelledby="whatwedo-title">
          <div className="cina-wrap">
            <div className="cina-center">
              <p className="cina-eyebrow">What we do</p>
              <h2 id="whatwedo-title" className="cina-h2">
                Connecting people, capability and practice.
              </h2>
            </div>
            <Expandable className="cina-wwd" initial={3} moreLabel="Show all six">
              {CINA_WHAT_WE_DO.map((w) => (
                <article key={w.letter} className="cina-wwd__card">
                  <span className="cina-wwd__letter">{w.letter}</span>
                  <h3>{w.title}</h3>
                  <p>{w.description}</p>
                </article>
              ))}
            </Expandable>
          </div>
        </section>

        {/* ---------- professional community (profile §07) ---------- */}
        <section className="cina-section cina-section--white" aria-label="Our professional community">
          <div className="cina-wrap">
            <div className="cina-community">
              <p className="cina-mini-label">Our professional community</p>
              <p className="cina-body">
                CINA welcomes individuals and organisations at every stage of their Operational Excellence journey.
              </p>
              <ul className="cina-chips">
                {CINA_COMMUNITY.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- strategic priorities + desired impact (profile §09–10) ---------- */}
        <section className="cina-section cina-section--deep" aria-labelledby="priorities-title">
          <div className="cina-wrap cina-priorities">
            <div>
              <p className="cina-eyebrow cina-eyebrow--amber">Strategic priorities</p>
              <h2 id="priorities-title" className="cina-h2">
                Where the Network is focused.
              </h2>
              <Expandable as="ol" className="cina-prio-list" initial={4} moreLabel="Show all priorities" tone="dark">
                {CINA_PRIORITIES.map((p) => (
                  <li key={p.title}>
                    <strong>{p.title}</strong>
                    <span>{p.description}</span>
                  </li>
                ))}
              </Expandable>
            </div>
            <div className="cina-impact">
              <p className="cina-mini-label cina-mini-label--light">Our desired impact</p>
              <p className="cina-impact__lead">We envision organisations where:</p>
              <ul>
                {CINA_IMPACT.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- leadership (profile §12) ---------- */}
        <section className="cina-section cina-section--light" id="leadership" aria-labelledby="leads-title">
          <div className="cina-wrap cina-center">
            <p className="cina-eyebrow">Our leadership</p>
            <h2 id="leads-title" className="cina-h2 cina-h2--wide">
              The founding team behind the network
            </h2>
            <p className="cina-lede cina-lede--wide">{P.leadershipIntro}</p>
            <ul className="cina-leads cina-leads--three">
              {CINA_LEADS.map((l) => (
                <li key={l.name} className="cina-lead">
                  <div className="cina-lead__photo">
                    <Image src={l.photo} alt={l.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  </div>
                  <h3>{l.name}</h3>
                  <p className="cina-lead__role">{l.role}</p>
                  <p className="cina-lead__spec">{l.specialism}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- commitment (profile §11) + final CTA ---------- */}
        <section className="cina-section cina-section--deep cina-final" aria-labelledby="final-title">
          <div className="cina-wrap cina-center">
            <p className="cina-eyebrow cina-eyebrow--amber">Our commitment</p>
            <ul className="cina-commitment">
              {P.commitment.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="cina-lede cina-lede--blue">{P.commitmentClose}</p>
            <h2 id="final-title" className="cina-h2 cina-h2--xl cina-final__title">
              Ready to Reclaim Your Business Potential?
            </h2>
            <div className="cina-actions cina-actions--center">
              <BookButton />
              <a className="cina-btn cina-btn--dark" href={CINA_LINKEDIN_URL}>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="cina-footer">
        <div className="cina-wrap cina-footer__row">
          <span>
            © {new Date().getFullYear()} CINA — Continuous Improvement Network Association · {P.tagline}
          </span>
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
