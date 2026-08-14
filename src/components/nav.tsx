import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/blog", label: "Writing" },
  { href: "/#programme", label: "The Programme" },
  { href: "/#speaking", label: "Speaking" },
  { href: "/#join", label: "Join" },
];

export function Nav() {
  return (
    <header className="nav">
      <Link className="nav__mark" href="/">
        <Image
          src="/images/avatar.jpg"
          alt=""
          width={38}
          height={38}
          priority
        />
        <span>
          Powering
          <br />
          House
        </span>
      </Link>
      <nav className="nav__links" aria-label="Primary">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
