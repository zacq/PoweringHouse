import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Gate everything under /admin (except /admin/login) and /api/admin/*.
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (token) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/posts/:path*",
    "/admin/comments/:path*",
    "/admin/subscribers/:path*",
    "/api/admin/:path*",
  ],
};
