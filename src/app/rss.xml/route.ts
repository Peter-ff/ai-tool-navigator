import { loadAllTools } from "@/lib/data";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aitoolnavigator.com";
  const tools = await loadAllTools();

  const items = tools
    .sort((a, b) => new Date(b.added_date).getTime() - new Date(a.added_date).getTime())
    .map((tool) => `    <item>
      <title><![CDATA[${tool.name} — ${tool.tagline}]]></title>
      <link>${baseUrl}/tool/${tool.slug}</link>
      <description><![CDATA[${tool.description}]]></description>
      <pubDate>${new Date(tool.added_date).toUTCString()}</pubDate>
      <guid>${baseUrl}/tool/${tool.slug}</guid>
      <category>${tool.category}</category>
    </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI 工具导航</title>
    <link>${baseUrl}</link>
    <description>发现最适合你的 AI 工具 — 收录 300+ 优质 AI 工具</description>
    <language>zh-CN</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
