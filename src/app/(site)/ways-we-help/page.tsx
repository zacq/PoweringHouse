import type { Metadata } from "next";
import Link from "next/link";
import { WAYS_WE_HELP } from "@/lib/ways-we-help";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Ways We Help",
  description: "Six ways to work together, from free to one-to-one.",
};

const REG_FORM_WAYS = WAYS_WE_HELP.filter((way) => way.cta === "REG_FORM");

export default function WaysWeHelpPage() {
  return (
    <>
      <section className="themes" aria-labelledby="ways-title">
        <div className="themes__head">
          <h2 id="ways-title">Ways We Help</h2>
          <p>Six ways to work together, from free to one-to-one.</p>
        </div>
        <div className="themes__grid">
          {WAYS_WE_HELP.map((way) => (
            <div className="theme" key={way.slug}>
              <span className="theme__tag">{way.tag}</span>
              <h3>{way.title}</h3>
              <p>{way.blurb}</p>
              {way.cta === "SELF_PACED" && (
                // DRAFT: self-paced platform URL not yet known — swap href for the real link
                <a
                  className="btn btn--ghost"
                  href="#"
                  style={{ marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
                >
                  Connect with the self-paced platform
                </a>
              )}
              {way.cta === "REG_FORM" && (
                <a
                  className="btn btn--ghost"
                  href={`#reg-${way.slug}`}
                  style={{ marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
                >
                  Register your interest
                </a>
              )}
              {way.cta === "UNIVERSE" && (
                <Link
                  className="btn btn--ghost"
                  href="/universe-of-freedom"
                  style={{ marginTop: ".8rem", padding: ".5rem .9rem", fontSize: ".82rem" }}
                >
                  Explore Universe of Freedom
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="themes" aria-labelledby="register-title">
        <div className="themes__head">
          <h2 id="register-title">Register your interest</h2>
        </div>
        {REG_FORM_WAYS.map((way) => (
          <div
            id={`reg-${way.slug}`}
            key={way.slug}
            style={{ marginBottom: "2.4rem", scrollMarginTop: "6rem" }}
          >
            <h3>{way.title}</h3>
            <ContactForm subject={way.title} />
          </div>
        ))}
      </section>
    </>
  );
}
