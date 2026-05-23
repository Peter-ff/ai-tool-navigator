import { ToolCard } from "@/components/tool/ToolCard";
import { loadAllTools } from "@/lib/data";
import { AdBanner } from "@/components/ads/AdBanner";
import { Search, Plus } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

const STOP_WORDS = new Set([
  "我", "你", "他", "她", "它", "我们", "你们", "他们",
  "要", "想", "需要", "能够", "可以", "应该", "会",
  "一个", "一款", "一种", "这个", "那个", "哪个",
  "的", "了", "吗", "呢", "吧", "啊", "呀",
  "是", "在", "有", "和", "与", "或",
  "帮", "帮助", "给", "让", "把", "被",
  "什么", "怎么", "如何", "怎样", "为什么",
  "有没有", "有没有人", "是否", "哪", "哪些",
  "推荐", "介绍", "告诉", "知道", "看看",
  "一下", "一些", "一点", "很", "都", "就", "也",
  "不", "没", "好", "用", "做", "找", "搜索",
  "ai", "工具", "软件", "网站", "平台",
]);

function tokenize(text: string): string[] {
  const cleaned = text.toLowerCase().replace(/[，,。.！!？?\s]+/g, " ").trim();
  if (!cleaned) return [];

  const segments = cleaned.split(/\s+/).filter(Boolean);

  const keywords: string[] = [];
  for (const seg of segments) {
    if (/^[a-z]+$/.test(seg)) {
      if (!STOP_WORDS.has(seg) && seg.length > 1) {
        keywords.push(seg);
      }
      continue;
    }
    // Chinese: remove stop words
    let filtered = seg;
    for (const sw of STOP_WORDS) {
      filtered = filtered.replaceAll(sw, " ");
    }
    // Extract all meaningful substrings from remaining chars
    const chars = filtered.replace(/\s+/g, "");
    if (chars.length === 0) continue;

    // Full remaining string as one keyword
    keywords.push(chars);

    // Also add 2-char bigrams for finer matching
    for (let i = 0; i <= chars.length - 2; i++) {
      keywords.push(chars.slice(i, i + 2));
    }
  }
  return [...new Set(keywords)];
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const allTools = await loadAllTools();

  const query = q || "";
  const lower = query.toLowerCase();

  const nameMatches = query
    ? allTools.filter((t) => t.name.toLowerCase().includes(lower))
    : [];

  const results = (() => {
    if (!query) return [];

    // Primary: name match
    if (nameMatches.length > 0) {
      return nameMatches.sort((a, b) => {
        const aExact = a.name.toLowerCase() === lower ? 0 : 1;
        const bExact = b.name.toLowerCase() === lower ? 0 : 1;
        if (aExact !== bExact) return aExact - bExact;
        const aStart = a.name.toLowerCase().startsWith(lower) ? 0 : 1;
        const bStart = b.name.toLowerCase().startsWith(lower) ? 0 : 1;
        return aStart - bStart;
      });
    }

    // Secondary: tokenized keyword search
    const keywords = tokenize(query);
    if (keywords.length === 0) return [];

    const fullQuery = keywords.join("");
    const scored = allTools
      .map((t) => {
        const haystack = [
          t.tagline,
          t.description,
          ...t.tags,
          ...t.features,
        ].join(" ").toLowerCase();

        // Count how many distinct keywords match
        let score = 0;
        const matched = new Set<string>();
        for (const kw of keywords) {
          if (haystack.includes(kw)) {
            score += kw.length; // longer keyword = stronger signal
            matched.add(kw);
          }
        }

        // Bonus: full cleaned query matches as contiguous substring
        if (haystack.includes(fullQuery)) {
          score += 5;
        }

        return { tool: t, score, matched };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map((s) => s.tool);
  })();

  const suggestions = !query
    ? allTools
        .sort((a, b) => b.favorites_count - a.favorites_count)
        .slice(0, 12)
    : [];

  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-xl">
        <form action="/search" method="GET" className="relative">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-apple-quaternary"
          />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="搜索工具名称或描述..."
            className="w-full rounded-2xl border border-black/5 bg-white py-4 pl-13 pr-5 text-[17px] text-apple-text placeholder:text-apple-quaternary outline-none transition-all focus:border-apple-blue/30 focus:shadow-[0_0_0_3px_rgba(0,122,255,0.1)]"
            autoFocus
          />
        </form>
      </div>

      <div className="mx-auto mt-5 max-w-3xl">
        <AdBanner />
      </div>

      <div className="mx-auto mt-5 max-w-3xl">
        {query ? (
          <>
            <p className="mb-6 text-[14px] text-apple-secondary">
              搜索 &ldquo;{query}&rdquo; —{' '}
              <span className="font-medium text-apple-text">{results.length}</span> 个结果
            </p>
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[24px] bg-white py-20">
                <Search size={32} className="text-apple-border" />
                <p className="mt-4 text-[17px] text-apple-secondary">未找到相关工具</p>
                <p className="mt-1 text-[14px] text-apple-quaternary">如果你知道这款 AI 工具，欢迎提交给社区</p>
                <Link
                  href={`/submit?name=${encodeURIComponent(query)}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
                >
                  <Plus size={15} />
                  提交「{query}」
                </Link>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {results.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="mb-5 text-[15px] text-apple-secondary">大家都在找</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
