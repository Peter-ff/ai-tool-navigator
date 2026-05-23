import { notFound } from "next/navigation";
import Link from "next/link";
import { ToolCard } from "@/components/tool/ToolCard";
import { loadToolsByCategory } from "@/lib/data";
import { CATEGORIES, type Tool } from "@/lib/types";
import { SortSelect } from "@/components/category/SortSelect";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string; sort?: string }>;
};

const SORT_OPTIONS: Record<string, { label: string; fn: (a: Tool, b: Tool) => number }> = {
  default: { label: "综合推荐", fn: (a, b) => b.favorites_count * b.rating - a.favorites_count * a.rating },
  latest: { label: "最新收录", fn: (a, b) => b.added_date.localeCompare(a.added_date) },
  popular: { label: "最受欢迎", fn: (a, b) => b.favorites_count - a.favorites_count },
  free: { label: "免费优先", fn: (a, b) => {
    const freeOrder: Record<string, number> = { free: 0, freemium: 1, paid: 2, "open-source": 0 };
    return (freeOrder[a.pricing.type] ?? 3) - (freeOrder[b.pricing.type] ?? 3);
  }},
};

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name}工具`,
    description: category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sub, sort } = await searchParams;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const allCategoryTools = await loadToolsByCategory(slug);
  let tools = sub
    ? allCategoryTools.filter((t) => t.subcategory === sub)
    : allCategoryTools;

  const sortKey = sort && SORT_OPTIONS[sort] ? sort : "default";
  tools = [...tools].sort(SORT_OPTIONS[sortKey].fn);

  const activeSub = sub || "";

  return (
    <div className="container-page py-8">
      <nav className="mb-6 flex items-center gap-1 text-[13px] text-apple-quaternary">
        <Link href="/" className="hover:text-apple-blue transition-colors">首页</Link>
        <ChevronRight size={13} />
        <span className="text-apple-tertiary">{category.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-[28px] font-bold tracking-tight text-apple-text sm:text-[34px]">
          {category.name}工具
        </h1>
        <p className="mt-2 text-[17px] text-apple-secondary">{category.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block space-y-4">
          <div className="sticky top-20 rounded-2xl bg-white p-5">
            <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-apple-quaternary">
              子分类
            </h3>
            <ul className="space-y-0.5">
              <li>
                <Link
                  href={`/category/${slug}`}
                  className={activeSub === ""
                    ? "block rounded-lg bg-apple-blue/8 px-3 py-2 text-[13px] font-medium text-apple-blue"
                    : "block rounded-lg px-3 py-2 text-[13px] text-apple-tertiary transition-colors hover:bg-apple-bg hover:text-apple-text"
                  }
                >
                  全部
                </Link>
              </li>
              {category.subcategories.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/category/${slug}?sub=${s.slug}`}
                    className={activeSub === s.slug
                      ? "block rounded-lg bg-apple-blue/8 px-3 py-2 text-[13px] font-medium text-apple-blue"
                      : "block rounded-lg px-3 py-2 text-[13px] text-apple-tertiary transition-colors hover:bg-apple-bg hover:text-apple-text"
                    }
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <SidebarAd />
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[13px] text-apple-secondary">
              共 <span className="font-medium text-apple-text">{tools.length}</span> 个工具
            </p>
            <SortSelect />
          </div>

          {tools.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[24px] bg-white py-20">
              <p className="text-[17px] text-apple-secondary">该分类暂无工具</p>
              <Link href="/submit" className="mt-2 text-[14px] text-apple-blue hover:underline">
                提交第一个工具 →
              </Link>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
