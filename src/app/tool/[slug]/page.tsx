import { notFound } from "next/navigation";
import Link from "next/link";
import { loadToolBySlug, loadAlternatives, loadRelatedTools, loadAllTools } from "@/lib/data";
import { CATEGORIES } from "@/lib/types";
import { ToolCard } from "@/components/tool/ToolCard";
import { ToolActions } from "@/components/tool/ToolActions";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { ToolLogo } from "@/components/tool/ToolLogo";
import {
  ChevronRight,
  Star,
} from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const tools = await loadAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await loadToolBySlug(slug);
  if (!tool) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aitoolnavigator.com";
  return {
    title: `${tool.name} — ${tool.tagline}`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — ${tool.tagline}`,
      description: tool.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — ${tool.tagline}`,
      description: tool.description,
    },
    alternates: {
      canonical: `${siteUrl}/tool/${tool.slug}`,
    },
  };
}

const PRICE_TYPE_MAP: Record<string, string> = {
  free: "免费",
  freemium: "免费增值",
  paid: "付费",
  "open-source": "开源",
};

const PRICE_COLOR: Record<string, string> = {
  free: "bg-apple-green/10 text-apple-green-dark",
  freemium: "bg-apple-blue/10 text-apple-blue-dark",
  paid: "bg-apple-orange/10 text-[#c45500]",
  "open-source": "bg-apple-purple/10 text-apple-purple-dark",
};

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = await loadToolBySlug(slug);
  if (!tool) notFound();

  const category = CATEGORIES.find((c) => c.slug === tool.category);
  const alternatives = await loadAlternatives(tool.alternatives);
  const relatedTools = await loadRelatedTools(slug, 4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aitoolnavigator.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: category?.name ?? tool.category,
    operatingSystem: tool.platforms.join(", "),
    url: `${siteUrl}/tool/${tool.slug}`,
    offers: {
      "@type": "Offer",
      price: tool.pricing.starting_price ?? (tool.pricing.type === "free" ? "0" : undefined),
      priceCurrency: tool.pricing.starting_price?.startsWith("¥") ? "CNY" : "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: tool.review_count,
    },
  };

  return (
    <div className="container-page py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-[13px] text-apple-quaternary">
        <Link href="/" className="hover:text-apple-blue transition-colors">首页</Link>
        <ChevronRight size={13} />
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-apple-blue transition-colors">
              {category.name}
            </Link>
            <ChevronRight size={13} />
          </>
        )}
        <span className="text-apple-tertiary">{tool.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main */}
        <div className="space-y-6">
          {/* Hero Card */}
          <div className="rounded-[24px] bg-white p-7 sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <ToolLogo name={tool.name} logo={tool.logo} />
              <div className="min-w-0">
                <h1 className="text-[26px] font-bold tracking-tight text-apple-text sm:text-[32px]">
                  {tool.name}
                </h1>
                <p className="mt-1.5 text-[17px] leading-relaxed text-apple-secondary">
                  {tool.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-apple-orange text-apple-orange" />
                    <span className="text-[14px] font-semibold text-apple-text">{tool.rating}</span>
                    <span className="text-[13px] text-apple-quaternary">({tool.review_count})</span>
                  </div>
                  <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-[12px] font-medium ${PRICE_COLOR[tool.pricing.type]}`}>
                    {PRICE_TYPE_MAP[tool.pricing.type]}
                  </span>
                  <span className="text-[13px] text-apple-quaternary">{tool.favorites_count} 人收藏</span>
                </div>
              </div>
            </div>

            <ToolActions
              slug={tool.slug}
              name={tool.name}
              website={tool.website}
            />
          </div>

          {/* Description */}
          <section className="rounded-[24px] bg-white p-7 sm:p-9">
            <h2 className="text-[17px] font-semibold tracking-tight text-apple-text">工具简介</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-apple-tertiary">{tool.description}</p>
          </section>

          {/* Features */}
          <section className="rounded-[24px] bg-white p-7 sm:p-9">
            <h2 className="text-[17px] font-semibold tracking-tight text-apple-text">核心功能</h2>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {tool.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-[14px] text-apple-tertiary">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-apple-blue" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Pricing */}
          <section className="rounded-[24px] bg-white p-7 sm:p-9">
            <h2 className="text-[17px] font-semibold tracking-tight text-apple-text">定价方案</h2>
            {tool.pricing.free_tier && (
              <p className="mt-3 text-[14px] text-apple-tertiary">免费额度：{tool.pricing.free_tier}</p>
            )}
            {tool.pricing.plans && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {tool.pricing.plans.map((plan) => (
                  <div key={plan.name} className="rounded-2xl bg-apple-bg p-5">
                    <h3 className="text-[14px] font-semibold text-apple-text">{plan.name}</h3>
                    <p className="mt-1 text-[22px] font-bold tracking-tight text-apple-blue">{plan.price}</p>
                    <ul className="mt-3 space-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="text-[12px] text-apple-secondary">· {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <section className="rounded-[24px] bg-white p-7 sm:p-9">
              <h2 className="text-[17px] font-semibold tracking-tight text-apple-text">同类替代</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/tool/${alt.slug}`}
                    className="group flex items-center gap-3 rounded-2xl bg-apple-bg p-4 transition-all hover:bg-apple-bg-hover"
                  >
                    <ToolLogo name={alt.name} logo={alt.logo} size="sm" />
                    <span className="text-[14px] font-medium text-apple-text group-hover:text-apple-blue transition-colors">
                      {alt.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <SidebarAd />
          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-apple-quaternary">基本信息</h3>
            <dl className="space-y-4 text-[14px]">
              <div className="flex items-center justify-between">
                <dt className="text-apple-secondary">价格</dt>
                <dd className="font-medium text-apple-text">{PRICE_TYPE_MAP[tool.pricing.type]}</dd>
              </div>
              {tool.pricing.starting_price && (
                <div className="flex items-center justify-between">
                  <dt className="text-apple-secondary">起价</dt>
                  <dd className="font-medium text-apple-text">{tool.pricing.starting_price}</dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="text-apple-secondary">平台</dt>
                <dd className="flex gap-1.5 font-medium text-apple-text">
                  {tool.platforms.includes("web") && "Web"}
                  {tool.platforms.includes("desktop") && " 桌面"}
                  {tool.platforms.includes("mobile") && " 移动"}
                  {tool.platforms.includes("browser-extension") && " 插件"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-apple-secondary">收录</dt>
                <dd className="font-medium text-apple-text">{tool.added_date}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-apple-quaternary">标签</h3>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map((tag) => (
                <span key={tag} className="rounded-lg bg-apple-bg px-2.5 py-1 text-[12px] text-apple-tertiary">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-apple-quaternary">适用场景</h3>
            <ul className="space-y-2">
              {tool.use_cases.map((uc) => (
                <li key={uc} className="flex items-center gap-2.5 text-[13px] text-apple-tertiary">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-apple-blue" />
                  {uc}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Related */}
      {relatedTools.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-apple-text">同类工具推荐</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
