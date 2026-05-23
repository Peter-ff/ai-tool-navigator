import { loadAllTools } from "./load-tools";
import type { Tool } from "./types";

export interface TopBannerAd {
  enabled: boolean;
  toolSlug: string;
  text: string;
  ctaText: string;
}

export interface SidebarToolAd {
  slug: string;
  text: string;
}

export interface SidebarAds {
  enabled: boolean;
  tools: SidebarToolAd[];
}

export interface ThirdPartyAds {
  topBanner: string;
  sidebar: string;
  inFeed: string;
}

export interface AdConfig {
  topBanner: TopBannerAd;
  sidebar: SidebarAds;
  featuredTools: string[];
  thirdParty: ThirdPartyAds;
}

export interface ActiveAds {
  topBanner: (TopBannerAd & { tool: Tool | null }) | null;
  sidebar: (SidebarAds & { tools: (SidebarToolAd & { tool: Tool | null })[] }) | null;
  featuredTools: Tool[];
  thirdParty: ThirdPartyAds;
}

async function loadAdConfig(): Promise<AdConfig | null> {
  // Production: use Upstash Redis
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      const data = await redis.get<AdConfig>("ads:active");
      if (data) return data;
    } catch {}
  }

  // Dev fallback: load from local JSON
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "content/ads/active.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as AdConfig;
  } catch {
    return null;
  }
}

export async function loadActiveAds(): Promise<ActiveAds> {
  const config = await loadAdConfig();
  const allTools = await loadAllTools();

  if (!config) {
    return {
      topBanner: null,
      sidebar: null,
      featuredTools: [],
      thirdParty: { topBanner: "", sidebar: "", inFeed: "" },
    };
  }

  const topBannerTool = config.topBanner.toolSlug
    ? allTools.find((t) => t.slug === config.topBanner.toolSlug) ?? null
    : null;

  const sidebarAds = config.sidebar.enabled
    ? {
        enabled: true,
        tools: config.sidebar.tools.map((s) => ({
          ...s,
          tool: allTools.find((t) => t.slug === s.slug) ?? null,
        })),
      }
    : null;

  const featured = config.featuredTools
    .map((slug) => allTools.find((t) => t.slug === slug))
    .filter((t): t is Tool => t != null);

  return {
    topBanner: config.topBanner.enabled && topBannerTool
      ? { ...config.topBanner, tool: topBannerTool }
      : null,
    sidebar: sidebarAds,
    featuredTools: featured,
    thirdParty: config.thirdParty,
  };
}
