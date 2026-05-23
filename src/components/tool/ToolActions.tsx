"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart, Share2, Globe, ExternalLink, Check } from "lucide-react";

type Props = {
  slug: string;
  name: string;
  website: string;
};

export function ToolActions({ slug, name, website }: Props) {
  const [favorited, setFavorited] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const favs: string[] = JSON.parse(stored);
        setFavorited(favs.includes(slug));
      } catch {}
    }
  }, [slug]);

  const handleFavorite = useCallback(() => {
    const stored = localStorage.getItem("favorites");
    let favs: string[] = [];
    if (stored) {
      try { favs = JSON.parse(stored); } catch {}
    }
    if (favorited) {
      favs = favs.filter((s) => s !== slug);
    } else {
      favs.push(slug);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorited(!favorited);
  }, [favorited, slug]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/tool/${slug}`;
    const text = `${name} — AI 工具导航`;

    if (navigator.share) {
      try {
        await navigator.share({ title: name, text, url });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {}
    }
  }, [slug, name]);

  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
      >
        <Globe size={15} />
        访问官网
        <ExternalLink size={13} />
      </a>
      <button
        onClick={handleFavorite}
        className="inline-flex items-center gap-2 rounded-full bg-apple-bg px-6 py-2.5 text-[14px] font-medium text-apple-text transition-all hover:bg-apple-bg-hover active:scale-[0.97]"
      >
        <Heart
          size={15}
          className={favorited ? "fill-apple-red text-apple-red" : ""}
        />
        {favorited ? "已收藏" : "收藏"}
      </button>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full bg-apple-bg px-6 py-2.5 text-[14px] font-medium text-apple-text transition-all hover:bg-apple-bg-hover active:scale-[0.97]"
      >
        {shared ? (
          <>
            <Check size={15} className="text-apple-green" />
            已复制
          </>
        ) : (
          <>
            <Share2 size={15} />
            分享
          </>
        )}
      </button>
    </div>
  );
}
