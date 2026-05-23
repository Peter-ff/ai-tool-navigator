"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Search } from "lucide-react";
import { ToolCard } from "@/components/tool/ToolCard";
import type { Tool } from "@/lib/types";

export default function FavoritesPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (!stored) {
      setLoading(false);
      return;
    }
    let favs: string[] = [];
    try { favs = JSON.parse(stored); } catch { setLoading(false); return; }
    if (favs.length === 0) {
      setLoading(false);
      return;
    }

    fetch(`/api/tools?slugs=${favs.join(",")}`)
      .then((res) => res.json())
      .then((data) => { setTools(data.tools ?? []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold tracking-tight text-apple-text sm:text-[34px]">
          我的收藏
        </h1>
        <p className="mt-2 text-[17px] text-apple-secondary">
          你收藏的 AI 工具列表
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-apple-blue" style={{ animationDelay: "0ms" }} />
            <span className="h-2 w-2 animate-pulse rounded-full bg-apple-blue" style={{ animationDelay: "150ms" }} />
            <span className="h-2 w-2 animate-pulse rounded-full bg-apple-blue" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      ) : tools.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[24px] bg-white py-20">
          <Heart size={32} className="text-apple-border" />
          <p className="mt-4 text-[17px] text-apple-secondary">收藏夹是空的</p>
          <p className="mt-1 text-[14px] text-apple-quaternary">浏览工具并点击心形图标收藏</p>
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-apple-bg px-6 py-2.5 text-[14px] font-medium text-apple-text transition-all hover:bg-apple-bg-hover active:scale-[0.97]"
            >
              <Search size={15} />
              搜索工具
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
            >
              浏览首页
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
