import { CategoryGrid } from "@/components/home/CategoryGrid";
import { loadTodayRecommendation, loadAllTools } from "@/lib/data";
import { RECOMMENDATION_TYPE_LABELS } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, Sparkles, Search } from "lucide-react";

export default async function HomePage() {
  const recommendation = await loadTodayRecommendation();
  const allTools = await loadAllTools();
  const recommendTools = recommendation
    ? recommendation.tools
        .map((r) => allTools.find((t) => t.slug === r.slug))
        .filter((t): t is NonNullable<typeof t> => t != null)
        .slice(0, 3)
    : [];

  return (
    <div className="container-page py-10">
      {/* Hero */}
      <section className="mb-12 text-center sm:text-left">
        <h1 className="text-[32px] font-bold tracking-tight text-apple-text sm:text-[42px] leading-tight">
          发现适合你的<br className="sm:hidden" /> AI 工具
        </h1>
        <p className="mt-3 text-[17px] leading-snug text-apple-secondary sm:text-[19px] text-nowrap">
          从 200+ 款 AI 工具中，找到最适合你的那一款<span className="text-apple-quaternary text-sm">（每日至少新增 1 款）</span>
        </p>
        <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="/search"
            prefetch={true}
            className="inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
          >
            <Search size={17} />
            搜索工具
          </Link>
          <Link
            href="/category/ai-writing"
            prefetch={true}
            className="inline-flex items-center gap-2 rounded-full bg-apple-bg px-6 py-3 text-[15px] font-medium text-apple-text transition-all hover:bg-apple-bg-hover active:scale-[0.97]"
          >
            随便逛逛
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="mb-12">
        <CategoryGrid />
      </section>

      {/* Today's Recommendation */}
      {recommendation && recommendTools.length > 0 && (
        <section className="mb-12 overflow-hidden rounded-[24px] bg-white">
          <div className="px-6 pb-2 pt-7 sm:px-8 sm:pt-9">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-apple-blue/10 px-3 py-1 text-[11px] font-medium tracking-wide text-apple-blue">
                <Sparkles size={11} />
                {RECOMMENDATION_TYPE_LABELS[recommendation.type]}
              </span>
              <span className="text-[12px] text-apple-quaternary">{recommendation.date}</span>
            </div>
            <h2 className="max-w-2xl text-[22px] font-bold tracking-tight text-apple-text sm:text-[26px]">
              {recommendation.title}
            </h2>
            <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-apple-secondary">
              {recommendation.description}
            </p>
          </div>
          <div className="grid gap-px bg-apple-bg sm:grid-cols-3">
            {recommendTools.map((tool, i) => (
              <Link
                key={tool.slug}
                href={`/tool/${tool.slug}`}
                prefetch={true}
                className="group flex flex-col justify-between bg-white p-6 transition-colors hover:bg-[#f9f9fb] sm:p-7"
              >
                <div>
                  <h3 className="text-[17px] font-bold text-apple-text group-hover:text-apple-blue transition-colors tracking-tight">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-apple-secondary line-clamp-2">
                    {tool.tagline}
                  </p>
                </div>
                <p className="mt-3 text-[12px] leading-snug text-apple-blue">
                  推荐理由：{recommendation.tools[i]?.reason}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="rounded-[24px] bg-apple-text px-8 py-12 text-center sm:px-12 sm:py-14">
        <h2 className="text-[26px] font-bold tracking-tight text-white sm:text-[30px]">
          有好的 AI 工具要分享？
        </h2>
        <p className="mt-2 text-[16px] leading-relaxed text-white/60">
          提交给社区，审核通过后收录到导航站
        </p>
        <Link
          href="/submit"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-medium text-apple-text transition-all hover:bg-[#e8e8ed] active:scale-[0.97]"
        >
          提交工具
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
