import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow API auth routes to pass through
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check for session token (NextAuth v5 uses authjs.session-token)
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!sessionToken;
  const isOnAdmin = pathname.startsWith("/admin");
  const isOnLogin = pathname === "/admin/login";

  // Protect admin routes (except login)
  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redirect to admin dashboard if already logged in and on login page
  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
