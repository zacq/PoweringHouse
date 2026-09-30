import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GrowthKitBar, GrowthKitForm } from "@/components/growth-kit-form";
import { RegisterModal } from "@/components/register-modal";
import { WAYS_WE_HELP } from "@/lib/ways-we-help";
import {
  GK_BARS,
  GK_ELEMENTS,
  GK_GUIDES,
  GK_LEVELS,
  GK_LIES,
  GK_LINKEDIN,
  GK_LOSSES,
  GK_PILLARS,
  GK_PLAN,
  GK_REASONS,
  GK_STATS,
  GK_TOOLS,
  GK_WHATSAPP,
  GK_WHATSAPP_LABEL,
  GK_WITNESSES,
  GK_X,
  GK_X_HANDLE,
  type NumberedItem,
} from "@/lib/growth-kit";

export const metadata: Metadata = {
  title: { absolute: "Every Business is Scalable — Free Micro Business Growth Kit" },
  description:
    "GK's Micro Business Growth Kit: 5 levels to turn hustle into entrepreneurship, built from 4 start ups and 2 years of structured coaching.",
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Awareness is the free level; these are the paid-path next steps it leads prospects to.
const NEXT_STEP_OFFERS = WAYS_WE_HELP.filter((w) =>
  ["1-1-clarity-session", "boot-camp-business-design-coaching"].includes(w.slug)
);

function Rail({ level, title, children }: { level: number; title: string; children?: React.ReactNode }) {
  return (
    <div className="gk-rail">
      <span className="gk-level-tag">Level {level}</span>
      <h2 className="gk-level-title">{title}</h2>
      {children}
    </div>
  );
}

function NumberedList({ items }: { items: NumberedItem[] }) {
  return (
    <ol className="gk-numbered">
      {items.map((it) => (
        <li key={it.num}>
          <span className="gk-num">{it.num}</span>
          <div>
            <h4>{it.t}</h4>
            <p>{it.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function GrowthKitPage() {
  return (
    <div className="gk">
      {/* ---------- hero ---------- */}
      <header id="gk-top" className="gk-wrap gk-hero">
        <div className="gk-hero__copy">
          <h1 className="gk-hero__title">
            <span>Every Business</span>
            <span>
              is <em>Scalable</em>
            </span>
          </h1>
          <p className="gk-hero__sub">
            <span>You don’t take time growing the business;</span>
            <strong>You take time becoming the right person to grow the business.</strong>
          </p>
          <div className="actions">
            <a className="btn btn--primary gk-btn-wide" href="#kit">
              Get the Free Growth Kit <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href={GK_WHATSAPP} {...ext}>
              Talk to GK
            </a>
          </div>
        </div>
        <div className="gk-bars" aria-hidden="true">
          <div className="gk-bars__plot">
            {GK_BARS.map((b, i) => (
              <div key={b.label} className="gk-bars__col">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div className="gk-bars__bar" style={{ height: `${b.height}%`, opacity: 0.35 + i * 0.16 }} />
              </div>
            ))}
          </div>
          <div className="gk-bars__labels">
            {GK_BARS.map((b) => (
              <span key={b.label}>{b.label}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- numbers ---------- */}
      <section className="gk-stats" aria-label="The kit in numbers">
        <div className="gk-wrap gk-stats__grid">
          {GK_STATS.map((s) => (
            <div key={s.label}>
              <p className="gk-stats__num">{s.num}</p>
              <p className="gk-stats__label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- kit ---------- */}
      <section id="kit" className="gk-section">
        <div className="gk-wrap gk-split">
          <div className="gk-split__main">
            <p className="eyebrow">Turn hustle into entrepreneurship</p>
            <h2 className="gk-h2">Exact Micro Business Growth Kit I’ve built in 2 years</h2>
            <p className="gk-muted gk-mt-20">
              From real experience running 4 start ups and undergoing 2 year structured coaching.
            </p>
            <p className="gk-lead gk-mt-28">
              This has ability to turn your micro business into <em>Kes 10 Million ($ 100k)</em> annual revenue
              enterprise.
            </p>
            <div className="gk-contents">
              <span className="gk-label">Contents</span>
              {GK_LEVELS.map((lv) => (
                <a key={lv.href} href={lv.href}>
                  <span className="gk-num">{lv.num}</span>
                  <span>{lv.name}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
            </div>
          </div>
          <div className="gk-split__side">
            <div className="gk-card">
              <GrowthKitForm variant="card" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- level 1 ---------- */}
      <section id="level-1" className="gk-section gk-section--ruled">
        <div className="gk-wrap gk-level">
          <Rail level={1} title="Awareness">
            <figure className="gk-photo">
              <div className="gk-photo__frame">
                <Image
                  src="/images/growth-kit/gk-mic.jpg"
                  alt="Gachoka Kang’ata (GK) speaking into a microphone"
                  fill
                  sizes="(max-width: 900px) 100vw, 420px"
                />
              </div>
              <figcaption>
                <strong>Gachoka Kang’ata (GK)</strong> — two years into building business for growth.
              </figcaption>
            </figure>
          </Rail>
          <div className="gk-level__body">
            <p className="gk-lead">
              It is until you get real push that you will get real awareness that differentiate hustle from real
              entrepreneurship.
            </p>
            <blockquote className="gk-bigquote">
              For me everything changed when I had <em>nothing else left.</em>
            </blockquote>
            <span className="gk-label gk-label--amber">Specifically, November 2023</span>
            <div className="gk-rows gk-mt-16">
              {GK_LOSSES.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <p className="gk-mt-48">I can comfortably account this to 3 main reasons:</p>
            <div className="gk-reasons">
              {GK_REASONS.map((r) => (
                <div key={r.num}>
                  <span className="gk-num">{r.num}</span>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
              ))}
            </div>
            <p className="gk-mt-56">
              In November 2023 I was invited by a long-time old man (69 years then — now 71 yrs) for a cup of tea. He
              is a long-time consultant with known big brands on business operation excellence.
            </p>
            <p className="gk-muted gk-mt-24">Few words from him:</p>
            <p className="gk-pullquote">
              “You need to learn how to design businesses and run with it. That’s missing for you.”
            </p>
            <p className="gk-muted gk-mt-40">Because the truth is:</p>
            <p className="gk-truth">“Businesses are always innocent.”</p>
            <p className="gk-mt-48">From that time, my journey started afresh. Building business for growth.</p>
            <p className="gk-mt-12">Today momentum has been uninterrupted — on the way to winning.</p>
            <p className="gk-mt-12">
              <strong>2 years of patience. Can’t be an overnight growth.</strong>
            </p>
            <div className="gk-guides">
              <span className="gk-label">These are the guides in business growth kit</span>
              <div className="gk-guides__grid">
                {GK_GUIDES.map((g) => (
                  <a key={g.href} href={g.href}>
                    <span className="gk-guides__num">{g.num}</span>
                    <span>{g.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- level 2 ---------- */}
      <section id="level-2" className="gk-section gk-section--ruled">
        <div className="gk-wrap gk-level">
          <Rail level={2} title="Business Design">
            <p className="gk-lead gk-mt-24">The world has changed. So you can as well.</p>
          </Rail>
          <div className="gk-level__body">
            <p className="gk-statement">Business is an art.</p>
            <p className="gk-mt-20">
              It’s never a random jargon that many people tend to liken and practice it. Designing a business is like
              a new sunrise dawn that questions your commitment.
            </p>
            <p className="gk-mt-20">
              We are living through a quiet revolution. Even the smallest business in the village is getting
              competition from the biggest corporate in world capital.
            </p>
            <p className="gk-mt-20">
              Just like steam and electricity once transformed the world, entrepreneurship is about world customer —
              lightning speed.
            </p>
            <h3 className="gk-h3">Design your business for the following 8 elements</h3>
            <NumberedList items={GK_ELEMENTS} />
          </div>
        </div>
      </section>

      {/* ---------- level 3 ---------- */}
      <section id="level-3" className="gk-section gk-section--ruled gk-section--raised">
        <div className="gk-wrap gk-level">
          <Rail level={3} title="Pillars of Business Growth">
            <p className="gk-mt-24">
              When you conquer discovering your business through design, next jab is mapping pillars of growth.
            </p>
          </Rail>
          <div className="gk-level__body">
            <p className="gk-statement">Pillars of growth is what gives you road to pass as you grow.</p>
            <p className="gk-mt-20">
              It starts by reprogramming your mind. These are practical pillars. They remove you from thinking that
              you only need cash capital to build your business.
            </p>
            <p className="gk-mt-20">
              <strong>It opens you up to new possibilities of building non cash capital for your small enterprise.</strong>
            </p>
            <h3 className="gk-h3">Strengthen foundation of your business with following 11 Pillars</h3>
            <NumberedList items={GK_PILLARS} />
          </div>
        </div>
      </section>

      {/* ---------- level 4 ---------- */}
      <section id="level-4" className="gk-section gk-section--ruled">
        <div className="gk-wrap">
          <div className="gk-level gk-level--static">
            <Rail level={4} title="Tools of Productivity">
              <p className="gk-mt-24">
                Overall win from business operations is achieving optimum productivity. Productivity of people and
                machine.
              </p>
            </Rail>
            <div className="gk-level__body">
              <div className="gk-fifty">
                <p className="gk-fifty__num">&lt;50%</p>
                <p className="gk-lead">Most business achieve far less than 50% of their business potential.</p>
              </div>
              <p className="gk-mt-28">
                That means capital paid on machine and paying staff gives Return on Investment that is below average.
                That’s a D (Plain). More painful because this is <strong>CASH lost</strong>.
              </p>
              <p className="gk-mt-20">
                Business growth will only come from ability to sustain the flow. Sustaining the flow will come from
                systems that enable create repeatable trend. This will be possible through tools of productivity.
              </p>
            </div>
          </div>
          <h3 className="gk-h3 gk-mt-72">Here are your 8 tools of productivity</h3>
          <div className="gk-tools">
            {GK_TOOLS.map((it) => (
              <div key={it.num}>
                <span className="gk-num">{it.num}</span>
                <h4>{it.t}</h4>
                <p>{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- level 5 ---------- */}
      <section id="level-5" className="gk-section gk-section--ruled">
        <div className="gk-wrap gk-level">
          <Rail level={5} title="What this means to you">
            <p className="gk-lead gk-mt-24">And the next 24 hours plan to adopt.</p>
          </Rail>
          <div className="gk-level__body">
            <p>Maybe you are just getting started loaded with idea. Call it ideation stage.</p>
            <p className="gk-mt-16">
              Maybe you have been running your micro business last 6 months, 1 yr, 2 yr, 3 yr, 4 yr ….
            </p>
            <p className="gk-mt-16">
              Or maybe you have just been waiting. You know you need a move but don’t know which one.
            </p>
            <p className="gk-muted gk-mt-40">This is what I will tell you:</p>
            <p className="gk-statement gk-mt-12">There’s no right time.</p>
            <p className="gk-mt-24">You might be held back by your own imaginations about how;</p>
            <div className="gk-rows gk-rows--struck gk-mt-12">
              {GK_LIES.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <p className="gk-lead gk-mt-28">
              <strong>Don’t let that mental lie hold you back.</strong>
            </p>
            <p className="gk-mt-28">
              Your business need to grow because it is needed to elevate the society beyond yourself.
            </p>
            <p className="gk-mt-16">
              This is my mirror. Not just stories of what can work. I have lived it last 2 years. Every day and seen
              progress results every year.
            </p>
            <div className="gk-plan">
              <span className="gk-label gk-label--amber">Your next 24 hours</span>
              <p className="gk-plan__title">Don’t just save this document. Use it.</p>
              {GK_PLAN.map((p) => (
                <div key={p.num} className="gk-plan__row">
                  <span className="gk-num">{p.num}</span>
                  <span>{p.t}</span>
                </div>
              ))}
              <p className="gk-plan__foot">
                You only need commitment and <strong>one hour per day</strong> to keep mastering. Next you will be
                taken away in growth that you never imagined.
              </p>
            </div>
            <div className="gk-offers">
              <span className="gk-label gk-label--amber">Awareness is free. Take the next step</span>
              <p className="gk-offers__title">Grow your micro business with GK — one-to-one or in coaching.</p>
              <div className="gk-offers__grid">
                {NEXT_STEP_OFFERS.map((way) => (
                  <div key={way.slug} className="gk-offer">
                    <span className="gk-num">{way.tag}</span>
                    <h4>{way.title}</h4>
                    <p>{way.blurb}</p>
                    <RegisterModal
                      label={way.slug === "1-1-clarity-session" ? "Book a 1:1 session" : "Register for coaching"}
                      subject={`${way.title} (Awareness page)`}
                      className="btn btn--primary gk-btn-wide"
                    >
                      {way.slug === "1-1-clarity-session" ? "Book a 1:1 session" : "Register for coaching"}
                      <span aria-hidden="true">→</span>
                    </RegisterModal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- talk ---------- */}
      <section id="talk" className="gk-talk">
        <div className="gk-wrap">
          <p className="gk-talk__kicker">If you need some push</p>
          <h2 className="gk-talk__title">I am here. You can call on me.</h2>
          <p className="gk-talk__text">
            For me I started and picked after losing everything. You don’t need to wait for that.
          </p>
          <div className="actions">
            <a className="btn gk-btn-ink gk-btn-wide" href={GK_WHATSAPP} {...ext}>
              Message GK on WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <a className="btn gk-btn-outline-ink" href="#next">
              Get the kit first
            </a>
          </div>
        </div>
      </section>

      {/* ---------- next ---------- */}
      <section id="next" className="gk-section">
        <div className="gk-wrap">
          <h2 className="gk-h2">Here’s what to do next</h2>
          <div className="gk-next">
            <div>
              <span className="gk-num">01</span>
              <GrowthKitForm variant="compact" />
            </div>
            <div>
              <span className="gk-num">02</span>
              <h3>Check out our tools that you can start with — one step at a time</h3>
              <Link className="btn btn--ghost gk-mt-20" href="/market-place#tools">
                See the tools <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div>
              <span className="gk-num">03</span>
              <h3>You can DM me through social</h3>
              <div className="gk-socials">
                <a href={GK_X} {...ext}>
                  X — {GK_X_HANDLE} <span aria-hidden="true">↗</span>
                </a>
                <a href={GK_LINKEDIN} {...ext}>
                  LinkedIn — Gachoka Kang’ata <span aria-hidden="true">↗</span>
                </a>
                <a href={GK_WHATSAPP} {...ext}>
                  WhatsApp — {GK_WHATSAPP_LABEL} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- witnesses ---------- */}
      <section className="gk-section gk-section--ruled gk-section--raised" aria-labelledby="witnesses-title">
        <div className="gk-wrap">
          <p className="eyebrow">Witnesses</p>
          <h2 id="witnesses-title" className="gk-h2 gk-h2--sm">
            Businesses built with the kit
          </h2>
          <div className="gk-witnesses">
            {GK_WITNESSES.map((w) => (
              <div key={w}>
                <span className="gk-witnesses__mark" aria-hidden="true" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section className="gk-section gk-section--ruled" aria-labelledby="about-title">
        <div className="gk-wrap gk-about">
          <div>
            <p className="eyebrow">About GK</p>
            <h2 id="about-title" className="gk-truth gk-truth--bone">
              Let’s speak soon.
            </h2>
            <p className="gk-mt-28">
              <strong>Gachoka Kang’ata (GK)</strong>, Poweringhouse. Four start ups, two years of structured coaching,
              and a growth kit built from both.
            </p>
          </div>
          <div className="gk-about__links">
            <a className="btn btn--ghost" href={GK_X} {...ext}>
              Follow on X
            </a>
            <a className="btn btn--ghost" href={GK_LINKEDIN} {...ext}>
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <GrowthKitBar heroId="gk-top" />
    </div>
  );
}
