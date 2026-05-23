import { NextResponse } from "next/server";
import { loadActiveAds } from "@/lib/ad-store";

export async function GET() {
  try {
    const ads = await loadActiveAds();
    return NextResponse.json(ads);
  } catch {
    return NextResponse.json({
      topBanner: null,
      sidebar: null,
      featuredTools: [],
      thirdParty: { topBanner: "", sidebar: "", inFeed: "" },
    });
  }
}
