import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <div className="blog-header">
          <h1>Page not found</h1>
          <p>
            That page doesn&apos;t exist. Try the{" "}
            <Link href="/blog" style={{ color: "var(--amber)" }}>
              writing
            </Link>{" "}
            or head back{" "}
            <Link href="/" style={{ color: "var(--amber)" }}>
              home
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
