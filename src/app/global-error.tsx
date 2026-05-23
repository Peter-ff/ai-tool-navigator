"use client";

import { AlertCircle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-apple-bg font-sans antialiased">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="flex max-w-md flex-col items-center rounded-[24px] bg-white p-12 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-apple-red/8">
              <AlertCircle size={28} className="text-apple-red" />
            </div>
            <h1 className="mt-6 text-[22px] font-bold tracking-tight text-apple-text">
              出了点问题
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-apple-secondary">
              应用遇到了意外错误，请刷新页面重试
            </p>
            <button
              onClick={() => reset()}
              className="mt-8 rounded-full bg-apple-blue px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
            >
              刷新页面
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
