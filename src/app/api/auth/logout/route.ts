import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const baseUrl = process.env.NEXTAUTH_URL || "https://origin-labs.de";

  // Create response that redirects to login
  const response = NextResponse.redirect(new URL("/admin/login", baseUrl));

  // Clear all possible auth cookies
  const cookieOptions = {
    expires: new Date(0),
    path: "/",
  };

  response.cookies.set("authjs.session-token", "", cookieOptions);
  response.cookies.set("authjs.csrf-token", "", cookieOptions);
  response.cookies.set("authjs.callback-url", "", cookieOptions);
  response.cookies.set("__Secure-authjs.session-token", "", cookieOptions);
  response.cookies.set("__Host-authjs.csrf-token", "", cookieOptions);
  response.cookies.set("next-auth.session-token", "", cookieOptions);
  response.cookies.set("next-auth.csrf-token", "", cookieOptions);
  response.cookies.set("next-auth.callback-url", "", cookieOptions);
  response.cookies.set("__Secure-next-auth.session-token", "", cookieOptions);

  return response;
}
