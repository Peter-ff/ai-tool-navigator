import Link from "next/link";
import { Star } from "lucide-react";
import { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ToolLogo } from "./ToolLogo";

const PRICE_BADGE: Record<string, { label: string; className: string }> = {
  free: { label: "免费", className: "bg-apple-green/10 text-apple-green-dark" },
  freemium: { label: "免费增值", className: "bg-apple-blue/10 text-apple-blue-dark" },
  paid: { label: "付费", className: "bg-apple-orange/10 text-[#c45500]" },
  "open-source": { label: "开源", className: "bg-apple-purple/10 text-apple-purple-dark" },
};

export function ToolCard({ tool }: { tool: Tool }) {
  const badge = PRICE_BADGE[tool.pricing.type];

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group flex flex-col rounded-2xl bg-white p-5 transition-all duration-200 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 border border-transparent hover:border-black/5"
    >
      <div className="flex items-start gap-3.5">
        <ToolLogo name={tool.name} logo={tool.logo} size="sm" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-apple-text group-hover:text-apple-blue transition-colors">
            {tool.name}
          </h3>
          <p className="mt-0.5 text-[13px] text-apple-secondary leading-snug line-clamp-2">
            {tool.tagline}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide", badge.className)}>
          {badge.label}
        </span>
        {tool.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-md bg-apple-bg px-2 py-0.5 text-[11px] text-apple-secondary">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-apple-orange text-apple-orange" />
          <span className="text-[13px] font-medium text-apple-text">{tool.rating}</span>
          <span className="text-[12px] text-apple-quaternary">({tool.review_count})</span>
        </div>
        <span className="text-[11px] text-apple-quaternary">{tool.added_date}</span>
      </div>
    </Link>
  );
}
