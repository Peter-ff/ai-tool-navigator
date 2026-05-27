import Link from "next/link";
import { Tool, type CategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";

const PRICE_BADGE: Record<string, { label: string; className: string }> = {
  free: { label: "免费", className: "bg-apple-green/10 text-apple-green-dark" },
  freemium: { label: "免费增值", className: "bg-apple-blue/10 text-apple-blue-dark" },
  paid: { label: "付费", className: "bg-apple-orange/10 text-[#c45500]" },
  "open-source": { label: "开源", className: "bg-apple-purple/10 text-apple-purple-dark" },
};

const CATEGORY_HEADER: Record<CategorySlug, string> = {
  "ai-writing":     "bg-gradient-to-br from-[#c4b5f5] to-[#a78bfa]",
  "ai-image":       "bg-gradient-to-br from-[#f5a0c0] to-[#e878a0]",
  "ai-coding":      "bg-gradient-to-br from-[#80d8a0] to-[#50c878]",
  "ai-video":       "bg-gradient-to-br from-[#f5c878] to-[#e8b050]",
  "ai-office":      "bg-gradient-to-br from-[#8898f0] to-[#6878d8]",
  "ai-design":      "bg-gradient-to-br from-[#f08898] to-[#d86878]",
  "ai-marketing":   "bg-gradient-to-br from-[#b0d870] to-[#90c050]",
  "ai-audio":       "bg-gradient-to-br from-[#f88870] to-[#e06850]",
  "ai-education":   "bg-gradient-to-br from-[#60c8e8] to-[#40a8d0]",
  "ai-customer-service": "bg-gradient-to-br from-[#60c0b8] to-[#40a898]",
  "ai-data":        "bg-gradient-to-br from-[#7888d8] to-[#5868c0]",
  "ai-lifestyle":   "bg-gradient-to-br from-[#e0a080] to-[#c88060]",
};

export function ToolCard({ tool }: { tool: Tool }) {
  const badge = PRICE_BADGE[tool.pricing.type];
  const headerBg = CATEGORY_HEADER[tool.category] ?? "bg-gradient-to-br from-apple-blue to-[#4340c2]";

  return (
    <Link
      href={`/tool/${tool.slug}`}
      prefetch={true}
      className="group flex flex-col rounded-2xl bg-white overflow-hidden transition-all duration-200 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 border border-transparent hover:border-black/5"
    >
      <div className={cn("px-5 py-4", headerBg)}>
        <h3 className="text-[17px] font-bold text-white tracking-tight leading-tight">
          {tool.name}
        </h3>
        <p className="mt-0.5 text-[13px] text-white/80 leading-snug line-clamp-2">
          {tool.tagline}
        </p>
      </div>

      <div className="flex flex-col gap-2.5 p-4 pt-3.5">
        <div className="flex flex-wrap gap-1.5">
          <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide", badge.className)}>
            {badge.label}
          </span>
          {tool.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-md bg-apple-bg px-2 py-0.5 text-[11px] text-apple-secondary">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-apple-quaternary">{tool.added_date}</span>
      </div>
    </Link>
  );
}
