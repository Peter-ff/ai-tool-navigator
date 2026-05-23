import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-apple-bg">
      <div className="container-page py-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-[13px] text-apple-secondary transition-colors hover:text-apple-text"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-[12px] text-apple-quaternary transition-colors hover:text-apple-secondary">
                隐私政策
              </Link>
              <Link href="/terms" className="text-[12px] text-apple-quaternary transition-colors hover:text-apple-secondary">
                服务条款
              </Link>
            </div>
            <p className="text-[13px] text-apple-secondary">
              AI 工具导航 &mdash; 发现最适合你的 AI 工具
            </p>
            <p className="text-[11px] text-apple-quaternary">
              &copy; 2026 AI Tool Navigator
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
