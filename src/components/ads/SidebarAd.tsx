"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { SidebarAds } from "@/lib/ad-store";
import type { Tool } from "@/lib/types";

type SidebarData = Omit<SidebarAds, "tools"> & { tools: (SidebarAds["tools"][number] & { tool: Tool | null })[] };

export function SidebarAd() {
  const [data, setData] = useState<SidebarData | null>(null);

  useEffect(() => {
    fetch("/api/ads")
      .then((res) => res.json())
      .then((json) => {
        if (json.sidebar?.enabled && json.sidebar.tools?.length > 0) {
          setData(json.sidebar as SidebarData);
        }
      })
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="rounded-2xl bg-white p-5">
      <h3 className="mb-3 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-apple-quaternary">
        <Sparkles size={12} className="text-apple-blue" />
        编辑推荐
      </h3>
      <div className="space-y-2.5">
        {data.tools.map((item) =>
          item.tool ? (
            <Link
              key={item.slug}
              href={`/tool/${item.slug}`}
              className="block rounded-xl bg-apple-bg p-3 transition-colors hover:bg-apple-bg-hover"
            >
              <p className="text-[13px] font-medium text-apple-text">
                {item.tool.name}
              </p>
              <p className="mt-0.5 text-[12px] text-apple-secondary">
                {item.text}
              </p>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}
