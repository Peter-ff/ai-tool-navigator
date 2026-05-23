import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function middleware(request: NextRequest) {
  if (request.method === "POST" && request.nextUrl.pathname === "/api/submit") {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (entry && now < entry.resetTime) {
      if (entry.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: "提交过于频繁，请稍后再试" },
          { status: 429 }
        );
      }
      entry.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
