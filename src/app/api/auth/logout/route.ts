import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  // Delete all auth-related cookies
  cookieStore.delete("authjs.session-token");
  cookieStore.delete("authjs.csrf-token");
  cookieStore.delete("authjs.callback-url");
  cookieStore.delete("__Secure-authjs.session-token");
  cookieStore.delete("__Host-authjs.csrf-token");

  // Redirect to login page
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXTAUTH_URL || "https://origin-labs.de"));
}
