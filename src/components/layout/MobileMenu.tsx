"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Plus, Heart } from "lucide-react";
import { CATEGORIES } from "@/lib/types";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-lg p-2 text-apple-tertiary hover:bg-black/5"
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="fixed inset-0 top-12 z-40 bg-white">
          <nav className="flex flex-col p-4">
            <div className="mb-3">
              <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-apple-quaternary">
                分类浏览
              </p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-[15px] text-apple-text transition-colors hover:bg-apple-bg"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="mx-3 my-2 border-t border-black/5" />

            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-apple-text transition-colors hover:bg-apple-bg"
            >
              <Search size={18} className="text-apple-tertiary" />
              搜索工具
            </Link>
            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-apple-text transition-colors hover:bg-apple-bg"
            >
              <Heart size={18} className="text-apple-tertiary" />
              我的收藏
            </Link>
            <Link
              href="/submit"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-apple-blue transition-colors hover:bg-apple-blue/5"
            >
              <Plus size={18} />
              提交工具
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
