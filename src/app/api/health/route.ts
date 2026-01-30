import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, string> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "set" : "missing",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "missing",
    } as unknown as string,
  };

  // Test database connection
  try {
    const { default: prisma } = await import("@/lib/prisma");
    const userCount = await prisma.adminUser.count();
    checks.database = `connected (${userCount} admin users)`;
  } catch (error) {
    checks.database = `error: ${error instanceof Error ? error.message : "unknown"}`;
  }

  return NextResponse.json(checks, { status: 200 });
}
