// Batch 3: ~16 more tools to hit 200+
import * as fs from "fs";
import * as path from "path";

const TOOLS_DIR = path.join(process.cwd(), "content/tools");

// Quick inline helper: write a tool JSON and print status
function tool(slug: string, data: Record<string, unknown>) {
  // Skip if already exists
  const filePath = path.join(TOOLS_DIR, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    console.log(`  ⏭ ${slug} (exists, skipped)`);
    return;
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  const cat = data.category as string;
  console.log(`  ✓ ${slug} (${cat})`);
}

if (!fs.existsSync(TOOLS_DIR)) {
  console.error(`Directory ${TOOLS_DIR} does not exist`);
  process.exit(1);
}

console.log(`Batch 3 starting — ${fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.json')).length} existing tools\n`);

// ===== AI 编程 (3) =====
tool("devin", {
  name: "Devin",
  tagline: "全球首个 AI 软件工程师，全自动编程和部署",
  description: "Devin 是 Cognition AI 推出的全球首个 AI 软件工程师。不仅能写代码，还能独立规划项目、搭建环境、调试错误、甚至部署上线。用户只需描述需求，Devin 可以全程自主完成。已在实际工程任务中展现出惊人的能力，被誉为 AI 编程的里程碑。",
  category: "ai-coding",
  tags: ["AI 编程", "自动部署", "AI 工程师", "编程代理", "商业产品"],
  website: "https://www.cognition.ai",
  pricing_type: "paid",
  starting_price: "$500/月",
  platforms: ["web"],
  features: ["全栈开发", "自主规划", "环境搭建", "部署上线", "Bug 修复"],
  use_cases: ["全栈项目", "Bug 修复", "代码重构", "项目搭建"],
  rating: 4.6,
  review_count: 8000,
  favorites_count: 15000,
});

tool("phind", {
  name: "Phind",
  tagline: "AI 编程搜索助手，实时联网搜索技术问题",
  description: "Phind 是专为开发者打造的 AI 搜索引擎。结合了 LLM 和实时网络搜索，能用自然语言回答编程和技术问题。支持代码生成、调试建议和技术方案选型，每次都提供信息来源链接。比通用搜索更懂开发者的需求。",
  category: "ai-coding",
  tags: ["AI 搜索", "编程助手", "代码搜索", "商业产品"],
  website: "https://www.phind.com",
  pricing_type: "freemium",
  free_tier: "每日 10 次搜索",
  starting_price: "$10/月",
  platforms: ["web"],
  features: ["自然语言搜索", "代码生成", "实时联网", "来源引用", "多模型支持"],
  use_cases: ["技术问答", "代码调试", "方案选型", "学习新技术"],
  rating: 4.5,
  review_count: 6000,
  favorites_count: 10000,
});

tool("dify", {
  name: "Dify",
  tagline: "开源 AI 应用开发平台，可视化编排 AI 工作流",
  description: "Dify 是流行的开源 LLM 应用开发平台。通过可视化拖拽界面，开发者可以快速搭建 AI 聊天机器人、智能工作流和 AI Agent。支持接入 OpenAI、Claude 等多种模型，内置 RAG 引擎和工具调用能力。已被大量企业用于 AI 应用开发。",
  category: "ai-coding",
  tags: ["开源", "AI 开发", "LLM 平台", "可视化", "RAG"],
  website: "https://dify.ai",
  pricing_type: "freemium",
  free_tier: "开源免费",
  starting_price: "云服务 $59/月",
  platforms: ["web"],
  features: ["可视化编排", "RAG 引擎", "多模型接入", "Agent 工具", "API 发布"],
  use_cases: ["AI 应用开发", "聊天机器人", "知识库问答", "自动化工作流"],
  rating: 4.7,
  review_count: 12000,
  favorites_count: 20000,
});

// ===== AI 写作 (2) =====
tool("perplexity-ai", {
  name: "Perplexity AI",
  tagline: "AI 搜索引擎，用对话方式探索知识",
  description: "Perplexity AI 是当下最受关注的 AI 搜索引擎之一。用户以对话方式提问，AI 实时联网搜索并整合多个来源给出带引用的答案。支持文件上传分析、图片搜索和深度研究模式。被福布斯、纽约时报等媒体评为最好的 AI 搜索工具。",
  category: "ai-writing",
  tags: ["AI 搜索", "知识问答", "实时联网", "学术研究", "商业产品"],
  website: "https://www.perplexity.ai",
  pricing_type: "freemium",
  free_tier: "基础搜索免费",
  starting_price: "$20/月",
  platforms: ["web", "mobile"],
  features: ["实时联网搜索", "多来源引用", "文件分析", "深度研究", "图片搜索"],
  use_cases: ["学术研究", "事实核查", "市场调研", "快速学习"],
  rating: 4.8,
  review_count: 25000,
  favorites_count: 40000,
});

tool("deepL-write", {
  name: "DeepL Write",
  tagline: "AI 写作助手，多语言润色和改写",
  description: "DeepL Write 是全球领先的机器翻译公司 DeepL 推出的 AI 写作工具。能对英语和德语文本进行智能润色、风格调整和措辞优化。不同于翻译，Write 专注于提升原文的表达质量，帮助非母语者写出更地道的文字。",
  category: "ai-writing",
  tags: ["AI 写作", "语言润色", "翻译", "商业产品"],
  website: "https://www.deepl.com/write",
  pricing_type: "freemium",
  free_tier: "基础功能免费",
  starting_price: "€8.99/月",
  platforms: ["web"],
  features: ["智能润色", "风格调整", "措辞优化", "多语言支持", "实时编辑"],
  use_cases: ["邮件写作", "报告优化", "学术论文", "商务沟通"],
  rating: 4.6,
  review_count: 8000,
  favorites_count: 12000,
});

// ===== AI 音频 (2) =====
tool("udio", {
  name: "Udio",
  tagline: "AI 音乐创作平台，与 Suno 并称 AI 音乐双雄",
  description: "Udio 是最受欢迎的 AI 音乐生成平台之一。由前 Google DeepMind 研究人员创建，能根据文本描述生成高质量原创歌曲。支持音乐风格自定义、段落编辑和人声调节。社区活跃，用户已生成数百万首歌曲。",
  category: "ai-audio",
  tags: ["AI 音乐", "音乐创作", "AI 作曲", "商业产品"],
  website: "https://www.udio.com",
  pricing_type: "freemium",
  free_tier: "每月 10 首歌曲",
  starting_price: "$10/月",
  platforms: ["web"],
  features: ["AI 音乐生成", "风格自定义", "段落编辑", "人声调节", "社区分享"],
  use_cases: ["音乐创作", "内容配乐", "歌曲翻唱", "灵感激发"],
  rating: 4.5,
  review_count: 12000,
  favorites_count: 20000,
});

tool("soundraw", {
  name: "Soundraw",
  tagline: "AI 免版税音乐生成，为创作者而生",
  description: "Soundraw 是专注于创作者的 AI 音乐平台。用户可以自定义音乐长度、速度、情绪和乐器配置，AI 生成独特的原创音乐。生成的音乐无版权问题，可直接用于视频、播客、游戏等商业项目。",
  category: "ai-audio",
  tags: ["AI 音乐", "免版税", "商业授权", "商业产品"],
  website: "https://soundraw.io",
  pricing_type: "freemium",
  free_tier: "无限试听",
  starting_price: "$16.99/月",
  platforms: ["web"],
  features: ["AI 音乐生成", "情绪选择", "乐器配置", "无版权音乐", "无限下载"],
  use_cases: ["视频配乐", "播客音乐", "游戏配乐", "广告音乐"],
  rating: 4.3,
  review_count: 5000,
  favorites_count: 8000,
});

// ===== AI 图像 (2) =====
tool("luma-dream-machine", {
  name: "Luma Dream Machine",
  tagline: "AI 视频和 3D 内容生成平台",
  description: "Luma AI 的 Dream Machine 是 AI 视频生成领域的重要玩家。用户可以通过文字描述或图片快速生成高质量视频。Luma 还在 3D 捕捉和重建领域有深厚积累，其手机扫描 3D 技术被广泛使用。",
  category: "ai-video",
  tags: ["AI 视频", "3D 生成", "AI 捕捉", "商业产品"],
  website: "https://lumalabs.ai",
  pricing_type: "freemium",
  free_tier: "免费基础使用",
  starting_price: "$29.99/月",
  platforms: ["web", "mobile"],
  features: ["AI 视频生成", "图生视频", "3D 捕捉", "NeRF 技术", "高帧率输出"],
  use_cases: ["视频创作", "3D 建模", "产品展示", "空间视频"],
  rating: 4.4,
  review_count: 7000,
  favorites_count: 12000,
});

tool("topaz-photo-ai", {
  name: "Topaz Photo AI",
  tagline: "AI 照片增强三合一：去噪、锐化、放大",
  description: "Topaz Photo AI 集成了降噪、锐化和图像放大三大核心功能。利用深度学习自动识别照片问题并智能修复。对于老照片修复、低光拍摄和社交媒体素材优化非常高效。是摄影师和设计师的必备工具之一。",
  category: "ai-image",
  tags: ["图像增强", "降噪", "放大", "桌面软件", "商业产品"],
  website: "https://www.topazlabs.com",
  pricing_type: "paid",
  starting_price: "$199",
  platforms: ["windows", "mac"],
  features: ["AI 降噪", "智能锐化", "图像放大", "批量处理", "面部恢复"],
  use_cases: ["老照片修复", "摄影后期", "图片放大", "低光修复"],
  rating: 4.6,
  review_count: 9000,
  favorites_count: 15000,
});

// ===== AI 办公 (2) =====
tool("consensus", {
  name: "Consensus",
  tagline: "AI 学术搜索，从科研论文中直接提取答案",
  description: "Consensus 是专为学术研究和科学问题设计的 AI 搜索引擎。它不搜索网页，而是搜索超过 2 亿篇经过同行评审的科研论文。AI 从论文中直接提取和总结答案，标注引用来源和研究质量评分。",
  category: "ai-office",
  tags: ["AI 搜索", "学术研究", "论文搜索", "商业产品"],
  website: "https://consensus.app",
  pricing_type: "freemium",
  free_tier: "每月 20 次搜索",
  starting_price: "$8.99/月",
  platforms: ["web"],
  features: ["论文搜索", "AI 摘要", "引用提取", "研究质量评分", "文献综述"],
  use_cases: ["学术研究", "文献综述", "健康查询", "政策研究"],
  rating: 4.7,
  review_count: 8000,
  favorites_count: 13000,
});

tool("you-com", {
  name: "You.com",
  tagline: "AI 生产力搜索引擎，集成多模型一站式查询",
  description: "You.com 是集成多种 AI 模型的智能搜索引擎。支持 GPT-4、Claude、Gemini 等多种模型，用户可以根据任务切换。除了搜索，还内置写作、编程、图片生成等 AI 工具。注重隐私保护，提供无广告和无追踪模式。",
  category: "ai-office",
  tags: ["AI 搜索", "多模型", "隐私", "商业产品"],
  website: "https://you.com",
  pricing_type: "freemium",
  free_tier: "基础功能免费",
  starting_price: "$15/月",
  platforms: ["web", "mobile"],
  features: ["多模型支持", "AI 搜索", "隐私保护", "文件分析", "AI 代理"],
  use_cases: ["网络搜索", "文档分析", "内容创作", "编程辅助"],
  rating: 4.4,
  review_count: 7000,
  favorites_count: 10000,
});

// ===== AI 设计 (2) =====
tool("recraft", {
  name: "Recraft",
  tagline: "AI 矢量图形生成，支持 SVG 和品牌风格统一",
  description: "Recraft 是首个能生成矢量图形（SVG）的 AI 设计工具。用户可创建品牌风格库，AI 确保所有生成的设计保持品牌一致性。支持图标、插画、LOGO 等多种格式，生成的 SVG 可直接用于产品开发。在设计师群体中口碑极佳。",
  category: "ai-design",
  tags: ["矢量图形", "SVG", "品牌设计", "UI 设计", "商业产品"],
  website: "https://www.recraft.ai",
  pricing_type: "freemium",
  free_tier: "免费额度有限",
  starting_price: "$10/月",
  platforms: ["web"],
  features: ["矢量生成", "品牌风格", "SVG 导出", "图标生成", "插画创作"],
  use_cases: ["LOGO 设计", "图标制作", "品牌素材", "UI 资源"],
  rating: 4.5,
  review_count: 5000,
  favorites_count: 8000,
});

tool("galileo-ai", {
  name: "Galileo AI",
  tagline: "AI UI 设计生成，从文字描述到高保真界面",
  description: "Galileo AI 是专为 UI/UX 设计师打造的 AI 工具。用户通过文字描述想要的界面，AI 在几秒内生成高保真设计稿。支持生成完整的 App 页面和 Web 界面，可直接导入 Figma 继续编辑。极大提升了设计效率。",
  category: "ai-design",
  tags: ["UI 设计", "UX", "Figma", "界面生成", "商业产品"],
  website: "https://www.usegalileo.ai",
  pricing_type: "freemium",
  free_tier: "免费试用",
  starting_price: "$16/月",
  platforms: ["web"],
  features: ["文字生 UI", "高保真设计", "Figma 导入", "组件生成", "多屏适配"],
  use_cases: ["UI 设计", "原型制作", "App 设计", "网页设计"],
  rating: 4.3,
  review_count: 4000,
  favorites_count: 7000,
});

// ===== AI 营销 (1) =====
tool("adcreative-ai", {
  name: "AdCreative AI",
  tagline: "AI 广告创意生成，数据驱动的广告素材平台",
  description: "AdCreative AI 利用 AI 和数据科学帮助营销团队生成高转化广告素材。上传品牌资产后，AI 根据平台最佳实践生成多种尺寸和风格的广告创意，并预测每个创意的点击率。已为超过 100 万品牌生成广告素材。",
  category: "ai-marketing",
  tags: ["广告创意", "转化优化", "营销素材", "AI 设计", "商业产品"],
  website: "https://www.adcreative.ai",
  pricing_type: "freemium",
  free_tier: "有限免费生成",
  starting_price: "$29/月",
  platforms: ["web"],
  features: ["AI 素材生成", "转化预测", "多平台适配", "A/B 测试", "品牌库"],
  use_cases: ["社交媒体广告", "搜索广告", "展示广告", "广告测试"],
  rating: 4.5,
  review_count: 7000,
  favorites_count: 11000,
});

// ===== AI 客服 (1) =====
tool("coze", {
  name: "Coze",
  tagline: "字节跳动 AI 机器人平台，零代码搭建智能 Agent",
  description: "Coze 是字节跳动推出的 AI Bot 构建平台。通过可视化界面和丰富的插件生态，任何人都可以搭建功能强大的 AI 机器人。支持接入多种 LLM，内置知识库和记忆系统。中文优化极佳，国内使用体验流畅。",
  category: "ai-customer-service",
  tags: ["AI 机器人", "零代码", "字节跳动", "商业产品"],
  website: "https://www.coze.cn",
  pricing_type: "freemium",
  free_tier: "免费使用",
  starting_price: "高级功能付费",
  platforms: ["web"],
  features: ["零代码搭建", "插件市场", "知识库", "记忆系统", "多渠道发布"],
  use_cases: ["客服机器人", "营销助手", "知识问答", "工作流自动化"],
  rating: 4.4,
  review_count: 6000,
  favorites_count: 10000,
});

// ===== AI 生活方式 (1) =====
tool("character-ai", {
  name: "Character.AI",
  tagline: "与 AI 角色对话，沉浸式角色扮演和陪伴",
  description: "Character.AI 是由前 Google 工程师创建的现象级 AI 应用。用户可以与历史上的名人、虚构角色或自定义 AI 角色进行自然对话。每个角色都有独特的人格和对话风格。日活用户超过 600 万，是最受欢迎的 AI 陪伴类产品之一。",
  category: "ai-lifestyle",
  tags: ["AI 聊天", "角色扮演", "AI 陪伴", "免费使用"],
  website: "https://character.ai",
  pricing_type: "free",
  free_tier: "完全免费",
  platforms: ["web", "mobile"],
  features: ["AI 角色对话", "自定义角色", "多人聊天", "语音对话", "角色市场"],
  use_cases: ["娱乐聊天", "语言练习", "创意写作", "情感陪伴"],
  rating: 4.6,
  review_count: 30000,
  favorites_count: 50000,
});

console.log("\nBatch 3 done!");
