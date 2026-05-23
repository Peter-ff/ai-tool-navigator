"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";

const SORT_OPTIONS: Record<string, string> = {
  default: "综合推荐",
  latest: "最新收录",
  popular: "最受欢迎",
  free: "免费优先",
};

function SortSelectInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "default";
  const sub = searchParams.get("sub");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams();
    if (sub) params.set("sub", sub);
    if (val && val !== "default") params.set("sort", val);
    const qs = params.toString();
    router.push(pathname + (qs ? `?${qs}` : ""));
  };

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="cursor-pointer rounded-xl border border-black/10 bg-white px-3 py-1.5 text-[13px] text-apple-tertiary outline-none focus:border-apple-blue/30"
    >
      {Object.entries(SORT_OPTIONS).map(([key, label]) => (
        <option key={key} value={key}>{label}</option>
      ))}
    </select>
  );
}

export function SortSelect() {
  return (
    <Suspense>
      <SortSelectInner />
    </Suspense>
  );
}
