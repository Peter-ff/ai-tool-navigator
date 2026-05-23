import Link from "next/link";
import { Search, Home, Send } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <div className="mx-auto flex max-w-md flex-col items-center rounded-[24px] bg-white p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-apple-bg">
          <Search size={28} className="text-apple-quaternary" />
        </div>
        <h1 className="mt-6 text-[22px] font-bold tracking-tight text-apple-text">
          页面未找到
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-apple-secondary">
          您访问的页面不存在或已被移除，请检查地址是否正确
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-apple-bg px-6 py-2.5 text-[14px] font-medium text-apple-text transition-all hover:bg-apple-bg-hover active:scale-[0.97]"
          >
            <Home size={15} />
            返回主页
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-full bg-apple-blue px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
          >
            <Search size={15} />
            搜索工具
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-apple-bg px-6 py-2.5 text-[14px] font-medium text-apple-text transition-all hover:bg-apple-bg-hover active:scale-[0.97]"
          >
            <Send size={15} />
            提交工具
          </Link>
        </div>
      </div>
    </div>
  );
}
