import { ToolCard } from "@/components/tool/ToolCard";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { loadLatestTools, loadPopularTools, loadTodayRecommendation, loadAllTools } from "@/lib/data";
import { RECOMMENDATION_TYPE_LABELS } from "@/lib/types";
import { AdBanner } from "@/components/ads/AdBanner";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default async function HomePage() {
  const recommendation = await loadTodayRecommendation();
  const latestTools = await loadLatestTools(6);
  const popularTools = await loadPopularTools(6);
  const allTools = await loadAllTools();
  const recommendTools = recommendation
    ? recommendation.tools
        .map((r) => allTools.find((t) => t.slug === r.slug))
        .filter((t): t is NonNullable<typeof t> => t != null)
    : [];

  return (
    <div className="container-page py-10">
      {/* Hero + Today's Recommendation */}
      {recommendation && recommendTools.length > 0 && (
        <section className="mb-10 overflow-hidden rounded-[28px] bg-white">
          <div className="px-6 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-apple-blue/10 px-3 py-1 text-[11px] font-medium tracking-wide text-apple-blue">
                <Sparkles size={11} />
                {RECOMMENDATION_TYPE_LABELS[recommendation.type]}
              </span>
              <span className="text-[12px] text-apple-quaternary">{recommendation.date}</span>
            </div>
            <h2 className="max-w-2xl text-[28px] font-bold leading-tight tracking-tight text-apple-text sm:text-[34px]">
              {recommendation.title}
            </h2>
            <p className="mt-2 max-w-xl text-[17px] leading-relaxed text-apple-secondary">
              {recommendation.description}
            </p>
          </div>
          <div className="grid gap-px bg-apple-bg sm:grid-cols-2 lg:grid-cols-4">
            {recommendTools.map((tool, i) => (
              <Link
                key={tool.slug}
                href={`/tool/${tool.slug}`}
                className="group relative flex flex-col justify-between bg-white p-6 transition-colors hover:bg-[#f9f9fb] sm:p-7"
              >
                <span className="absolute right-5 top-5 text-[11px] font-medium text-apple-quaternary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-apple-bg text-sm font-medium text-apple-quaternary">
                    {tool.name[0]}
                  </div>
                  <h3 className="mt-3.5 text-[15px] font-semibold text-apple-text group-hover:text-apple-blue transition-colors">
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

      {/* Category Grid */}
      <section className="mb-10">
        <CategoryGrid />
      </section>

      {/* Top Banner Ad */}
      <section className="mb-10">
        <AdBanner />
      </section>

      {/* Latest & Popular */}
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-semibold tracking-tight text-apple-text">最新收录</h2>
            <Link href="/search" className="flex items-center gap-1 text-[13px] text-apple-blue hover:underline">
              查看全部 <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {latestTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-semibold tracking-tight text-apple-text">本周热门</h2>
            <Link href="/search" className="flex items-center gap-1 text-[13px] text-apple-blue hover:underline">
              查看全部 <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="mt-10 rounded-[28px] bg-apple-text px-8 py-14 text-center sm:px-12 sm:py-16">
        <h2 className="text-[28px] font-bold tracking-tight text-white sm:text-[34px]">
          分享你发现的优秀工具
        </h2>
        <p className="mt-2 text-[17px] leading-relaxed text-apple-secondary">
          提交给社区，审核通过后收录到导航站
        </p>
        <Link
          href="/submit"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-medium text-apple-text transition-all hover:bg-[#e8e8ed] active:scale-[0.97]"
        >
          提交工具
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
