import { loadAllTools, loadCollections } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aitoolnavigator.com";
  const tools = await loadAllTools();
  const collections = await loadCollections();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: tool.updated_date ? new Date(tool.updated_date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const collectionPages: MetadataRoute.Sitemap = collections.map((col) => ({
    url: `${baseUrl}/collection/${col.slug}`,
    lastModified: new Date(col.published_date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...collectionPages];
}
