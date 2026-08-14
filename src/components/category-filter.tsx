import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <nav className="filters" aria-label="Filter by theme">
      <Link href="/blog" aria-current={!active}>
        All writing
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/blog?category=${c.slug}`}
          aria-current={active === c.slug}
        >
          {c.title}
        </Link>
      ))}
    </nav>
  );
}
