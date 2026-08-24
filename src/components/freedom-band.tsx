import { NewsletterForm } from "./newsletter-form";

/**
 * The universal newsletter-capture fallback, mounted once in the (site)
 * layout so it appears at the bottom of every public page. See
 * content-map v2 §2 "Global patterns — the FREEDOM band".
 */
export function FreedomBand() {
  return (
    <section className="join" id="join" aria-label="Freedom — join the newsletter">
      <div className="join__copy">
        <p className="eyebrow">Freedom</p>
        {/* DRAFT: content-map v2 §2, verbatim */}
        <p>One letter. Raw thinking on what it actually takes to build the business you love.</p>
      </div>
      <NewsletterForm buttonLabel="Get in when it happens →" />
    </section>
  );
}
