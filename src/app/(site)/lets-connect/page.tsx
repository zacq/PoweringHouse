import type { Metadata } from "next";
import { EventsList } from "@/components/events-list";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Let's Connect",
  description: "Upcoming events, and how to reach Powering House directly.",
};

export const revalidate = 60;

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

      <section className="themes" aria-labelledby="contact-title">
        <div className="themes__head">
          <h2 id="contact-title">Contact</h2>
          <p>Reach out on WhatsApp, or register your interest below.</p>
        </div>
        <div className="actions" style={{ marginBottom: "1.6rem" }}>
          {/* DRAFT: WhatsApp number not yet provided — swap href for a real https://wa.me/<number> link */}
          <a className="btn btn--primary" href="#">
            Chat on WhatsApp
          </a>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
