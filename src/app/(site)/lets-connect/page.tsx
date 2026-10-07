import type { Metadata } from "next";
import { EventsList } from "@/components/events-list";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Let's Connect",
  description: "Upcoming events, and how to reach Powering House directly.",
};

export const revalidate = 3600;

export default function LetsConnectPage() {
  return (
    <>
      <header className="blog-header">
        <h1>Let&apos;s Connect</h1>
      </header>

      <section className="themes" id="events" aria-labelledby="events-title">
        <div className="themes__head">
          <h2 id="events-title">Upcoming events</h2>
        </div>
        <EventsList />
      </section>

      <section className="themes contact-split" aria-labelledby="contact-title">
        <div className="contact-split__intro">
          <h2 id="contact-title">Contact</h2>
          <p>Reach out on WhatsApp, or register your interest and we&apos;ll get back to you.</p>
        <div className="actions">
          {/* DRAFT: WhatsApp number not yet provided — swap href for a real https://wa.me/<number> link */}
          <a className="btn btn--primary" href="#">
            Chat on WhatsApp
          </a>
        </div>
        </div>
        <ContactForm subject="Let's Connect — Contact page" />
      </section>
    </>
  );
}
