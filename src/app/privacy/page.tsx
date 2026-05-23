import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "AI 工具导航隐私政策 — 我们如何收集、使用和保护你的个人信息",
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-[28px] font-bold tracking-tight text-apple-text sm:text-[34px]">
          隐私政策
        </h1>
        <p className="mt-2 text-[14px] text-apple-quaternary">最后更新日期：2026年5月23日</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-apple-tertiary">
          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">1. 信息收集</h2>
            <p>当你在本网站提交工具信息时，我们会收集你主动提供的信息，包括但不限于：工具名称、官网地址、分类和描述。</p>
            <p className="mt-2">当你访问本网站时，我们会自动收集以下信息：</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>IP 地址（用于速率限制和安全防护）</li>
              <li>浏览器类型和版本</li>
              <li>访问时间和页面浏览记录</li>
              <li>通过 Cookie 存储的偏好设置（如收藏列表、Cookie 同意状态）</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">2. 信息使用</h2>
            <p>我们收集的信息用于以下目的：</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>处理和展示你提交的工具信息</li>
              <li>防范恶意提交和滥用行为</li>
              <li>分析网站流量和用户行为以改进服务</li>
              <li>通过 Vercel Analytics 进行匿名访问统计</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">3. Cookie 使用</h2>
            <p>本网站使用以下类型的 Cookie：</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>功能性 Cookie</strong>：存储你的收藏列表和偏好设置</li>
              <li><strong>分析 Cookie</strong>：通过 Vercel Analytics 匿名统计页面访问数据</li>
              <li><strong>广告 Cookie</strong>：第三方广告平台可能设置 Cookie 用于个性化广告</li>
            </ul>
            <p className="mt-2">你可以通过浏览器设置禁用 Cookie，但这可能影响部分功能的使用。</p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">4. 第三方服务</h2>
            <p>本网站使用以下第三方服务：</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Vercel</strong>：托管和内容分发，可能收集访问日志</li>
              <li><strong>Vercel Analytics</strong>：匿名访问统计</li>
              <li><strong>Upstash Redis</strong>：存储用户提交的工具信息</li>
              <li><strong>广告联盟</strong>：未来可能接入 Google AdSense 或百度联盟等广告平台</li>
            </ul>
            <p className="mt-2">这些第三方服务有其独立的隐私政策，我们不对其数据处理行为负责。</p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">5. 数据安全</h2>
            <p>我们采取合理的技术措施保护你的信息安全，包括 HTTPS 加密传输和速率限制防护。但请注意，互联网上的数据传输无法保证 100% 安全。</p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">6. 数据保留</h2>
            <p>提交的工具信息会保留在 Redis 数据库中，直至审核通过或删除。匿名访问统计数据保留期限由 Vercel Analytics 决定。</p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">7. 你的权利</h2>
            <p>根据适用的数据保护法律，你有权：</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>查询我们持有的你的个人信息</li>
              <li>要求更正或删除你的个人信息</li>
              <li>撤回 Cookie 同意</li>
              <li>投诉至相关监管机构</li>
            </ul>
            <p className="mt-2">如需行使以上权利，请通过网站提交页面与我们联系。</p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">8. 政策更新</h2>
            <p>我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，更新日期将随之变更。建议你定期查阅本页面。</p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">9. 联系方式</h2>
            <p>如果你对本隐私政策有任何疑问，请通过网站的「提交工具」页面与我们联系。</p>
          </section>
        </div>
      </div>
    </div>
  );
}
