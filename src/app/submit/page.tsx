"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, Home } from "lucide-react";
import { CATEGORIES } from "@/lib/types";

export default function SubmitPage() {
  return (
    <Suspense>
      <SubmitForm />
    </Suspense>
  );
}

function SubmitForm() {
  const searchParams = useSearchParams();
  const prefilledName = searchParams.get("name") || "";
  const [form, setForm] = useState({ name: prefilledName, website: "", tagline: "", category: "", description: "" });

  useEffect(() => {
    if (prefilledName) {
      setForm((prev) => ({ ...prev, name: prefilledName }));
    }
  }, [prefilledName]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.category) {
      setStatus("error");
      setMessage("请选择分类");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setForm({ name: "", website: "", tagline: "", category: "", description: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "提交失败");
      }
    } catch {
      setStatus("error");
      setMessage("网络错误，请稍后重试");
    }
  };

  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-lg">
        <h1 className="text-[28px] font-bold tracking-tight text-apple-text sm:text-[34px]">
          提交工具
        </h1>
        <p className="mt-2 text-[17px] text-apple-secondary">
          发现了好用的 AI 工具？提交给社区收录
        </p>

        {status === "success" ? (
          <div className="mt-8 flex flex-col items-center rounded-[24px] bg-white p-12 text-center">
            <CheckCircle2 size={48} className="text-apple-green" />
            <p className="mt-4 text-[17px] font-medium text-apple-text">提交成功</p>
            <p className="mt-1.5 text-[14px] text-apple-secondary">{message}</p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full bg-apple-bg px-6 py-2.5 text-[14px] font-medium text-apple-text transition-all hover:bg-apple-bg-hover active:scale-[0.97]"
              >
                <Home size={15} />
                返回主页
              </Link>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-full bg-apple-blue px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
              >
                继续提交
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-[24px] bg-white p-7 sm:p-9">
            {status === "error" && (
              <div className="flex items-center gap-2 rounded-xl bg-apple-red/8 px-4 py-3 text-[14px] text-apple-red">
                <AlertCircle size={16} />
                {message}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-apple-tertiary">
                工具名称 <span className="text-apple-red">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-apple-text placeholder:text-apple-quaternary outline-none transition-all focus:border-apple-blue/30 focus:shadow-[0_0_0_3px_rgba(0,122,255,0.08)]"
                placeholder="例如：ChatGPT"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-apple-tertiary">
                官网地址 <span className="text-apple-red">*</span>
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-apple-text placeholder:text-apple-quaternary outline-none transition-all focus:border-apple-blue/30 focus:shadow-[0_0_0_3px_rgba(0,122,255,0.08)]"
                placeholder="https://"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-apple-tertiary">
                一句话描述 <span className="text-apple-red">*</span>
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-apple-text placeholder:text-apple-quaternary outline-none transition-all focus:border-apple-blue/30 focus:shadow-[0_0_0_3px_rgba(0,122,255,0.08)]"
                placeholder="用一句话描述这个工具是做什么的"
                maxLength={60}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-apple-tertiary">
                分类 <span className="text-apple-red">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-apple-text outline-none transition-all focus:border-apple-blue/30 focus:shadow-[0_0_0_3px_rgba(0,122,255,0.08)]"
                required
              >
                <option value="">请选择分类</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-apple-tertiary">补充说明</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-apple-text placeholder:text-apple-quaternary outline-none transition-all focus:border-apple-blue/30 focus:shadow-[0_0_0_3px_rgba(0,122,255,0.08)]"
                rows={4}
                placeholder="描述工具的核心功能、价格信息、使用体验等"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-apple-blue py-3 text-[15px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.98] disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  提交中...
                </>
              ) : (
                "提交审核"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
