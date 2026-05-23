"use client";

import { useState, useEffect } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/95 p-4 backdrop-blur-lg sm:p-5">
      <div className="container-page flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-relaxed text-apple-secondary sm:text-[14px]">
          本网站使用 Cookie 来保存偏好设置、分析流量并支持广告投放。
          继续使用即表示你同意我们的{" "}
          <a href="/privacy" className="text-apple-blue underline hover:text-apple-blue-hover">
            隐私政策
          </a>
          。
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={accept}
            className="shrink-0 rounded-full bg-apple-blue px-5 py-2 text-[13px] font-medium text-white transition-all hover:bg-apple-blue-hover active:scale-[0.97]"
          >
            同意
          </button>
          <a
            href="/privacy"
            className="shrink-0 rounded-full bg-apple-bg px-5 py-2 text-[13px] font-medium text-apple-tertiary transition-all hover:bg-apple-bg-hover"
          >
            了解更多
          </a>
        </div>
      </div>
    </div>
  );
}
