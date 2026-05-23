import type { Tool, DailyRecommendation, Collection } from "./types";
import { loadAllTools as loadAllToolsBase } from "./load-tools";

export async function loadAllTools(): Promise<Tool[]> {
  return loadAllToolsBase();
}

export async function loadToolBySlug(slug: string): Promise<Tool | undefined> {
  const tools = await loadAllToolsBase();
  return tools.find((t) => t.slug === slug);
}

export async function loadToolsByCategory(category: string): Promise<Tool[]> {
  const tools = await loadAllToolsBase();
  return tools.filter((t) => t.category === category);
}

export async function loadLatestTools(limit = 10): Promise<Tool[]> {
  const tools = await loadAllToolsBase();
  return tools
    .sort((a, b) => new Date(b.added_date).getTime() - new Date(a.added_date).getTime())
    .slice(0, limit);
}

export async function loadPopularTools(limit = 10): Promise<Tool[]> {
  const tools = await loadAllToolsBase();
  return tools
    .sort((a, b) => b.favorites_count - a.favorites_count)
    .slice(0, limit);
}

export async function loadRelatedTools(slug: string, limit = 6): Promise<Tool[]> {
  const tool = await loadToolBySlug(slug);
  if (!tool) return [];
  const tools = await loadAllToolsBase();
  return tools
    .filter((t) => t.slug !== slug && t.category === tool.category)
    .slice(0, limit);
}

export async function loadAlternatives(slugs: string[]): Promise<Tool[]> {
  if (!slugs?.length) return [];
  const tools = await loadAllToolsBase();
  return slugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is Tool => t != null);
}

const collectionModules = {
  "best-ai-chatbots-2026": () => import("@/content/collections/best-ai-chatbots-2026.json"),
};

const recommendationModules = {
  "2026-05-22": () => import("@/content/recommendations/2026-05-22.json"),
};

export async function loadTodayRecommendation(): Promise<DailyRecommendation | undefined> {
  try {
    const files = Object.keys(recommendationModules);
    if (files.length === 0) return undefined;
    const latest = files.sort().reverse()[0];
    const m = await recommendationModules[latest as keyof typeof recommendationModules]();
    return (m as { default: DailyRecommendation }).default ?? (m as DailyRecommendation);
  } catch {
    return undefined;
  }
}

export async function loadCollections(): Promise<Collection[]> {
  const results = await Promise.all(
    Object.values(collectionModules).map((fn) => fn())
  );
  return results
    .map((m) => (m as { default: Collection }).default ?? (m as Collection))
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
}
