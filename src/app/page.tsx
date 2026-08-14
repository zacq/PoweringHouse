import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProofStats } from "@/components/proof-stats";
import { ThemesGrid } from "@/components/themes-grid";
import { NewsletterForm } from "@/components/newsletter-form";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStats />
        <ThemesGrid />
        <section className="join" id="join" aria-labelledby="join-title">
          <div className="join__copy">
            <h2 id="join-title">Join the room</h2>
            <p>
              One email when a new piece goes up — Business Design, Money
              Discipline, or Growth Systems. No noise in between.
            </p>
          </div>
          <NewsletterForm />
        </section>
      </main>
    </>
  );
}
