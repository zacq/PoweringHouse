import Link from "next/link";

export function formatFeedDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function FeedCard({
  href,
  external,
  tag,
  title,
  excerpt,
  date,
}: {
  href: string;
  external?: boolean;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
}) {
  const content = (
    <>
      <div className="post-card__meta">
        <span>{tag}</span>
      </div>
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <div className="post-card__date">{date}</div>
    </>
  );

  if (external) {
    return (
      <a className="post-card" href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className="post-card" href={href}>
      {content}
    </Link>
  );
}
