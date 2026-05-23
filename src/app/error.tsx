"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page py-20">
      <div className="mx-auto flex max-w-md flex-col items-center rounded-[24px] bg-white p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-apple-red/8">
          <AlertCircle size={28} className="text-apple-red" />
        </div>
        <h1 className="mt-6 text-[22px] font-bold tracking-tight text-apple-text">
          出了点问题
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-apple-secondary">
          页面加载时出现了错误，请稍后重试
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
        >
          <RotateCcw size={15} />
          重试
        </button>
      </div>
    </div>
  );
}
