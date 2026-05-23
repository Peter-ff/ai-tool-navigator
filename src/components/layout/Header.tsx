import Link from "next/link";
import { Search, Plus, Heart } from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/72 backdrop-blur-[20px] backdrop-saturate-[180%]">
      <div className="container-page flex h-12 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-[17px] font-semibold tracking-tight text-apple-text no-underline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <rect width="24" height="24" rx="6" fill="#007AFF"/>
              <path d="M7 17V7l10 5-10 5Z" fill="white"/>
            </svg>
            工具导航
          </Link>
          <nav className="hidden items-center lg:flex">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="rounded-lg px-3 py-1.5 text-[13px] text-apple-tertiary transition-colors hover:bg-black/5 hover:text-apple-text"
              >
                {cat.name}
              </Link>
            ))}
            <div className="group relative">
              <span className="cursor-pointer rounded-lg px-3 py-1.5 text-[13px] text-apple-secondary transition-colors hover:bg-black/5 hover:text-apple-tertiary">
                更多 ▾
              </span>
              <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <div className="rounded-xl bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.1)] ring-1 ring-black/5 min-w-[180px]">
                  {CATEGORIES.slice(5).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block rounded-lg px-3 py-2 text-[13px] text-apple-tertiary transition-colors hover:bg-apple-bg hover:text-apple-text whitespace-nowrap"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="flex items-center gap-1.5 rounded-full bg-apple-bg px-4 py-1.5 text-[13px] text-apple-secondary transition-colors hover:bg-apple-bg-hover hover:text-apple-tertiary"
          >
            <Search size={15} />
            <span className="hidden sm:inline">搜索</span>
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 rounded-full bg-apple-bg px-3 py-1.5 text-[13px] text-apple-secondary transition-colors hover:bg-apple-bg-hover hover:text-apple-tertiary"
          >
            <Heart size={15} />
            <span className="hidden sm:inline">收藏</span>
          </Link>
          <Link
            href="/submit"
            className="flex items-center gap-1.5 rounded-full bg-apple-blue px-4 py-1.5 text-[13px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">提交</span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
