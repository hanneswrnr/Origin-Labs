import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      AUTH_SECRET: process.env.AUTH_SECRET ? "set" : "missing",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "set" : "missing",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "missing",
    },
  });
}
