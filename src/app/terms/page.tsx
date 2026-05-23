import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款",
  description: "AI 工具导航服务条款 — 使用本网站即表示你同意以下条款",
};

export default function TermsPage() {
  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-[28px] font-bold tracking-tight text-apple-text sm:text-[34px]">
          服务条款
        </h1>
        <p className="mt-2 text-[14px] text-apple-quaternary">最后更新日期：2026年5月23日</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-apple-tertiary">
          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">1. 服务说明</h2>
            <p>
              AI 工具导航（以下简称&ldquo;本站&rdquo;）是一个 AI
              工具信息聚合和导航平台，为用户提供 AI
              工具的发现、搜索和对比服务。本站内容由编辑团队整理和用户提交共同构成。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">2. 用户提交内容</h2>
            <p>当你向本站提交工具信息时，你声明并保证：</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>你提交的信息真实、准确，不包含虚假或误导性内容</li>
              <li>
                你提交的内容不侵犯任何第三方的知识产权、隐私权或其他合法权益
              </li>
              <li>
                你授予本站非独占、免版税、永久的许可，允许本站展示、修改和分发你提交的内容
              </li>
              <li>
                你同意提交内容经过审核后方可发布，本站保留拒绝或删除任何提交的权利
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">3. 知识产权</h2>
            <p>
              本站原创内容（包括但不限于页面设计、分类体系、编辑撰写的描述和推荐文字）受著作权法保护。
            </p>
            <p className="mt-2">
              工具名称、Logo
              和品牌标识归各自所有者所有。本站使用这些标识仅用于信息引荐目的，不暗示任何赞助或关联关系。
            </p>
            <p className="mt-2">
              用户保留其提交内容的所有权，但授予本站第 2 条所述的许可。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">4. 免责声明</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                本站仅提供工具信息导航，不对所收录工具的质量、安全性、可靠性做出任何明示或暗示的保证
              </li>
              <li>工具的价格、功能和可用性可能随时变化，以官网信息为准</li>
              <li>
                通过本站链接访问第三方网站所产生的任何后果，本站不承担责任
              </li>
              <li>本站不保证服务不中断，但会尽力维持正常运行</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">5. 使用限制</h2>
            <p>使用本站时，你同意不从事以下行为：</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>提交虚假、欺诈或恶意内容</li>
              <li>对本站进行自动化数据抓取（搜索引擎爬虫除外）</li>
              <li>干扰或破坏本站的正常运行</li>
              <li>利用本站进行任何违法活动</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">6. 广告与推广</h2>
            <p>
              本站可能展示第三方广告和推广内容。广告内容由广告主负责，本站不对广告内容的准确性负责。部分链接可能包含推广标识，你通过此类链接产生的购买行为可能使本站获得佣金。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">7. 条款变更</h2>
            <p>
              本站保留随时修改本服务条款的权利。重大变更将在本站显著位置公告。继续使用本站即表示你接受修改后的条款。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[20px] font-semibold text-apple-text">8. 管辖法律</h2>
            <p>
              本条款受中华人民共和国法律管辖。因本条款产生的争议，双方应首先友好协商解决；协商不成的，提交有管辖权的法院裁决。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
