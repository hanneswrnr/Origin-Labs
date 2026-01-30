import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnLogin = req.nextUrl.pathname === "/admin/login";
  const isApiAuth = req.nextUrl.pathname.startsWith("/api/auth");

  // Allow API auth routes
  if (isApiAuth) {
    return;
  }

  // Protect admin routes (except login)
  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", req.nextUrl));
  }

  // Redirect to admin dashboard if already logged in and on login page
  if (isOnLogin && isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
