import Link from "next/link";
import { SignOutButton } from "@/components/admin/sign-out-button";

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
