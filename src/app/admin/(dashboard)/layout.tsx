import Link from "next/link";
import { SignOutButton } from "@/components/admin/sign-out-button";

// Every admin page under here reads live data straight from Prisma with no
// fetch() cache directives Next.js can see -- without this, it can silently
// statically prerender these pages at build time and never re-query the
// database again. Admin data must always be current, so this route segment
// (and everything nested under it) is never cached, applied once here.
export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <nav className="admin-nav" aria-label="Admin">
        <Link href="/admin" style={{ textDecoration: "none", color: "inherit" }}>
          <strong>Powering House · Admin</strong>
        </Link>
        <div className="admin-nav__links">
          <Link href="/admin/posts">Posts</Link>
          <Link href="/admin/comments">Comments</Link>
          <Link href="/admin/subscribers">Subscribers</Link>
          <Link href="/admin/offers">Offers</Link>
          <Link href="/admin/enquiries">Enquiries</Link>
          <Link href="/admin/ventures">Ventures</Link>
          <Link href="/admin/resources">Resources</Link>
          <Link href="/admin/events">Events</Link>
          <Link href="/admin/contact-messages">Contact</Link>
          <Link href="/" target="_blank">
            View site
          </Link>
          <SignOutButton />
        </div>
      </nav>
      <main className="admin-main">{children}</main>
    </div>
  );
}
