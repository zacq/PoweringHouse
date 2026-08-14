import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/lib/categories";

export async function ThemesGrid() {
  const counts = await prisma.post.groupBy({
    by: ["category"],
    where: { published: true },
    _count: { _all: true },
  });
  const countByCategory = Object.fromEntries(
    counts.map((c) => [c.category, c._count._all])
  );

  return (
    <section className="themes" aria-labelledby="themes-title">
      <div className="themes__head">
        <h2 id="themes-title">What I write about</h2>
        <p>
          Three lines of work. Every post sits in one of them, and the site
          learns which one you keep coming back to.
        </p>
      </div>
      <div className="themes__grid">
        {CATEGORIES.map((c) => {
          const count = countByCategory[c.value] ?? 0;
          return (
            <Link className="theme" key={c.slug} href={`/blog?category=${c.slug}`}>
              <span className="theme__tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span className="theme__count">
                {count} {count === 1 ? "piece" : "pieces"}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
