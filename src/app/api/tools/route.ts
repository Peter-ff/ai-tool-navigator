import { NextRequest, NextResponse } from "next/server";
import { loadAllTools } from "@/lib/load-tools";

export async function GET(request: NextRequest) {
  const slugs = request.nextUrl.searchParams.get("slugs");
  if (!slugs) {
    return NextResponse.json({ tools: [] });
  }

  const slugList = slugs.split(",").filter(Boolean);
  if (slugList.length === 0) {
    return NextResponse.json({ tools: [] });
  }

  const allTools = await loadAllTools();
  const tools = allTools.filter((t) => slugList.includes(t.slug));

  return NextResponse.json({ tools });
}
