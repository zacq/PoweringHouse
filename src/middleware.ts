import { NextRequest, NextResponse } from "next/server";

// Redirect paths are matched case-insensitively, so a "/Awareness" rule in next.config.js
// would also catch "/awareness" and loop. Compare the exact case here instead.
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/Awareness") {
    const url = req.nextUrl.clone();
    url.pathname = "/awareness";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/Awareness"] };
