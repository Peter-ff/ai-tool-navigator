"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Sparkles, X } from "lucide-react";
import type { Tool } from "@/lib/types";
import type { TopBannerAd } from "@/lib/ad-store";

type BannerData = TopBannerAd & { tool: Tool };

export function AdBanner() {
  const [data, setData] = useState<BannerData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hidden = sessionStorage.getItem("ad-banner-dismissed");
    if (hidden) return;

    fetch("/api/ads")
      .then((res) => res.json())
      .then((json) => {
        if (json.topBanner?.tool) {
          setData(json.topBanner as BannerData);
        }
      })
      .catch(() => {});
  }, []);

  if (!data || dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-apple-blue via-apple-blue to-[#5856D6] px-6 py-4">
      <button
        onClick={() => {
          setDismissed(true);
          sessionStorage.setItem("ad-banner-dismissed", "1");
        }}
        className="absolute right-3 top-3 rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={16} />
      </button>

      <Link
        href={`/tool/${data.toolSlug}`}
        className="flex items-center gap-3 sm:gap-4"
      >
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white">
          <Sparkles size={11} />
          推荐
        </span>
        <span className="min-w-0 text-[14px] font-medium text-white truncate">
          <span className="font-semibold">{data.tool.name}</span>
          {" — "}
          <span className="text-white/85">{data.text}</span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-apple-blue transition-all hover:bg-white/90">
          {data.ctaText}
          <ExternalLink size={12} />
        </span>
      </Link>
    </div>
  );
}
