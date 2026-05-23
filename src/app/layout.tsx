import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aitoolnavigator.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI 工具导航 — 发现最适合你的 AI 工具",
    template: "%s | AI 工具导航",
  },
  description:
    "AI 工具导航收录 300+ 优质 AI 工具，覆盖写作、绘画、编程、视频、办公等 12 大分类。每天更新推荐，帮你高效选型。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "AI 工具导航",
    title: "AI 工具导航 — 发现最适合你的 AI 工具",
    description:
      "AI 工具导航收录 300+ 优质 AI 工具，覆盖写作、绘画、编程、视频、办公等 12 大分类。每天更新推荐，帮你高效选型。",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 工具导航 — 发现最适合你的 AI 工具",
    description:
      "AI 工具导航收录 300+ 优质 AI 工具，覆盖写作、绘画、编程、视频、办公等 12 大分类。每天更新推荐，帮你高效选型。",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-apple-bg font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <noscript>
          <div style={{ padding: "16px", textAlign: "center", fontSize: "14px", color: "#86868b" }}>
            你的浏览器未启用 JavaScript，部分交互功能可能不可用。
          </div>
        </noscript>
      </body>
    </html>
  );
}
