import Link from "next/link";
import { CATEGORIES, type CategorySlug } from "@/lib/types";

const CAT_COLORS: Record<CategorySlug, { bg: string; icon: string; hover: string }> = {
  "ai-writing":     { bg: "bg-[#f0f4ff]", icon: "text-[#5b6eff]", hover: "group-hover:bg-[#5b6eff]" },
  "ai-image":       { bg: "bg-[#fdf2f8]", icon: "text-[#e0447e]", hover: "group-hover:bg-[#e0447e]" },
  "ai-coding":      { bg: "bg-[#edf7f0]", icon: "text-[#2ea056]", hover: "group-hover:bg-[#2ea056]" },
  "ai-video":       { bg: "bg-[#fff7ed]", icon: "text-[#e8852e]", hover: "group-hover:bg-[#e8852e]" },
  "ai-office":      { bg: "bg-[#f3f0ff]", icon: "text-[#7c5ce7]", hover: "group-hover:bg-[#7c5ce7]" },
  "ai-design":      { bg: "bg-[#fff0f5]", icon: "text-[#d94e7e]", hover: "group-hover:bg-[#d94e7e]" },
  "ai-marketing":   { bg: "bg-[#eff9f0]", icon: "text-[#22a03e]", hover: "group-hover:bg-[#22a03e]" },
  "ai-audio":       { bg: "bg-[#fff4ed]", icon: "text-[#e86a3a]", hover: "group-hover:bg-[#e86a3a]" },
  "ai-education":   { bg: "bg-[#eef6ff]", icon: "text-[#2f80d0]", hover: "group-hover:bg-[#2f80d0]" },
  "ai-customer-service": { bg: "bg-[#f2faf5]", icon: "text-[#1faa5a]", hover: "group-hover:bg-[#1faa5a]" },
  "ai-data":        { bg: "bg-[#f0f5ff]", icon: "text-[#4a6ef5]", hover: "group-hover:bg-[#4a6ef5]" },
  "ai-lifestyle":   { bg: "bg-[#fef5f5]", icon: "text-[#d94a4a]", hover: "group-hover:bg-[#d94a4a]" },
};

const ICON_SVG: Record<CategorySlug, string> = {
  "ai-writing":     "M17 21v-1.5a2.5 2.5 0 0 0-2.5-2.5h-5A2.5 2.5 0 0 0 7 19.5V21m-4-11 7.8-5.2a2 2 0 0 1 2.4 0L21 10M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7",
  "ai-image":       "M15 8h.01M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm7 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm6.5 8-4.3-5.7a1 1 0 0 0-1.3-.2L7 15",
  "ai-coding":      "M16 18l6-6-6-6M8 6l-6 6 6 6",
  "ai-video":       "M15 10l4.55-2.72a1 1 0 0 1 1.45.9v7.64a1 1 0 0 1-1.45.9L15 14m-9-1H2v-2h4m2.83-4.17-2.83 2.83m0 8.48 2.83 2.83",
  "ai-office":      "M4 4h16v16H4zm4 4h8v1H8zm0 4h8v1H8zm0 3h5v1H8z",
  "ai-design":      "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V9h3.28a2 2 0 1 1 0 2H13v3.28a2 2 0 1 1-2 0V11H5.72a2 2 0 1 1 0-2H11V5.72A2 2 0 0 1 12 2Z",
  "ai-marketing":   "M4 20h16M4 20V4m16 16V4m-8 4v8m4-8v8M8 8v8",
  "ai-audio":       "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  "ai-education":   "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  "ai-customer-service": "M3 11a9 9 0 1 1 18 0c0 2.3-.9 4.4-2.3 6M3 11v2a4 4 0 0 0 4 4h.5m13.2 6c-1 0-1.7-.7-1.7-1.7V18c0-1 .7-1.7 1.7-1.7.5 0 1 .2 1.3.5.8-.9 1.3-2.1 1.3-3.3",
  "ai-data":        "M18 20V10m-6 10V4M6 20v-6m15-1-3-3m0 0-3 3m3-3v10M5 5l3 3m0 0 3-3m-3 3V18",
  "ai-lifestyle":   "M19.5 13.572 12 21l-7.5-7.428A5 5 0 1 1 12 7.006a5 5 0 1 1 7.5 6.572",
};

export function CategoryGrid() {
  return (
    <section>
      <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-apple-text">
        按分类浏览
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const color = CAT_COLORS[cat.slug];
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              prefetch={true}
              className="group flex items-start gap-3.5 rounded-2xl bg-white p-4 transition-all duration-200 ease-out hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 border border-transparent hover:border-black/5 active:scale-[0.97]"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color.bg} ${color.icon} transition-colors ${color.hover} group-hover:text-white`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICON_SVG[cat.slug]} />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-apple-text group-hover:text-apple-blue transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-0.5 text-[12px] text-apple-quaternary leading-snug line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
